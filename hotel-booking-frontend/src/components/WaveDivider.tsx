const WaveDivider = () => {
  return (
    <div className="w-full overflow-hidden">
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WaveDivider;
