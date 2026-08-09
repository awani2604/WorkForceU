import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Clock,
  Award,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  FileText
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const LearningPage = () => {
  const navigate = useNavigate();
  const { modules, toggleLessonCompletion } = useApp();
  const { addToast } = useToast();

  const [selectedModule, setSelectedModule] = useState(null);
  const [viewerModalOpen, setViewerModalOpen] = useState(false);

  const handleOpenModule = (mod) => {
    setSelectedModule(mod);
    setViewerModalOpen(true);
  };

  const handleLessonToggle = (moduleId, lessonId) => {
    toggleLessonCompletion(moduleId, lessonId);
    // Refresh selected module in state view
    const updated = modules.find((m) => m.id === moduleId);
    if (updated) setSelectedModule(updated);
    addToast("Lesson completion updated!", "success");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Technical Learning Modules"
        subtitle="Master Indian electrical & construction standards, safety norms, and practical tool skills."
        breadcrumb={<span>Trainee &bull; Learning Modules</span>}
        action={
          <Button
            variant="rust"
            size="md"
            icon={HelpCircle}
            onClick={() => navigate("/trainee/quiz")}
          >
            Take Level 2 Quiz
          </Button>
        }
      />

      {/* Modules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white rounded-lg border border-gray-200 shadow-subtle p-5 flex flex-col justify-between hover:border-[#1D8C6C] transition"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-[#1D8C6C] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#141821]">{mod.title}</h3>
                    <span className="text-xs text-gray-500 font-medium">{mod.trade} &bull; Target Level {mod.levelTarget}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-md font-semibold shrink-0 border ${
                    mod.status === "Completed"
                      ? "bg-emerald-50 text-[#1D8C6C] border-emerald-200"
                      : mod.status === "In Progress"
                      ? "bg-blue-50 text-[#2E6FB0] border-blue-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {mod.status}
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {mod.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{mod.duration}</span>
                  <span className="font-bold text-gray-900">{mod.progress}% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-[#1D8C6C] rounded-full transition-all duration-300"
                    style={{ width: `${mod.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                {mod.lessons.filter((l) => l.completed).length} of {mod.lessons.length} lessons done
              </span>
              <Button
                variant={mod.status === "Completed" ? "outline" : "teal"}
                size="sm"
                onClick={() => handleOpenModule(mod)}
                className="text-xs"
              >
                {mod.status === "Completed" ? "Review Lessons" : "Continue Module"} &rarr;
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson Reader & Checklist Modal */}
      {selectedModule && (
        <Modal
          isOpen={viewerModalOpen}
          onClose={() => setViewerModalOpen(false)}
          title={selectedModule.title}
          subtitle={`${selectedModule.trade} &bull; ${selectedModule.duration} &bull; ${selectedModule.progress}% Completed`}
          maxWidth="max-w-2xl"
          footer={
            <Button
              variant="teal"
              size="sm"
              onClick={() => setViewerModalOpen(false)}
            >
              Done & Save Progress
            </Button>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
              {selectedModule.description}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Curriculum Lessons & Practical Checkpoints
            </h4>

            <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden text-xs">
              {selectedModule.lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className={`p-3.5 flex items-center justify-between gap-3 transition ${
                    lesson.completed ? "bg-emerald-50/40" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`lesson-${lesson.id}`}
                      checked={lesson.completed}
                      onChange={() => handleLessonToggle(selectedModule.id, lesson.id)}
                      className="w-4 h-4 rounded text-[#1D8C6C] focus:ring-[#1D8C6C] cursor-pointer"
                    />
                    <div>
                      <label
                        htmlFor={`lesson-${lesson.id}`}
                        className={`font-semibold cursor-pointer block ${
                          lesson.completed ? "text-emerald-950 line-through text-gray-500" : "text-gray-900"
                        }`}
                      >
                        {idx + 1}. {lesson.title}
                      </label>
                      <span className="text-gray-400 text-[11px]">{lesson.duration}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      lesson.completed
                        ? "bg-[#1D8C6C] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {lesson.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
