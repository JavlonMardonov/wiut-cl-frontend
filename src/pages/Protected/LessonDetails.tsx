import { useEffect, useState } from "react";
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

const TYPE_COLORS: Record<string, string> = {
  OVERVIEW: "border-blue-200 bg-blue-50",
  KEY_TERMS: "border-cyan-200 bg-cyan-50",
  CASES: "border-amber-200 bg-amber-50",
  STATUTES: "border-purple-200 bg-purple-50",
  PRACTICE_QUESTIONS: "border-green-200 bg-green-50",
  SUMMARY: "border-indigo-200 bg-indigo-50",
};

// ---------- HTML renderer ----------
function HtmlContent({ html, className = "" }: { html: string; className?: string }) {
  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function isHtml(str: string | undefined): boolean {
  return typeof str === "string" && str.trim().startsWith("<");
}

function RichText({ text, className = "" }: { text?: string; className?: string }) {
  if (!text) return null;
  if (isHtml(text)) return <HtmlContent html={text} className={className} />;
  return <p className={className}>{text}</p>;
}

// ---------- Content renderers ----------
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
        <div key={i} className="rounded-xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
          <h4 className="mb-1.5 text-sm font-bold text-cyan-900">{t.term}</h4>
          <RichText text={t.definition} className="text-sm leading-relaxed text-cyan-800" />
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
        <div key={i} className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-amber-900">{c.name}</h4>
            {c.citation && (
              <span className="rounded-full bg-amber-200/60 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {c.citation}
              </span>
            )}
          </div>
          {c.facts && (
            <div className="mb-3">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-amber-600">Facts</span>
              <RichText text={c.facts} className="text-sm leading-relaxed text-gray-700" />
            </div>
          )}
          {c.decision && (
            <div className="mb-3">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-amber-600">Decision</span>
              <RichText text={c.decision} className="text-sm leading-relaxed text-gray-700" />
            </div>
          )}
          {c.significance && (
            <div>
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-amber-600">Significance</span>
              <RichText text={c.significance} className="text-sm leading-relaxed text-gray-700" />
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
        <div key={i} className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-violet-50 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-purple-900">{s.name}</h4>
            {s.section && (
              <span className="rounded-full bg-purple-200/60 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                {s.section}
              </span>
            )}
          </div>
          <RichText text={s.description} className="mb-3 text-sm leading-relaxed text-gray-700" />
          {s.keyPoints?.length > 0 && (
            <ul className="space-y-1 text-sm text-purple-700">
              {s.keyPoints.map((p: string, j: number) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
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

  const score = Object.entries(showResults).filter(([, shown]) => shown).length;
  const correct = Object.entries(answers).filter(
    ([i, a]) => showResults[Number(i)] && questions[Number(i)]?.correctIndex === a
  ).length;

  return (
    <div className="space-y-5">
      {score > 0 && (
        <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 text-center">
          <span className="text-2xl font-bold text-emerald-700">{correct}/{score}</span>
          <span className="ml-2 text-sm text-emerald-600">correct answers</span>
        </div>
      )}
      {questions.map((q: any, i: number) => (
        <div key={i} className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5">
          <div className="mb-3 font-semibold text-gray-900">
            <span className="mr-1 text-green-600">Q{i + 1}.</span>
            <RichText text={q.question} className="inline" />
          </div>
          <div className="mb-3 space-y-2">
            {(q.options || []).map((opt: string, oi: number) => {
              const selected = answers[i] === oi;
              const shown = showResults[i];
              const isCorrect = oi === q.correctIndex;
              let cls = "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50";
              if (shown && isCorrect) cls = "border-emerald-400 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200";
              else if (shown && selected) cls = "border-red-400 bg-red-50 text-red-800";
              else if (selected && !shown) cls = "border-green-400 bg-green-50";

              return (
                <button
                  key={oi}
                  onClick={() => {
                    setAnswers({ ...answers, [i]: oi });
                    setShowResults({ ...showResults, [i]: true });
                  }}
                  disabled={shown}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition ${cls}`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    shown && isCorrect ? "bg-emerald-500 text-white" : shown && selected ? "bg-red-400 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {shown && isCorrect ? "✓" : shown && selected ? "✗" : String.fromCharCode(65 + oi)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {showResults[i] && q.explanation && (
            <div className="rounded-lg bg-white/80 p-3 text-sm text-gray-600">
              <span className="font-semibold text-gray-700">💡 Explanation: </span>
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
        <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-5">
          <h4 className="mb-3 text-sm font-bold text-indigo-900">📌 Key Points</h4>
          <ul className="space-y-2 text-sm text-indigo-700">
            {content.keyPoints.map((p: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center">
      <p className="text-sm text-gray-400">{text}</p>
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

// ---------- Main component ----------
const LessonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [subsections, setSubsections] = useState<Subsection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="rounded-full bg-gray-100 p-4 text-3xl">📚</div>
        <p className="text-gray-500">Lesson not found</p>
        <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const activeSub = subsections.find((s) => s._id === activeSection);
  const Renderer = activeSub ? (RENDERERS[activeSub.type] || OverviewContent) : null;
  const activeIndex = subsections.findIndex((s) => s._id === activeSection);

  const goToSection = (idx: number) => {
    if (idx >= 0 && idx < subsections.length) {
      setActiveSection(subsections[idx]._id);
      setSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Lesson header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* Mobile sections toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 lg:hidden"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Sections
            </button>
          </div>

          <h1 className="mt-2 text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">{lesson.title}</h1>

          {lesson.description && (
            <RichText
              text={lesson.description}
              className="mt-1 text-sm text-gray-500"
            />
          )}

          <div className="mt-2 flex gap-4 text-xs text-gray-400">
            {lesson.subsection_count !== undefined && (
              <span>📄 {lesson.subsection_count} sections</span>
            )}
            {lesson.estimated_minutes && (
              <span>⏱ ~{lesson.estimated_minutes} min</span>
            )}
          </div>

          {/* Section pills (mobile horizontal scroll) */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {subsections.map((sub, idx) => (
              <button
                key={sub._id}
                onClick={() => goToSection(idx)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  activeSection === sub._id
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {TYPE_ICONS[sub.type] || "📄"}
                <span className="max-w-[100px] truncate">{sub.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:flex lg:gap-6">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Desktop sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto bg-white shadow-xl transition-transform duration-200
            lg:static lg:z-auto lg:w-60 lg:shrink-0 lg:transform-none lg:rounded-xl lg:border lg:shadow-none
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="flex items-center justify-between border-b p-4 lg:hidden">
            <span className="text-sm font-semibold text-gray-900">Sections</span>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-0.5 p-2 lg:sticky lg:top-20">
            {subsections.map((sub, idx) => (
              <button
                key={sub._id}
                onClick={() => goToSection(idx)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeSection === sub._id
                    ? `font-semibold text-gray-900 ${TYPE_COLORS[sub.type] || "bg-blue-50"} border`
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border border-transparent"
                }`}
              >
                <span className="shrink-0 text-base">{TYPE_ICONS[sub.type] || "📄"}</span>
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-[13px]">{sub.title}</span>
                  <span className="block text-[11px] text-gray-400">{TYPE_LABELS[sub.type]}</span>
                </div>
                {sub.is_completed && (
                  <span className="shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">✓</span>
                )}
              </button>
            ))}
            {subsections.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-xs text-gray-400">No sections yet</p>
              </div>
            )}
          </nav>
        </div>

        {/* Content area */}
        <div className="min-w-0 flex-1">
          {activeSub ? (
            <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6 lg:p-8">
              {/* Section header */}
              <div className="mb-5 border-b pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-xl">
                    {TYPE_ICONS[activeSub.type]}
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">{activeSub.title}</h2>
                    <p className="text-xs text-gray-400">{TYPE_LABELS[activeSub.type]}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              {Renderer && <Renderer content={activeSub.content} />}

              {/* Prev / Next */}
              <div className="mt-8 flex items-center justify-between border-t pt-4">
                <button
                  onClick={() => goToSection(activeIndex - 1)}
                  disabled={activeIndex <= 0}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {subsections.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSection(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeIndex ? "w-6 bg-blue-500" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goToSection(activeIndex + 1)}
                  disabled={activeIndex >= subsections.length - 1}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-30"
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border bg-white py-16 text-center shadow-sm">
              <p className="text-2xl">📖</p>
              <p className="mt-2 text-sm text-gray-400">Select a section to start studying</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
