import { useEffect, useState, useCallback } from "react";
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

const Dashboard = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<ProgressOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearchDebounce(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchDebounce) params.search = searchDebounce;

      const [lessonsResponse, progressResponse] = await Promise.all([
        http.get(endpoints.lessons.list, { params }),
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
  }, [searchDebounce]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error && !lessons.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="rounded-full bg-red-100 p-4">
          <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          My Lessons
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Continue your Commercial Law studies
        </p>
      </div>

      {/* Stats */}
      {progress && (
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{progress.totalLessons}</p>
            <p className="mt-0.5 text-xs text-gray-500">Total</p>
          </div>
          <div className="rounded-xl border border-green-100 bg-white p-4 text-center">
            <p className="text-2xl font-semibold text-green-600">{progress.completedLessons}</p>
            <p className="mt-0.5 text-xs text-gray-500">Completed</p>
          </div>
          <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
            <p className="text-2xl font-semibold text-amber-600">{progress.inProgress}</p>
            <p className="mt-0.5 text-xs text-gray-500">In Progress</p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
        />
      </div>

      {/* Loading */}
      {loading && !lessons.length && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {/* Lessons */}
      {!loading && lessons.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-400">
            {search ? "No lessons match your search" : "No lessons available yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson, idx) => (
            <Link
              key={lesson._id}
              to={`/lesson/${lesson._id}`}
              className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition hover:border-gray-200 hover:shadow-sm"
            >
              {/* Order number */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600">
                {lesson.order || idx + 1}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 sm:text-[15px]">
                  {lesson.title}
                </h3>
                {lesson.description && (
                  <p
                    className="mt-0.5 line-clamp-1 text-xs text-gray-400 sm:text-sm"
                    dangerouslySetInnerHTML={
                      lesson.description.startsWith("<")
                        ? { __html: lesson.description.replace(/<img[^>]*>/g, "").replace(/<[^>]+>/g, " ").substring(0, 100) }
                        : undefined
                    }
                  >
                    {lesson.description.startsWith("<") ? undefined : lesson.description}
                  </p>
                )}
                <div className="mt-1.5 flex gap-3 text-[11px] text-gray-400">
                  {lesson.subsection_count !== undefined && lesson.subsection_count > 0 && (
                    <span>{lesson.subsection_count} sections</span>
                  )}
                  {lesson.estimated_minutes && lesson.estimated_minutes > 0 && (
                    <span>{lesson.estimated_minutes} min</span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <svg className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
