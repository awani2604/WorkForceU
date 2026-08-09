import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  ShieldCheck,
  Clock
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { MOCK_QUIZ } from "../../mock/mockData";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const QuizPage = () => {
  const navigate = useNavigate();
  const { traineeProfile, setTraineeProfile } = useApp();
  const { addToast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = MOCK_QUIZ.questions.length;
  const currentQuestion = MOCK_QUIZ.questions[currentIndex];

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let scoreCount = 0;
    MOCK_QUIZ.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        scoreCount += 1;
      }
    });

    const percent = Math.round((scoreCount / totalQuestions) * 100);
    const passed = percent >= MOCK_QUIZ.passingScore;

    setIsSubmitted(true);

    if (passed) {
      addToast(`Congratulations! You passed with ${percent}% score!`, "success");
      setTraineeProfile((prev) => ({
        ...prev,
        quizPassed: true,
        quizScore: percent,
      }));
    } else {
      addToast(`You scored ${percent}%. Passing score is ${MOCK_QUIZ.passingScore}%. Try again!`, "error");
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  // Score Calculation
  let correctCount = 0;
  if (isSubmitted) {
    MOCK_QUIZ.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) correctCount += 1;
    });
  }
  const finalPercentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = finalPercentage >= MOCK_QUIZ.passingScore;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="NSQF Certification Exam"
        subtitle={MOCK_QUIZ.title}
        breadcrumb={<span>Trainee &bull; Certification Quiz</span>}
      />

      {!isSubmitted ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-subtle p-6 sm:p-8 space-y-6">
          {/* Header Info: Counter & Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
              <span className="flex items-center gap-1 text-gray-700">
                <Clock className="w-3.5 h-3.5" />
                Passing Score: {MOCK_QUIZ.passingScore}% (4/5 correct)
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-[#1D8C6C] rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base sm:text-lg font-bold text-[#141821] leading-snug">
              {currentIndex + 1}. {currentQuestion.question}
            </h3>
          </div>

          {/* Multiple-Choice Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-lg border text-left transition cursor-pointer flex items-center justify-between text-xs sm:text-sm font-medium ${
                    isSelected
                      ? "border-[#1D8C6C] bg-emerald-50 text-emerald-950 ring-2 ring-[#1D8C6C]"
                      : "border-gray-200 bg-white hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected ? "bg-[#1D8C6C] text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      isSelected ? "border-[#1D8C6C] bg-[#1D8C6C]" : "border-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              disabled={currentIndex === 0}
              onClick={handlePrevious}
              className="text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Previous Question
            </Button>

            {currentIndex === totalQuestions - 1 ? (
              <Button
                variant="rust"
                size="md"
                disabled={Object.keys(selectedAnswers).length < totalQuestions}
                onClick={handleSubmitQuiz}
                className="font-bold text-xs"
              >
                Submit Exam for Evaluation
              </Button>
            ) : (
              <Button
                variant="teal"
                size="md"
                onClick={handleNext}
                className="text-xs"
              >
                Next Question
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Score Card */
        <div className="bg-white rounded-lg border border-gray-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2 pb-6 border-b border-gray-100">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full font-black text-2xl mb-2 ${
                isPassed ? "bg-emerald-100 text-[#1D8C6C]" : "bg-red-100 text-red-600"
              }`}
            >
              {isPassed ? <Award className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <h2 className="text-2xl font-extrabold text-[#141821]">
              {isPassed ? "Evaluation Passed!" : "Evaluation Not Cleared"}
            </h2>

            <p className="text-xs text-gray-500 max-w-md mx-auto">
              {isPassed
                ? "You scored above the 80% passing threshold required for Level 2 Assistant certification."
                : "You must score at least 80% to pass the NSQF evaluation. Review the answers below and try again."}
            </p>

            <div className="inline-flex items-center gap-4 bg-gray-50 border border-gray-200 px-6 py-3 rounded-lg mt-3">
              <div>
                <span className="text-xs text-gray-500 block">Your Score</span>
                <span className="text-2xl font-bold text-[#141821]">{correctCount} / {totalQuestions}</span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <span className="text-xs text-gray-500 block">Percentage</span>
                <span className={`text-2xl font-bold ${isPassed ? "text-[#1D8C6C]" : "text-red-600"}`}>
                  {finalPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Question Breakdown with Explanations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Exam Questions Review
            </h4>

            {MOCK_QUIZ.questions.map((q, idx) => {
              const userChoice = selectedAnswers[idx];
              const isCorrect = userChoice === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border text-xs space-y-2 ${
                    isCorrect ? "bg-emerald-50/50 border-emerald-200" : "bg-red-50/40 border-red-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-gray-900">
                      {idx + 1}. {q.question}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                        isCorrect ? "bg-[#1D8C6C] text-white" : "bg-red-600 text-white"
                      }`}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <div className="text-gray-600 space-y-1 text-[11px] pt-1">
                    <p>Your Answer: <strong>{q.options[userChoice] || "Unanswered"}</strong></p>
                    {!isCorrect && (
                      <p className="text-emerald-800 font-semibold">
                        Correct Answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <p className="text-gray-500 italic pt-1 border-t border-gray-200/60">
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="outline"
              size="md"
              icon={RotateCcw}
              onClick={handleRetry}
              className="w-full sm:w-auto text-xs"
            >
              Retry Examination
            </Button>

            <Link to="/trainee/passport" className="w-full sm:w-auto">
              <Button
                variant="teal"
                size="md"
                className="w-full text-xs font-bold"
              >
                Inspect Trainee Passport &rarr;
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
