import { Suspense } from "react";
import SearchContent from "./SearchContent";

export const metadata = {
  title: "Search | RSKMC",
  description: "Search pages and content on the Rev Sione Kami Memorial Church website.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Searching…</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
