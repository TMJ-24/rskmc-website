import { AlertTriangle } from "lucide-react";

function NoBackend({ section }: { section: string }) {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold text-navy-700 mb-6">{section}</h1>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
        <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800 mb-1">No backend connected</p>
          <p className="text-amber-700 text-sm">This is a static site. Connect a backend to manage {section.toLowerCase()} content.</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <NoBackend section="Core Values" />;
}
