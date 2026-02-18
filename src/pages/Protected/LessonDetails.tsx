import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/Button";
import http, { endpoints } from "@/services/api";

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  content?: string;
  order?: number;
}

const LessonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await http.get(endpoints.lessons.details(id));
        setLesson(response.data?.data || response.data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("Failed to load lesson details");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading lesson...</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error || "Lesson not found"}</p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/dashboard">← Back to Dashboard</Link>
        </Button>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {lesson.title}
        </h1>

        {lesson.description && (
          <p className="mb-6 text-lg text-gray-600">{lesson.description}</p>
        )}

        {lesson.content ? (
          <div className="prose max-w-none">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              Lesson content will be available soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetails;
