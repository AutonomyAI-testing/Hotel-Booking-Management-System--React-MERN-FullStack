import AuthBrandPanel from "../components/AuthBrandPanel";

interface Props {
  children: React.ReactNode;
}

/**
 * AuthLayout — Full-viewport split panel layout for authentication pages.
 * Left: brand panel (hidden on mobile), Right: form area.
 * No header/footer — auth pages fill the viewport.
 */
const AuthLayout = ({ children }: Props) => {
  return (
    <div
      className="grid min-h-screen"
      style={{
        gridTemplateColumns: "1.05fr .95fr",
      }}
    >
      {/* Left: Brand panel */}
      <AuthBrandPanel />

      {/* Right: Form panel */}
      <div
        className="flex items-center justify-center"
        style={{
          background: "#121211",
          padding: "clamp(28px, 5vw, 64px)",
        }}
      >
        <div className="w-full max-w-[392px]">
          {/* Mobile-only wordmark */}
          <div
            className="flex md:hidden items-center gap-[11px] font-poppins font-extrabold text-[19px] tracking-[-0.01em] text-white mb-8"
          >
            <span
              className="w-[30px] h-[30px] rounded-[8px] flex-none flex items-center justify-center"
              style={{
                background: "linear-gradient(150deg, #F25730, #F69874)",
                boxShadow: "0 0 0 1px rgba(242,87,48,.35), 0 6px 18px rgba(242,87,48,.25)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[2.2]">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </span>
            <span>
              Mern<span style={{ color: "#F25730" }}>Holidays</span>
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
