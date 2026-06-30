import { Hotel } from "lucide-react";

/**
 * AuthBrandPanel — Left dark brand/messaging panel for auth pages.
 * Mirrors the split-panel brand section from the AutonomyAI Login design.
 */
const AuthBrandPanel = () => {
  return (
    <section
      className="relative hidden md:flex flex-col overflow-hidden"
      style={{
        background: "#121211",
        borderRight: "1px solid #3C3B39",
        padding: "clamp(36px, 4.5vw, 64px)",
      }}
    >
      {/* Warm off-axis glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(60% 55% at 18% 8%, rgba(94,84,82,.45), transparent 60%),
            radial-gradient(50% 50% at 92% 100%, rgba(242,87,48,.10), transparent 62%)
          `,
        }}
      />

      {/* Film grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.045,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Wordmark / Logo */}
      <div className="relative z-10 flex items-center gap-[11px] font-poppins font-extrabold text-[19px] tracking-[-0.01em] text-white">
        <span
          className="w-[30px] h-[30px] rounded-[8px] flex-none flex items-center justify-center shadow-glow-orange-sm"
          style={{
            background: "linear-gradient(150deg, #F25730, #F69874)",
          }}
        >
          <Hotel className="w-4 h-4 text-white stroke-[2.2]" />
        </span>
        <span>
          Mern<span style={{ color: "#F25730" }}>Holidays</span>
        </span>
        <span
          aria-hidden="true"
          className="w-px h-[18px] mx-[3px]"
          style={{ background: "#3C3B39" }}
        />
        <span className="font-medium text-[14px] tracking-normal" style={{ color: "#B4B1AC" }}>
          Hotel Booking
        </span>
      </div>

      {/* Mid content */}
      <div className="relative z-10 mt-auto mb-auto py-12 max-w-[480px]">
        <p
          className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase mb-[22px]"
          style={{ color: "#F25730" }}
        >
          Premium hotel booking
        </p>
        <h1
          className="font-poppins font-extrabold leading-[1.05] tracking-[-0.02em] m-0 text-white"
          style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}
        >
          Find your perfect{" "}
          <span
            style={{
              background: "linear-gradient(95deg, #F25730, #F69874)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            stay.
          </span>
        </h1>
        <p
          className="text-[18px] leading-[1.55] mt-[22px] max-w-[420px]"
          style={{ color: "#B4B1AC" }}
        >
          Discover and book from thousands of hotels worldwide. Curated stays,
          seamless booking, and instant confirmations — all in one place.
        </p>

        {/* Pipeline / steps */}
        <div className="mt-10 flex flex-col" aria-hidden="true">
          {[
            {
              dotColor: "#9FD2ED",
              dotShadow: "0 0 0 4px rgba(159,210,237,.12)",
              bold: "Search & discover",
              text: " — browse thousands of verified hotels",
              time: "Step 1",
            },
            {
              dotColor: "#E8A13C",
              dotShadow: "0 0 0 4px rgba(232,161,60,.12)",
              bold: "Compare & choose",
              text: " — rooms, prices, amenities at a glance",
              time: "Step 2",
            },
            {
              dotColor: "#4FB477",
              dotShadow: "0 0 0 4px rgba(79,180,119,.14)",
              bold: "Book & confirm",
              text: " — instant confirmation, no waiting",
              time: "Step 3",
            },
          ].map((row, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-[14px] relative py-[11px]"
              style={
                i < arr.length - 1
                  ? {
                      // Vertical connector line
                    }
                  : {}
              }
            >
              {/* Connector line between nodes */}
              {i < arr.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "calc(50% + 8px)",
                    width: "1px",
                    height: "calc(100% - 4px)",
                    background: "#3C3B39",
                  }}
                />
              )}
              <span
                className="w-[11px] h-[11px] rounded-full flex-none relative z-10"
                style={{
                  background: row.dotColor,
                  boxShadow: row.dotShadow,
                }}
              />
              <span
                className="font-mono text-[12.5px] tracking-[0.02em] flex-1"
                style={{ color: "#B4B1AC" }}
              >
                <b className="font-semibold" style={{ color: "#FFFFFF", fontFamily: "inherit" }}>
                  {row.bold}
                </b>
                {row.text}
              </span>
              <span
                className="font-mono text-[11px] ml-auto"
                style={{ color: "#7C7A75" }}
              >
                {row.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer trust badges */}
      <div
        className="relative z-10 flex items-center gap-[18px] font-mono text-[11px] tracking-[0.04em]"
        style={{ color: "#7C7A75" }}
      >
        <span>SSL Secured</span>
        <span
          className="w-1 h-1 rounded-full"
          aria-hidden="true"
          style={{ background: "#4A4946" }}
        />
        <span>PCI Compliant</span>
        <span
          className="w-1 h-1 rounded-full"
          aria-hidden="true"
          style={{ background: "#4A4946" }}
        />
        <span>500k+ Bookings</span>
      </div>
    </section>
  );
};

export default AuthBrandPanel;
