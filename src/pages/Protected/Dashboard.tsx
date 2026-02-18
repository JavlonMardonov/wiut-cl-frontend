import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/Button";
import http, { endpoints } from "@/services/api";

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  order?: number;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch lessons and progress overview
        const [lessonsResponse, progressResponse] = await Promise.all([
          http.get(endpoints.lessons.list),
          http.get(endpoints.progress.overview).catch(() => ({ data: null })), // Progress might not be available for all users
        ]);

        setLessons(lessonsResponse.data?.data || lessonsResponse.data || []);
        setProgress(progressResponse.data || null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your Commercial Law study dashboard
        </p>
      </div>

      {/* Progress Overview */}
      {progress && (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Total Lessons
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {progress.totalLessons}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {progress.completedLessons}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              {progress.inProgress}
            </p>
          </div>
        </div>
      )}

      {/* Lessons List */}
      <div className="rounded-lg bg-white shadow-md">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Available Lessons
          </h2>
        </div>

        {lessons.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No lessons available yet.</p>
          </div>
        ) : (
          <div className="divide-y">
            {lessons.map((lesson) => (
              <div
                // eslint-disable-next-line no-underscore-dangle
                key={lesson._id}
                className="p-6 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {lesson.title}
                    </h3>
                    {lesson.description && (
                      <p className="mb-4 text-gray-600">{lesson.description}</p>
                    )}
                  </div>
                  <Button asChild variant="outline">
                    {/* eslint-disable-next-line no-underscore-dangle */}
                    <Link to={`/lesson/${lesson._id}`}>
                      Start Lesson
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
