import { Link } from "react-router-dom";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
import { Button } from "@/components/Button";
import { ThemeToggler } from "@/components/ThemeToggler";

const Landing = () => {
  const { authenticated } = useAuthContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute right-4 top-4">
        <ThemeToggler />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            WIUT Commercial Law
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-600">
            Master commercial law fundamentals with our comprehensive learning
            platform. Study essential modules, track your progress, and excel in
            your commercial law studies.
          </p>

          <div className="mb-16 flex justify-center gap-4">
            {authenticated ? (
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/auth/sign-in">Get Started</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your learning progress across all commercial law modules
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Practice Questions</h3>
            <p className="text-gray-600">
              Test your knowledge with comprehensive practice questions
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Key Terms</h3>
            <p className="text-gray-600">
              Master important legal terminology and concepts
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <svg
                className="h-6 w-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Case Studies</h3>
            <p className="text-gray-600">
              Learn from real-world commercial law cases and scenarios
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
