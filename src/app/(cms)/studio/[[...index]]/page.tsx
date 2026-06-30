import Link from "next/link";

export default function StudioPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Sanity Studio</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sanity Studio runs as a standalone app. Start it with:
        </p>
        <code className="block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono">
          npx sanity dev
        </code>
        <p className="text-sm text-gray-500">
          It will be available at{" "}
          <a href="http://localhost:3333" className="text-primary hover:underline">
            http://localhost:3333
          </a>
        </p>
      </div>
    </div>
  );
}
