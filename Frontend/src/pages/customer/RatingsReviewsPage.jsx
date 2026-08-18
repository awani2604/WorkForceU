import React, { useState } from "react";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Award,
  Search,
  Filter,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";

export const RatingsReviewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");

  const reviews = [
    {
      id: 1,
      worker: "Rajesh Kumar",
      job: "Electrical Repair",
      date: "18 Aug 2026",
      rating: 5,
      review:
        "Excellent service. The work was completed professionally and on time.",
      status: "Reviewed",
      initials: "RK",
    },
    {
      id: 2,
      worker: "Amit Sharma",
      job: "Plumbing Service",
      date: "14 Aug 2026",
      rating: 4,
      review:
        "Good experience. The professional was polite and completed the work properly.",
      status: "Reviewed",
      initials: "AS",
    },
    {
      id: 3,
      worker: "Suresh Das",
      job: "AC Repair & Maintenance",
      date: "09 Aug 2026",
      rating: 5,
      review:
        "Very satisfied with the service. I would definitely recommend this professional.",
      status: "Reviewed",
      initials: "SD",
    },
    {
      id: 4,
      worker: "Rahul Mishra",
      job: "Home Painting",
      date: "02 Aug 2026",
      rating: 4,
      review:
        "The work was completed nicely and within the expected time.",
      status: "Reviewed",
      initials: "RM",
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.job.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === "all" ||
      review.rating === Number(filterRating);

    return matchesSearch && matchesRating;
  });

  const totalReviews = reviews.length;

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  return (
    <div className="min-h-full bg-[#f5f3ee]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-11 py-8 lg:py-10">

        {/* HEADER */}
        <div className="border-b border-[#ddd8ce] pb-7">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#EAF1FB] border border-[#bcd2eb] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#2E6FB0]" />
                </div>

                <div>
                  <h1 className="text-3xl lg:text-[34px] font-bold tracking-tight text-[#202936]">
                    Ratings & Reviews
                  </h1>

                  <p className="text-[#617083] text-sm lg:text-base mt-1">
                    View and manage feedback from your completed bookings.
                  </p>
                </div>
              </div>

              <div className="w-16 h-1.5 bg-[#2E6FB0] rounded-full mt-5" />
            </div>

            <div className="flex gap-3">
              <div className="bg-white border border-[#ddd8ce] rounded-lg px-5 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-[#617083]">
                  Reviews Given
                </p>

                <p className="text-2xl font-bold text-[#202936] mt-1">
                  {totalReviews}
                </p>
              </div>

              <div className="bg-[#2E6FB0] text-white rounded-lg px-5 py-3 shadow-[4px_4px_0_#202936]">
                <p className="text-xs uppercase tracking-wider text-white/80">
                  Average Rating
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold">
                    {averageRating.toFixed(1)}
                  </p>

                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

          <div className="bg-white border border-[#ddd8ce] rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7b8593]">
                  Average Rating
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <p className="text-3xl font-bold text-[#202936]">
                    {averageRating.toFixed(1)}
                  </p>

                  <span className="text-sm text-[#8a94a2]">
                    / 5
                  </span>
                </div>

                <div className="flex gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(averageRating)
                          ? "fill-[#E7A22B] text-[#E7A22B]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                <Star className="w-6 h-6 text-[#E7A22B]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#ddd8ce] rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7b8593]">
                  Total Reviews
                </p>

                <p className="text-3xl font-bold text-[#202936] mt-3">
                  {totalReviews}
                </p>

                <p className="text-sm text-[#617083] mt-2">
                  Completed booking reviews
                </p>
              </div>

              <div className="w-12 h-12 rounded-lg bg-[#EAF1FB] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#2E6FB0]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#ddd8ce] rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7b8593]">
                  Positive Feedback
                </p>

                <p className="text-3xl font-bold text-[#202936] mt-3">
                  98%
                </p>

                <p className="text-sm text-[#617083] mt-2">
                  Highly rated services
                </p>
              </div>

              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-[#1D8C6C]" />
              </div>
            </div>
          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="mt-9">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#202936]">
                Your Reviews
              </h2>

              <p className="text-sm text-[#617083] mt-1">
                Feedback you have submitted for completed bookings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* SEARCH */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#8a94a2] absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type="text"
                  placeholder="Search worker or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2.5 text-sm bg-white border border-[#ddd8ce] rounded-lg outline-none focus:border-[#2E6FB0]"
                />
              </div>

              {/* FILTER */}
              <div className="relative">
                <Filter className="w-4 h-4 text-[#8a94a2] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="appearance-none w-full sm:w-44 pl-9 pr-8 py-2.5 text-sm bg-white border border-[#ddd8ce] rounded-lg outline-none focus:border-[#2E6FB0]"
                >
                  <option value="all">
                    All Ratings
                  </option>

                  <option value="5">
                    5 Stars
                  </option>

                  <option value="4">
                    4 Stars
                  </option>

                  <option value="3">
                    3 Stars
                  </option>

                  <option value="2">
                    2 Stars
                  </option>

                  <option value="1">
                    1 Star
                  </option>
                </select>

                <ChevronDown className="w-4 h-4 text-[#8a94a2] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="space-y-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-[#ddd8ce] rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#EAF1FB] border border-[#bcd2eb] flex items-center justify-center shrink-0">
                        <span className="font-bold text-[#2E6FB0]">
                          {review.initials}
                        </span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-bold text-[#202936] text-base sm:text-lg">
                            {review.job}
                          </h3>

                          <span className="px-2.5 py-1 rounded-md bg-green-50 border border-green-100 text-[#1D8C6C] text-xs font-semibold">
                            {review.status}
                          </span>
                        </div>

                        <p className="text-sm text-[#617083] mt-1">
                          Professional:{" "}
                          <span className="font-medium text-[#202936]">
                            {review.worker}
                          </span>
                        </p>

                        <div className="flex gap-1 mt-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-[#E7A22B] text-[#E7A22B]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-sm text-[#617083] mt-3 leading-relaxed max-w-3xl">
                          "{review.review}"
                        </p>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-[#8a94a2]">
                        <CalendarCheck className="w-3.5 h-3.5" />

                        {review.date}
                      </div>

                      <button className="text-xs font-semibold text-[#2E6FB0] hover:underline">
                        Edit Review
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-[#ddd8ce] rounded-xl min-h-[300px] flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-full bg-[#EAF1FB] flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-[#2E6FB0]" />
                </div>

                <h3 className="text-xl font-bold text-[#202936]">
                  No Reviews Found
                </h3>

                <p className="text-sm text-[#617083] mt-2">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};