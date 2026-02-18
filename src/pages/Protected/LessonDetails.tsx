import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/Button";
import http, { endpoints } from "@/services/api";

interface Subsection {
  _id: string;
  title: string;
  type: string;
  order: number;
  content: any;
  is_completed?: boolean;
}

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  order?: number;
  subsection_count?: number;
  estimated_minutes?: number;
}

const TYPE_ICONS: Record<string, string> = {
  OVERVIEW: "📖",
  KEY_TERMS: "📝",
  CASES: "⚖️",
  STATUTES: "📊",
  PRACTICE_QUESTIONS: "❓",
  SUMMARY: "📋",
};

const TYPE_LABELS: Record<string, string> = {
  OVERVIEW: "Overview",
  KEY_TERMS: "Key Terms & Definitions",
  CASES: "Cases & Case Studies",
  STATUTES: "Statutes & Legislation",
  PRACTICE_QUESTIONS: "Practice Questions",
  SUMMARY: "Summary & Notes",
};

function OverviewContent({ content }: { content: any }) {
  if (!content?.text) return <p className="text-gray-400 italic">No content yet.</p>;
  return <div className="prose max-w-none whitespace-pre-wrap text-gray-700">{content.text}</div>;
}

function KeyTermsContent({ content }: { content: any }) {
  const terms = content?.terms || [];
  if (!terms.length) return <p className="text-gray-400 italic">No terms yet.</p>;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {terms.map((t: any, i: number) => (
        <div key={i} className="rounded-lg border border-blue-100 bg-blue-50 p-4">
          <h4 className="mb-1 font-semibold text-blue-900">{t.term}</h4>
          <p className="text-sm text-blue-700">{t.definition}</p>
        </div>
      ))}
    </div>
  );
}

function CasesContent({ content }: { content: any }) {
  const cases = content?.cases || [];
  if (!cases.length) return <p className="text-gray-400 italic">No cases yet.</p>;
  return (
    <div className="space-y-4">
      {cases.map((c: any, i: number) => (
        <div key={i} className="rounded-lg border border-amber-100 bg-amber-50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <h4 className="font-bold text-amber-900">{c.name}</h4>
            {c.citation && <span className="text-xs text-amber-600">({c.citation})</span>}
          </div>
          {c.facts && <div className="mb-2"><span className="text-xs font-semibold uppercase text-amber-700">Facts:</span><p className="text-sm text-gray-700">{c.facts}</p></div>}
          {c.decision && <div className="mb-2"><span className="text-xs font-semibold uppercase text-amber-700">Decision:</span><p className="text-sm text-gray-700">{c.decision}</p></div>}
          {c.significance && <div><span className="text-xs font-semibold uppercase text-amber-700">Significance:</span><p className="text-sm text-gray-700">{c.significance}</p></div>}
        </div>
      ))}
    </div>
  );
}

function StatutesContent({ content }: { content: any }) {
  const statutes = content?.statutes || [];
  if (!statutes.length) return <p className="text-gray-400 italic">No statutes yet.</p>;
  return (
    <div className="space-y-4">
      {statutes.map((s: any, i: number) => (
        <div key={i} className="rounded-lg border border-purple-100 bg-purple-50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <h4 className="font-bold text-purple-900">{s.name}</h4>
            {s.section && <span className="rounded bg-purple-200 px-2 py-0.5 text-xs text-purple-800">{s.section}</span>}
          </div>
          {s.description && <p className="mb-2 text-sm text-gray-700">{s.description}</p>}
          {s.keyPoints?.length > 0 && (
            <ul className="list-inside list-disc text-sm text-purple-700">
              {s.keyPoints.map((p: string, j: number) => <li key={j}>{p}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function PracticeQuestionsContent({ content }: { content: any }) {
  const questions = content?.questions || [];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  if (!questions.length) return <p className="text-gray-400 italic">No questions yet.</p>;

  return (
    <div className="space-y-6">
      {questions.map((q: any, i: number) => (
        <div key={i} className="rounded-lg border border-green-100 bg-green-50 p-5">
          <p className="mb-3 font-semibold text-gray-900">Q{i + 1}. {q.question}</p>
          <div className="mb-3 space-y-2">
            {(q.options || []).map((opt: string, oi: number) => (
              <button
                key={oi}
                onClick={() => { setAnswers({ ...answers, [i]: oi }); setShowResults({ ...showResults, [i]: true }); }}
                className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                  showResults[i]
                    ? oi === q.correctIndex
                      ? "border-green-500 bg-green-100 text-green-800"
                      : answers[i] === oi
                        ? "border-red-500 bg-red-100 text-red-800"
                        : "border-gray-200 bg-white"
                    : answers[i] === oi
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <span className="mr-2 font-semibold">{String.fromCharCode(65 + oi)}.</span>
                {opt}
              </button>
            ))}
          </div>
          {showResults[i] && q.explanation && (
            <div className="rounded bg-white p-3 text-sm text-gray-600">
              <span className="font-semibold">Explanation:</span> {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SummaryContent({ content }: { content: any }) {
  return (
    <div>
      {content?.text && <div className="mb-4 whitespace-pre-wrap text-gray-700">{content.text}</div>}
      {content?.keyPoints?.length > 0 && (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
          <h4 className="mb-2 font-semibold text-indigo-900">Key Points</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-indigo-700">
            {content.keyPoints.map((p: string, i: number) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}
      {!content?.text && !content?.keyPoints?.length && <p className="text-gray-400 italic">No summary yet.</p>}
    </div>
  );
}

const RENDERERS: Record<string, any> = {
  OVERVIEW: OverviewContent,
  KEY_TERMS: KeyTermsContent,
  CASES: CasesContent,
  STATUTES: StatutesContent,
  PRACTICE_QUESTIONS: PracticeQuestionsContent,
  SUMMARY: SummaryContent,
};

const LessonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [subsections, setSubsections] = useState<Subsection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [lessonRes, subsRes] = await Promise.all([
          http.get(endpoints.lessons.details(id)),
          http.get(endpoints.subsections.byLesson(id)),
        ]);
        const lessonData = lessonRes.data?.data || lessonRes.data;
        const subsData = subsRes.data?.data || subsRes.data || [];
        setLesson(lessonData);
        setSubsections(Array.isArray(subsData) ? subsData : []);
        if (subsData.length > 0) setActiveSection(subsData[0]._id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="text-lg text-gray-500">Loading...</div></div>;
  if (!lesson) return <div className="flex min-h-screen items-center justify-center"><p className="text-red-500">Lesson not found</p></div>;

  const activeSub = subsections.find((s) => s._id === activeSection);
  const Renderer = activeSub ? (RENDERERS[activeSub.type] || OverviewContent) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard">← Back</Link>
          </Button>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{lesson.title}</h1>
          {lesson.description && <p className="mt-1 text-gray-600">{lesson.description}</p>}
          <div className="mt-2 flex gap-4 text-sm text-gray-500">
            {lesson.subsection_count !== undefined && <span>{lesson.subsection_count} sections</span>}
            {lesson.estimated_minutes && <span>~{lesson.estimated_minutes} min</span>}
          </div>
        </div>
      </div>

      <div className="container mx-auto flex gap-6 px-4 py-6">
        {/* Sidebar */}
        <div className="w-72 shrink-0">
          <nav className="sticky top-6 space-y-1">
            {subsections.map((sub) => (
              <button
                key={sub._id}
                onClick={() => setActiveSection(sub._id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeSection === sub._id
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{TYPE_ICONS[sub.type] || "📄"}</span>
                <span className="flex-1">{sub.title}</span>
                {sub.is_completed && <span className="text-green-500">✓</span>}
              </button>
            ))}
            {subsections.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-gray-400">No sections available yet.</p>
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {activeSub ? (
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-6">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-2xl">{TYPE_ICONS[activeSub.type]}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{activeSub.title}</h2>
                </div>
                <p className="text-sm text-gray-500">{TYPE_LABELS[activeSub.type]}</p>
              </div>
              {Renderer && <Renderer content={activeSub.content} />}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <p className="text-gray-400">Select a section from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
