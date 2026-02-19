import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Spinner } from "@/components/Spinner";
import http, { endpoints } from "@/services/api";

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  order?: number;
  estimated_minutes?: number;
  subsection_count?: number;
  is_published?: boolean;
}

interface ProgressOverview {
  totalLessons: number;
  completedLessons: number;
  inProgress: number;
}

const COLORS = [
  "from-blue-500 to-blue-600",
  "from-indigo-500 to-indigo-600",
  "from-violet-500 to-violet-600",
  "from-purple-500 to-purple-600",
  "from-fuchsia-500 to-fuchsia-600",
  "from-pink-500 to-pink-600",
  "from-rose-500 to-rose-600",
  "from-amber-500 to-amber-600",
  "from-emerald-500 to-emerald-600",
  "from-teal-500 to-teal-600",
];

const Dashboard = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<ProgressOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [lessonsResponse, progressResponse] = await Promise.all([
          http.get(endpoints.lessons.list),
          http.get(endpoints.progress.overview).catch(() => ({ data: null })),
        ]);
        setLessons(lessonsResponse.data?.data || lessonsResponse.data || []);
        setProgress(progressResponse.data || null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="rounded-full bg-red-100 p-4">
          <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const filteredLessons = lessons.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  const completionPercent = progress
    ? Math.round((progress.completedLessons / Math.max(progress.totalLessons, 1)) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      {/* Hero section */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white sm:mb-8 sm:p-8">
        <h1 className="mb-2 text-xl font-bold sm:text-2xl lg:text-3xl">
          Welcome back! 👋
        </h1>
        <p className="mb-5 text-sm text-blue-100 sm:text-base">
          Continue your Commercial Law studies where you left off.
        </p>

        {/* Progress bar */}
        {progress && (
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-blue-100">Overall Progress</span>
              <span className="font-semibold">{completionPercent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="mt-3 flex gap-4 text-xs sm:gap-6 sm:text-sm">
              <div>
                <span className="font-bold text-white">{progress.totalLessons}</span>
                <span className="ml-1 text-blue-200">Total</span>
              </div>
              <div>
                <span className="font-bold text-emerald-300">{progress.completedLessons}</span>
                <span className="ml-1 text-blue-200">Completed</span>
              </div>
              <div>
                <span className="font-bold text-amber-300">{progress.inProgress}</span>
                <span className="ml-1 text-blue-200">In Progress</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search + heading */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
          Lessons <span className="text-sm font-normal text-gray-400">({filteredLessons.length})</span>
        </h2>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 sm:w-64"
          />
        </div>
      </div>

      {/* Lessons grid */}
      {filteredLessons.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
          <p className="text-2xl">📚</p>
          <p className="mt-2 text-gray-500">
            {search ? "No lessons match your search" : "No lessons available yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((lesson, idx) => (
            <Link
              key={lesson._id}
              to={`/lesson/${lesson._id}`}
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Color accent bar */}
              <div className={`h-1.5 bg-gradient-to-r ${COLORS[idx % COLORS.length]}`} />

              <div className="p-4 sm:p-5">
                {/* Order badge */}
                {lesson.order && (
                  <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white ${COLORS[idx % COLORS.length]}`}>
                    {lesson.order}
                  </div>
                )}

                <h3 className="mb-1.5 text-base font-semibold text-gray-900 group-hover:text-blue-600 sm:text-[15px]">
                  {lesson.title}
                </h3>

                {lesson.description && (
                  <p
                    className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500"
                    dangerouslySetInnerHTML={
                      lesson.description.startsWith("<")
                        ? { __html: lesson.description }
                        : undefined
                    }
                  >
                    {lesson.description.startsWith("<") ? undefined : lesson.description}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {lesson.subsection_count !== undefined && lesson.subsection_count > 0 && (
                    <span className="flex items-center gap-1">
                      📄 {lesson.subsection_count} sections
                    </span>
                  )}
                  {lesson.estimated_minutes && lesson.estimated_minutes > 0 && (
                    <span className="flex items-center gap-1">
                      ⏱ {lesson.estimated_minutes} min
                    </span>
                  )}
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-4 right-4 rounded-full bg-gray-50 p-1.5 opacity-0 transition group-hover:opacity-100">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
