import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useMutationWithLoading } from "../hooks/useLoadingHooks";
import * as apiClient from "../api-client";
import useAppContext from "../hooks/useAppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export type SignInFormData = {
  email: string;
  password: string;
};

/* ─────────────────────────────────────────────────
   Small inline SVG icons (no extra dependency)
───────────────────────────────────────────────── */
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    aria-hidden="true"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

/* ─────────────────────────────────────────────────
   Pipeline step component (left panel decoration)
───────────────────────────────────────────────── */
interface PipelineStepProps {
  dot: string;
  label: string;
  sublabel: string;
  isLast?: boolean;
}
const PipelineStep = ({ dot, label, sublabel, isLast }: PipelineStepProps) => (
  <div className="flex items-start gap-3">
    <div className="flex flex-col items-center">
      <div
        className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
        style={{ backgroundColor: dot }}
      />
      {!isLast && (
        <div
          className="w-px flex-1 mt-1"
          style={{ backgroundColor: "rgba(255,255,255,0.1)", minHeight: 28 }}
        />
      )}
    </div>
    <div className="pb-1">
      <p className="text-sm font-medium leading-tight" style={{ color: "#E8E6DE" }}>
        {label}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "#7A7870" }}>
        {sublabel}
      </p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────── */
const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutationWithLoading(apiClient.signIn, {
    onSuccess: async () => {
      showToast({
        title: "Sign In Successful",
        description:
          "Welcome back! You have been successfully signed in to your account.",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({
        title: "Sign In Failed",
        description: error.message,
        type: "ERROR",
      });
    },
    loadingMessage: "Signing you in...",
  });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    mutation.mutate(data, {
      onSettled: () => setIsLoading(false),
    });
  });

  /* ── shared input style ── */
  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "#212120",
    border: "1px solid #2A2A28",
    borderRadius: 8,
    color: "#E8E6DE",
    fontSize: 14,
    padding: "10px 12px 10px 38px",
    outline: "none",
    transition: "border-color 0.15s ease-out, box-shadow 0.15s ease-out",
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#121211", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* ══════════════════════════════════════════
          LEFT BRAND PANEL  (hidden on mobile)
      ══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between relative overflow-hidden film-grain"
        style={{
          width: "55%",
          background:
            "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(242,87,48,0.18) 0%, transparent 70%), #121211",
          padding: "clamp(40px, 5vw, 64px)",
        }}
      >
        {/* Decorative warm glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "15%",
            left: "-5%",
            width: "55%",
            height: "45%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(242,87,48,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Content sits above glow */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Wordmark */}
          <div className="flex items-center gap-2 mb-12">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#F25730",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>
            <span
              style={{ color: "#E8E6DE", fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}
            >
              StayEase
            </span>
          </div>

          {/* Eyebrow */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F25730",
              marginBottom: 16,
            }}
          >
            Hotel Booking Platform
          </p>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              color: "transparent",
              background: "linear-gradient(135deg, #F25730 0%, #F69874 50%, #E8E6DE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your perfect stay,<br />seamlessly booked.
          </h1>

          {/* Supporting copy */}
          <p style={{ fontSize: 15, color: "#7A7870", lineHeight: 1.6, marginBottom: 40, maxWidth: 360 }}>
            Search thousands of hotels, compare rates in real time, and manage
            all your bookings from one place — wherever you are.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mb-12">
            {["Instant Confirmation", "Best Rate Guarantee", "Free Cancellation"].map((b) => (
              <span
                key={b}
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "5px 10px",
                  borderRadius: 20,
                  border: "1px solid rgba(242,87,48,0.3)",
                  color: "#F69874",
                  background: "rgba(242,87,48,0.08)",
                  letterSpacing: "0.02em",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Pipeline visualization */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <p
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4946", marginBottom: 16 }}
          >
            Booking flow
          </p>
          <PipelineStep
            dot="#60A5FA"
            label="Search hotels"
            sublabel="Filter by location, dates & amenities"
          />
          <PipelineStep
            dot="#FBBF24"
            label="Compare &amp; select"
            sublabel="View photos, reviews &amp; live rates"
          />
          <PipelineStep
            dot="#34D399"
            label="Booking confirmed"
            sublabel="Instant confirmation email sent"
            isLast
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT FORM PANEL
      ══════════════════════════════════════════ */}
      <div
        className="flex-1 flex flex-col items-center justify-center"
        style={{ padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 56px)" }}
      >
        {/* Mobile wordmark */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "#F25730",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
          </div>
          <span style={{ color: "#E8E6DE", fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em" }}>StayEase</span>
        </div>

        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Heading */}
          <h2
            style={{
              color: "#E8E6DE",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              marginBottom: 6,
            }}
          >
            Welcome back
          </h2>
          <p style={{ color: "#7A7870", fontSize: 14, marginBottom: 28 }}>
            Sign in to manage your bookings
          </p>

          {/* ── SSO Buttons ── */}
          <div className="flex gap-3 mb-6">
            {/* GitHub */}
            <button
              type="button"
              aria-label="Sign in with GitHub"
              title="GitHub sign-in — coming soon"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "#212120",
                border: "1px solid #2A2A28",
                borderRadius: 8,
                color: "#B0AEA6",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 16px",
                cursor: "not-allowed",
                opacity: 0.7,
                transition: "border-color 0.15s",
              }}
            >
              <GitHubIcon />
              GitHub
            </button>

            {/* Google */}
            <button
              type="button"
              aria-label="Sign in with Google"
              title="Google sign-in — coming soon"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "#212120",
                border: "1px solid #2A2A28",
                borderRadius: 8,
                color: "#B0AEA6",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 16px",
                cursor: "not-allowed",
                opacity: 0.7,
                transition: "border-color 0.15s",
              }}
            >
              <GoogleIcon />
              Google
            </button>
          </div>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 mb-6">
            <div style={{ flex: 1, height: 1, background: "#2A2A28" }} />
            <span style={{ color: "#4A4946", fontSize: 12, fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#2A2A28" }} />
          </div>

          {/* ── Auth Form ── */}
          <form onSubmit={onSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="email"
                style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#B0AEA6", marginBottom: 6 }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#4A4946",
                    pointerEvents: "none",
                  }}
                >
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={{
                    ...inputBase,
                    borderColor: errors.email ? "#EF4444" : "#2A2A28",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#F25730";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242,87,48,0.15)";
                  }}
                  {...register("email", {
                    required: "Email is required",
                    onBlur: (e) => {
                      e.target.style.borderColor = errors.email ? "#EF4444" : "#2A2A28";
                      e.target.style.boxShadow = "none";
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p style={{ color: "#EF4444", fontSize: 12, marginTop: 5 }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="password"
                style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#B0AEA6", marginBottom: 6 }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#4A4946",
                    pointerEvents: "none",
                  }}
                >
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{
                    ...inputBase,
                    paddingRight: 40,
                    borderColor: errors.password ? "#EF4444" : "#2A2A28",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#F25730";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242,87,48,0.15)";
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    onBlur: (e) => {
                      e.target.style.borderColor = errors.password ? "#EF4444" : "#2A2A28";
                      e.target.style.boxShadow = "none";
                    },
                  })}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#4A4946",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: "#EF4444", fontSize: 12, marginTop: 5 }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password row */}
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: 22 }}
            >
              <label
                style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: 15,
                    height: 15,
                    accentColor: "#F25730",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: 13, color: "#7A7870" }}>Remember me</span>
              </label>
              <a
                href="#"
                style={{
                  fontSize: 13,
                  color: "#F25730",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#FC816F")}
                onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#F25730")}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                background: isLoading ? "#ED5339" : "#F25730",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                borderRadius: 8,
                padding: "11px 16px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background 0.15s ease-out, box-shadow 0.15s ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: isLoading ? "none" : "0 4px 16px rgba(242,87,48,0.35)",
                letterSpacing: "-0.01em",
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLButtonElement).style.background = "#ED5339";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 20px rgba(242,87,48,0.5)";
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLButtonElement).style.background = "#F25730";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 16px rgba(242,87,48,0.35)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* ── Sign-up link ── */}
          <p
            style={{
              textAlign: "center",
              marginTop: 24,
              fontSize: 13,
              color: "#7A7870",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#F25730", fontWeight: 600, textDecoration: "none" }}
              onMouseOver={(e) =>
                ((e.target as HTMLElement).style.color = "#FC816F")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLElement).style.color = "#F25730")
              }
            >
              Create one
            </Link>
          </p>

          {/* ── Security notice ── */}
          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 11,
              color: "#4A4946",
              lineHeight: 1.5,
            }}
          >
            Protected by 256-bit SSL encryption.{" "}
            <a
              href="#"
              style={{ color: "#4A4946", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default SignIn;
