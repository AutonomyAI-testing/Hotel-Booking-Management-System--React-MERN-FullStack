import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useMutationWithLoading } from "../hooks/useLoadingHooks";
import * as apiClient from "../api-client";
import useAppContext from "../hooks/useAppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignIn.css";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  return (
    <div className="signin-shell">
      {/* =================== BRAND PANEL (left) =================== */}
      <section className="signin-brand" aria-hidden="true">
        {/* Wordmark */}
        <div className="signin-wordmark">
          <span className="glyph">
            <svg viewBox="0 0 24 24" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span>Hotel<span style={{ color: "#F25730" }}>Book</span></span>
          <span className="div-sep" aria-hidden="true" />
          <span className="product-name">Guest Portal</span>
        </div>

        {/* Brand mid */}
        <div className="signin-brand-mid">
          <p className="signin-eyebrow">Effortless hotel reservations</p>
          <h1 className="signin-brand-h1">
            Your perfect stay, <span className="grad">just a click away.</span>
          </h1>
          <p className="signin-lede">
            Search thousands of hotels worldwide, compare prices, and book
            instantly — all from one seamless platform built for modern travelers.
          </p>

          <div className="signin-pipeline" aria-hidden="true">
            <div className="signin-pl-row n-blue">
              <span className="signin-pl-label">
                <b>Search & discover</b> — hotels across 100+ destinations
              </span>
              <span className="signin-pl-time">step 1</span>
            </div>
            <div className="signin-pl-row n-amber">
              <span className="signin-pl-label">
                <b>Compare & choose</b> — filter by price, rating, amenities
              </span>
              <span className="signin-pl-time">step 2</span>
            </div>
            <div className="signin-pl-row n-ok">
              <span className="signin-pl-label">
                <b>Book & confirm</b> — instant confirmation, no hidden fees
              </span>
              <span className="signin-pl-time">step 3</span>
            </div>
          </div>
        </div>

        {/* Brand footer */}
        <div className="signin-brand-foot">
          <span>Secure payments</span>
          <span className="dot" aria-hidden="true" />
          <span>Free cancellation</span>
          <span className="dot" aria-hidden="true" />
          <span>24/7 support</span>
        </div>
      </section>

      {/* =================== AUTH PANEL (right) =================== */}
      <section className="signin-auth">
        <div className="signin-card">
          {/* Mobile-only wordmark */}
          <div className="signin-mobile-mark" aria-hidden="true">
            <span className="glyph">
              <svg viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </span>
            <span>Hotel<span style={{ color: "#F25730" }}>Book</span></span>
          </div>

          {/* Auth header */}
          <div className="signin-auth-head">
            <p className="ey">Sign in</p>
            <h2>Welcome back</h2>
            <p>Your next stay is waiting for you.</p>
          </div>

          {/* SSO buttons */}
          <div className="signin-sso">
            <button
              type="button"
              onClick={() =>
                showToast({
                  title: "Coming Soon",
                  description: "Google sign-in will be available soon.",
                  type: "SUCCESS",
                })
              }
            >
              {/* Google icon */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
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
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="signin-divider">
            <span>or</span>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} noValidate>
            {/* Email */}
            <div className="signin-field">
              <label htmlFor="signin-email">Work email</label>
              <div className="signin-input-wrap">
                <input
                  id="signin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={errors.email ? "has-error" : ""}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="signin-error-msg">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="signin-field">
              <div className="signin-lbl-row">
                <label htmlFor="signin-password">Password</label>
                <Link to="/forgot-password" tabIndex={0}>
                  Forgot password?
                </Link>
              </div>
              <div className="signin-input-wrap">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className={`with-reveal${errors.password ? " has-error" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="signin-reveal"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                      <line x1="3" y1="3" x2="21" y2="21" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24">
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="signin-error-msg">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me */}
            <label className="signin-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="box" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12.5 10 17l9-10" />
                </svg>
              </span>
              <span className="label">Keep me signed in</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`signin-submit${isLoading ? " loading" : ""}`}
            >
              <span className="signin-spinner" aria-hidden="true" />
              <span className="signin-submit-label">
                {isLoading ? "Signing in…" : "Sign in"}
              </span>
            </button>
          </form>

          {/* Footnote */}
          <p className="signin-footnote">
            New to HotelBook?{" "}
            <Link to="/register">Create an account</Link>
          </p>

          {/* Secure badge */}
          <div className="signin-secure">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Encrypted &amp; secure payments
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
