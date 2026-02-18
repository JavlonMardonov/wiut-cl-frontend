import { Link } from "react-router-dom";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
import { Button } from "@/components/Button";

const Landing = () => {
  const { authenticated } = useAuthContext();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold text-gray-900">WIUT Commercial Law</span>
          </div>
          <div className="flex items-center gap-3">
            {authenticated ? (
              <Button asChild size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/auth/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="container relative mx-auto px-4 py-24 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            <span>📚</span> Westminster International University in Tashkent
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
            Master <span className="text-blue-600">Commercial Law</span> with Confidence
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
            A comprehensive learning platform designed for WIUT students. Study essential modules,
            practice with real case studies, and track your progress — all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to={authenticated ? "/dashboard" : "/auth/sign-up"}>
                {authenticated ? "Go to Dashboard" : "Start Learning Free"}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-gray-50">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
          {[
            { value: "15+", label: "Lessons" },
            { value: "90+", label: "Subsections" },
            { value: "200+", label: "Practice Questions" },
            { value: "50+", label: "Case Studies" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
              <div className="mt-1 text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Everything You Need to Excel</h2>
            <p className="text-gray-600">Structured content designed around the WIUT curriculum</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "📖", title: "Structured Lessons", desc: "Clear, organized modules covering all commercial law topics from contracts to company law." },
              { icon: "📝", title: "Key Terms & Definitions", desc: "Master legal terminology with comprehensive glossaries for each module." },
              { icon: "⚖️", title: "Case Studies", desc: "Learn from landmark commercial law cases with detailed facts, decisions, and significance." },
              { icon: "📊", title: "Statutes & Legislation", desc: "Navigate key statutes and legislative provisions with clear explanations." },
              { icon: "❓", title: "Practice Questions", desc: "Test your knowledge with interactive MCQs and get instant feedback with explanations." },
              { icon: "📈", title: "Progress Tracking", desc: "Monitor your learning journey and identify areas that need more attention." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border bg-white p-6 transition hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Sign Up", desc: "Create your free account in seconds" },
              { step: "2", title: "Study", desc: "Browse lessons, read cases, learn key terms" },
              { step: "3", title: "Practice", desc: "Test yourself with quizzes and track progress" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-1 text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Start?</h2>
          <p className="mb-8 text-gray-600">Join WIUT students already using the platform</p>
          <Button asChild size="lg">
            <Link to={authenticated ? "/dashboard" : "/auth/sign-up"}>
              {authenticated ? "Go to Dashboard" : "Get Started — It's Free"}
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2026 WIUT Commercial Law Study Platform. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
