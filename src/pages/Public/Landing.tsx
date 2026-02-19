import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "@/auth/hooks/useAuthContext";

const Landing = () => {
  const { authenticated } = useAuthContext();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">⚖️</span>
            <span className="text-base font-bold text-gray-900 sm:text-lg">WIUT Commercial Law</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-3 sm:flex">
            {authenticated ? (
              <Link
                to="/dashboard"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/sign-in"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/sign-up"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileNav ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileNav && (
          <div className="border-t bg-white px-4 py-3 sm:hidden">
            {authenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileNav(false)}
                className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Dashboard →
              </Link>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/auth/sign-in"
                  onClick={() => setMobileNav(false)}
                  className="block w-full rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/sign-up"
                  onClick={() => setMobileNav(false)}
                  className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-24 lg:py-32">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium text-blue-700 sm:text-sm">
            📚 Westminster International University in Tashkent
          </div>
          <h1 className="mx-auto mb-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Master <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Commercial Law</span> with Confidence
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base text-gray-500 sm:text-lg">
            Study essential modules, practice with real case studies, and track your progress — all in one place.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={authenticated ? "/dashboard" : "/auth/sign-up"}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 sm:text-base"
            >
              {authenticated ? "Go to Dashboard" : "Start Learning — Free"}
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:text-base"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-gray-50">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 py-8 sm:py-12 md:grid-cols-4 md:gap-8">
          {[
            { value: "15+", label: "Lessons" },
            { value: "90+", label: "Subsections" },
            { value: "200+", label: "Questions" },
            { value: "50+", label: "Case Studies" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold text-blue-600 sm:text-3xl">{s.value}</div>
              <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Everything You Need to Excel</h2>
            <p className="text-sm text-gray-500 sm:text-base">Structured content designed around the WIUT curriculum</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {[
              { icon: "📖", title: "Structured Lessons", desc: "Clear, organized modules covering all commercial law topics." },
              { icon: "📝", title: "Key Terms", desc: "Master legal terminology with comprehensive glossaries." },
              { icon: "⚖️", title: "Case Studies", desc: "Learn from landmark cases with detailed analysis." },
              { icon: "📊", title: "Statutes", desc: "Navigate key statutes with clear explanations." },
              { icon: "❓", title: "Practice Questions", desc: "Test yourself with MCQs and instant feedback." },
              { icon: "📈", title: "Progress Tracking", desc: "Monitor your learning journey across all modules." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border bg-white p-5 transition hover:shadow-md sm:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                  {f.icon}
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">{f.title}</h3>
                <p className="text-xs text-gray-500 sm:text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your free account in seconds" },
              { step: "2", title: "Study", desc: "Browse lessons, cases, and key terms" },
              { step: "3", title: "Practice", desc: "Test yourself and track your progress" },
            ].map((s) => (
              <div key={s.step}>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-1 text-sm font-semibold sm:text-base">{s.title}</h3>
                <p className="text-xs text-gray-500 sm:text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-md px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">Ready to Start?</h2>
          <p className="mb-6 text-sm text-gray-500 sm:text-base">Join WIUT students already using the platform</p>
          <Link
            to={authenticated ? "/dashboard" : "/auth/sign-up"}
            className="inline-block rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 sm:text-base"
          >
            {authenticated ? "Go to Dashboard" : "Get Started — It's Free"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-xs text-gray-400 sm:text-sm">
          © 2026 WIUT Commercial Law Study Platform
        </div>
      </footer>
    </div>
  );
};

export default Landing;
