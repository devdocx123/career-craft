export default function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-1.5 w-full bg-slate-700" />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-slate-700 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-700 rounded w-3/4" />
            <div className="h-3 bg-slate-700 rounded w-1/2" />
            <div className="h-3 bg-slate-700 rounded w-2/3" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-slate-700 rounded" />
          <div className="h-3 bg-slate-700 rounded" />
          <div className="h-3 bg-slate-700 rounded w-4/5" />
        </div>
        <div className="flex gap-2 mb-5">
          <div className="h-6 w-20 bg-slate-700 rounded-full" />
          <div className="h-6 w-24 bg-slate-700 rounded-full" />
          <div className="h-6 w-16 bg-slate-700 rounded-full" />
        </div>
        <div className="h-10 bg-slate-700 rounded-xl" />
      </div>
    </div>
  );
}
