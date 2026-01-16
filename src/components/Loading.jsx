export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-lg">Starting server…</p>
        <p className="text-sm opacity-60">First load may take 10–30 seconds</p>
      </div>
    </div>
  );
}
