// components/TourModal.jsx
export default function TourModal({ onStart, onSkip }) {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-90 z-100 flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Are you visiting Jatin's Portfolio for the first time?
      </h1>

      <div className="flex gap-4">
        <button
          onClick={onStart}
          className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded-xl text-white text-lg transition-all"
        >
          Start Tour
        </button>
        <button
          onClick={onSkip}
          className="bg-gray-600 hover:bg-gray-800 px-6 py-3 rounded-xl text-white text-lg transition-all"
        >
          Skip Tour
        </button>
      </div>
    </div>
  );
}
