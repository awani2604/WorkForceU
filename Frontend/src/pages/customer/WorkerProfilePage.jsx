import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ShieldCheck, Briefcase, Star, MessageSquare } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { SkillPassport } from "../../components/passport/SkillPassport";
import { Button } from "../../components/common/Button";
import { RatingStars } from "../../components/common/RatingStars";
import { EmptyState } from "../../components/common/EmptyState";
import { useApp } from "../../context/AppContext";

export const WorkerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers } = useApp();

  const worker = workers.find((w) => w.id === id) || workers[0];

  if (!worker) {
    return (
      <EmptyState
        title="Worker Not Found"
        description="The requested worker profile could not be located on the national registry."
        actionText="Back to Search"
        onAction={() => navigate("/customer/search")}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
        <Link
          to="/customer/search"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search Results
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="rust"
            size="md"
            icon={Calendar}
            onClick={() => navigate(`/customer/book/${worker.id}`)}
          >
            Book {worker.name} (₹{worker.dailyRate}/day)
          </Button>
        </div>
      </div>

      {/* Main Digital Skill Passport */}
      <SkillPassport
        worker={worker}
        showActions={true}
        onBook={() => navigate(`/customer/book/${worker.id}`)}
      />

      {/* Client Feedback & Reviews Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-[#141821] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2E6FB0]" />
              Verified Customer Reviews ({worker.reviewsCount || 142})
            </h3>
            <p className="text-xs text-gray-500">Only clients who completed verified jobs through WorkForce can review</p>
          </div>
          <div className="flex items-center gap-2">
            <RatingStars rating={worker.rating} size="md" />
          </div>
        </div>

        <div className="space-y-3">
          {worker.reviews && worker.reviews.length > 0 ? (
            worker.reviews.map((rev, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">{rev.author}</span>
                  <span className="text-gray-400 text-[11px]">{rev.date}</span>
                </div>
                <RatingStars rating={rev.rating} size="sm" />
                <p className="text-gray-700 leading-relaxed pt-1">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 italic">No public reviews submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
