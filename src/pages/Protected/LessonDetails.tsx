import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "@/components/Spinner";
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
  OVERVIEW: "📖", KEY_TERMS: "📝", CASES: "⚖️", STATUTES: "📊",
  PRACTICE_QUESTIONS: "❓", SUMMARY: "📋", CUSTOM: "✏️",
};

const TYPE_LABELS: Record<string, string> = {
  OVERVIEW: "Overview", KEY_TERMS: "Key Terms & Definitions", CASES: "Cases & Case Studies",
  STATUTES: "Statutes & Legislation", PRACTICE_QUESTIONS: "Practice Questions",
  SUMMARY: "Summary & Notes", CUSTOM: "Custom Content",
};

// ---------- Helpers ----------
function HtmlContent({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`rich-content ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function isHtml(str?: string): boolean {
  return typeof str === "string" && str.trim().startsWith("<");
}

function RichText({ text, className = "" }: { text?: string; className?: string }) {
  if (!text) return null;
  if (isHtml(text)) return <HtmlContent html={text} className={className} />;
  return <p className={className}>{text}</p>;
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}

// ---------- Content renderers (clean, no heavy gradients) ----------
function OverviewContent({ content }: { content: any }) {
  if (!content?.text) return <EmptyState text="No content yet" />;
  return <RichText text={content.text} />;
}

function KeyTermsContent({ content }: { content: any }) {
  const terms = content?.terms || [];
  if (!terms.length) return <EmptyState text="No terms yet" />;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {terms.map((t: any, i: number) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <h4 className="mb-1.5 text-sm font-semibold text-gray-900">{t.term}</h4>
          <RichText text={t.definition} className="text-sm text-gray-600" />
        </div>
      ))}
    </div>
  );
}

function CasesContent({ content }: { content: any }) {
  const cases = content?.cases || [];
  if (!cases.length) return <EmptyState text="No cases yet" />;
  return (
    <div className="space-y-4">
      {cases.map((c: any, i: number) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-gray-900">{c.name}</h4>
            {c.citation && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">{c.citation}</span>
            )}
          </div>
          {c.facts && (
            <div className="mb-3">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Facts</p>
              <RichText text={c.facts} className="text-sm text-gray-600" />
            </div>
          )}
          {c.decision && (
            <div className="mb-3">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Decision</p>
              <RichText text={c.decision} className="text-sm text-gray-600" />
            </div>
          )}
          {c.significance && (
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Significance</p>
              <RichText text={c.significance} className="text-sm text-gray-600" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatutesContent({ content }: { content: any }) {
  const statutes = content?.statutes || [];
  if (!statutes.length) return <EmptyState text="No statutes yet" />;
  return (
    <div className="space-y-4">
      {statutes.map((s: any, i: number) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-gray-900">{s.name}</h4>
            {s.section && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">{s.section}</span>
            )}
          </div>
          <RichText text={s.description} className="mb-3 text-sm text-gray-600" />
          {s.keyPoints?.length > 0 && (
            <ul className="space-y-1 text-sm text-gray-600">
              {s.keyPoints.map((p: string, j: number) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  {p}
                </li>
              ))}
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

  if (!questions.length) return <EmptyState text="No questions yet" />;

  const answered = Object.keys(showResults).length;
  const correct = Object.entries(answers).filter(
    ([i, a]) => showResults[Number(i)] && questions[Number(i)]?.correctIndex === a
  ).length;

  return (
    <div className="space-y-5">
      {answered > 0 && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
          <span className="text-lg font-semibold text-gray-900">{correct}/{answered}</span>
          <span className="ml-1.5 text-sm text-gray-500">correct</span>
        </div>
      )}
      {questions.map((q: any, i: number) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
          <div className="mb-3 text-sm font-medium text-gray-900">
            <span className="mr-1 text-gray-400">Q{i + 1}.</span>
            <RichText text={q.question} className="inline" />
          </div>
          <div className="mb-3 space-y-2">
            {(q.options || []).map((opt: string, oi: number) => {
              const selected = answers[i] === oi;
              const shown = showResults[i];
              const isCorrect = oi === q.correctIndex;
              let cls = "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50";
              if (shown && isCorrect) cls = "border-green-200 bg-green-50 text-green-800";
              else if (shown && selected) cls = "border-red-200 bg-red-50 text-red-700";
              else if (selected) cls = "border-blue-200 bg-blue-50";

              return (
                <button
                  key={oi}
                  onClick={() => { setAnswers({ ...answers, [i]: oi }); setShowResults({ ...showResults, [i]: true }); }}
                  disabled={!!shown}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition ${cls}`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    shown && isCorrect ? "bg-green-500 text-white" : shown && selected ? "bg-red-400 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {shown && isCorrect ? "✓" : shown && selected ? "✗" : String.fromCharCode(65 + oi)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {showResults[i] && q.explanation && (
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              <span className="font-medium text-gray-700">💡 </span>
              <RichText text={q.explanation} className="inline" />
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
      {content?.text && <RichText text={content.text} className="mb-4" />}
      {content?.keyPoints?.length > 0 && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">📌 Key Points</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {content.keyPoints.map((p: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!content?.text && !content?.keyPoints?.length && <EmptyState text="No summary yet" />}
    </div>
  );
}

function CustomContent({ content }: { content: any }) {
  if (!content?.html) return <EmptyState text="No content yet" />;
  return <HtmlContent html={content.html} />;
}

const RENDERERS: Record<string, any> = {
  OVERVIEW: OverviewContent, KEY_TERMS: KeyTermsContent, CASES: CasesContent,
  STATUTES: StatutesContent, PRACTICE_QUESTIONS: PracticeQuestionsContent,
  SUMMARY: SummaryContent, CUSTOM: CustomContent,
};

// ---------- Main ----------
const LessonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [subsections, setSubsections] = useState<Subsection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [lessonRes, subsRes, progressRes] = await Promise.all([
          http.get(endpoints.lessons.details(id)),
          http.get(endpoints.subsections.byLesson(id)),
          http.get(endpoints.progress.byLesson(id)).catch(() => ({ data: null })),
        ]);
        const lessonData = lessonRes.data?.data || lessonRes.data;
        const subsData = subsRes.data?.data || subsRes.data || [];
        setLesson(lessonData);
        setSubsections(Array.isArray(subsData) ? subsData : []);
        if (subsData.length > 0) setActiveSection(subsData[0]._id);

        // Load completed subsections
        const progressData = progressRes.data?.data || progressRes.data || [];
        if (Array.isArray(progressData)) {
          const ids = new Set<string>(
            progressData.filter((p: any) => p.is_completed).map((p: any) => p.subsection?.toString() || p.subsection_id)
          );
          setCompletedIds(ids);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleMarkComplete = useCallback(async (subsectionId: string) => {
    if (!id) return;
    setCompleting(true);
    try {
      if (completedIds.has(subsectionId)) {
        await http.delete(endpoints.progress.incomplete(subsectionId));
        setCompletedIds((prev) => {
          const next = new Set(prev);
          next.delete(subsectionId);
          return next;
        });
      } else {
        await http.post(endpoints.progress.complete, { lesson: id, subsection: subsectionId });
        setCompletedIds((prev) => new Set(prev).add(subsectionId));
      }
    } catch (err) {
      console.error("Progress update failed:", err);
    }
    setCompleting(false);
  }, [id, completedIds]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4">
        <p className="text-sm text-gray-500">Lesson not found</p>
        <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">← Back</Link>
      </div>
    );
  }

  const activeSub = subsections.find((s) => s._id === activeSection);
  const Renderer = activeSub ? (RENDERERS[activeSub.type] || OverviewContent) : null;
  const activeIndex = subsections.findIndex((s) => s._id === activeSection);
  const completedCount = subsections.filter((s) => completedIds.has(s._id)).length;

  const goToSection = (idx: number) => {
    if (idx >= 0 && idx < subsections.length) {
      setActiveSection(subsections[idx]._id);
      setSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-400 hover:bg-gray-50 hover:text-gray-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 lg:hidden"
            >
              Sections
            </button>
          </div>

          <h1 className="mt-2 text-lg font-semibold text-gray-900 sm:text-xl">{lesson.title}</h1>

          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            {subsections.length > 0 && <span>{subsections.length} sections</span>}
            {lesson.estimated_minutes && <span>{lesson.estimated_minutes} min</span>}
            {completedCount > 0 && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-600">
                {completedCount}/{subsections.length} done
              </span>
            )}
          </div>

          {/* Mobile pills */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {subsections.map((sub, idx) => (
              <button
                key={sub._id}
                onClick={() => goToSection(idx)}
                className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition ${
                  activeSection === sub._id
                    ? "border-gray-300 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                {completedIds.has(sub._id) && <span className="text-green-400">✓</span>}
                <span className="max-w-[80px] truncate">{sub.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:flex lg:gap-6">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto bg-white shadow-lg transition-transform duration-200
          lg:static lg:z-auto lg:w-56 lg:shrink-0 lg:transform-none lg:rounded-xl lg:border lg:shadow-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="flex items-center justify-between border-b p-4 lg:hidden">
            <span className="text-sm font-medium text-gray-900">Sections</span>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-0.5 p-2 lg:sticky lg:top-20">
            {subsections.map((sub, idx) => {
              const done = completedIds.has(sub._id);
              return (
                <button
                  key={sub._id}
                  onClick={() => goToSection(idx)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition ${
                    activeSection === sub._id
                      ? "bg-gray-100 font-medium text-gray-900"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="shrink-0">{TYPE_ICONS[sub.type] || "📄"}</span>
                  <span className="min-w-0 flex-1 truncate">{sub.title}</span>
                  {done && <span className="shrink-0 text-xs text-green-500">✓</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {activeSub ? (
            <div className="rounded-xl border bg-white p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-5 flex items-start justify-between border-b pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{TYPE_ICONS[activeSub.type]}</span>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 sm:text-lg">{activeSub.title}</h2>
                    <p className="text-xs text-gray-400">{TYPE_LABELS[activeSub.type]}</p>
                  </div>
                </div>

                {/* Mark complete button */}
                <button
                  onClick={() => handleMarkComplete(activeSub._id)}
                  disabled={completing}
                  className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    completedIds.has(activeSub._id)
                      ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {completedIds.has(activeSub._id) ? "✓ Completed" : "Mark Complete"}
                </button>
              </div>

              {/* Content */}
              {Renderer && <Renderer content={activeSub.content} />}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t pt-4">
                <button
                  onClick={() => goToSection(activeIndex - 1)}
                  disabled={activeIndex <= 0}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-50 hover:text-gray-600 disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <div className="flex items-center gap-1">
                  {subsections.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSection(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeIndex ? "w-5 bg-gray-900" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goToSection(activeIndex + 1)}
                  disabled={activeIndex >= subsections.length - 1}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-30"
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border bg-white py-16 text-center">
              <p className="text-sm text-gray-400">Select a section to start</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
