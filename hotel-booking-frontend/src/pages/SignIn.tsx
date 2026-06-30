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

const FOCUS_BORDER = "#F25730";
const FOCUS_SHADOW = "0 0 0 3px rgba(242,87,48,.55)";
const DEFAULT_BORDER = "#3C3B39";
const ERROR_BORDER = "#E5533C";

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
        description: "Welcome back! You have been successfully signed in.",
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

  /** Wrap RHF register to merge orange focus/blur ring styling */
  function withRing<T extends HTMLInputElement>(
    rhfProps: ReturnType<typeof register>,
    hasError: boolean
  ) {
    const { onBlur: rhfBlur, ...rest } = rhfProps;
    return {
      ...rest,
      onFocus: (e: React.FocusEvent<T>) => {
        e.currentTarget.style.borderColor = FOCUS_BORDER;
        e.currentTarget.style.boxShadow = FOCUS_SHADOW;
      },
      onBlur: (e: React.FocusEvent<T>) => {
        e.currentTarget.style.borderColor = hasError ? ERROR_BORDER : DEFAULT_BORDER;
        e.currentTarget.style.boxShadow = "none";
        rhfBlur(e as React.FocusEvent<HTMLInputElement>);
      },
    };
  }

  const baseInputClass =
    "w-full font-poppins text-[15px] text-white rounded-[8px] px-[14px] py-[12px] outline-none transition-all duration-150";

  return (
    <div className="w-full">
      {/* Auth head */}
      <div style={{ marginBottom: "30px" }}>
        <p
          className="font-mono font-medium text-[12px] tracking-[0.16em] uppercase m-0 mb-[14px]"
          style={{ color: "#7C7A75" }}
        >
          Sign in
        </p>
        <h2
          className="font-poppins font-bold leading-[1.1] tracking-[-0.02em] m-0 text-white"
          style={{ fontSize: "30px" }}
        >
          Welcome back
        </h2>
        <p className="text-[15px] leading-[1.5] mt-[9px]" style={{ color: "#B4B1AC" }}>
          Pick up where you left off.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-[13px] font-medium mb-[7px]"
            style={{ color: "#B4B1AC" }}
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={baseInputClass}
            style={{
              background: "#333333",
              border: `1px solid ${errors.email ? ERROR_BORDER : DEFAULT_BORDER}`,
            }}
            {...withRing(register("email", { required: "Email is required" }), !!errors.email)}
          />
          {errors.email && (
            <p className="text-[12.5px] mt-[6px]" style={{ color: ERROR_BORDER }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-[7px]">
            <label
              htmlFor="password"
              className="block text-[13px] font-medium"
              style={{ color: "#B4B1AC" }}
            >
              Password
            </label>
            <a
              href="#"
              className="text-[12.5px] no-underline hover:underline"
              style={{ color: "#F25730" }}
            >
              Forgot password?
            </a>
          </div>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••••••"
              className={`${baseInputClass} pr-[44px]`}
              style={{
                background: "#333333",
                border: `1px solid ${errors.password ? ERROR_BORDER : DEFAULT_BORDER}`,
              }}
              {...withRing(
                register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                }),
                !!errors.password
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-[6px] p-2 rounded-[6px] flex items-center justify-center border-0 bg-transparent cursor-pointer transition-colors duration-150"
              style={{ color: "#7C7A75" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#B4B1AC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#7C7A75";
              }}
            >
              {showPassword ? (
                <EyeOff className="w-[17px] h-[17px] stroke-[1.8]" />
              ) : (
                <Eye className="w-[17px] h-[17px] stroke-[1.8]" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[12.5px] mt-[6px]" style={{ color: ERROR_BORDER }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <label
          className="flex items-center gap-[9px] text-[13.5px] cursor-pointer select-none mt-[2px]"
          style={{ color: "#B4B1AC" }}
        >
          <input
            type="checkbox"
            className="absolute opacity-0 w-0 h-0"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span
            className="w-[17px] h-[17px] rounded-[5px] flex items-center justify-center flex-none transition-all duration-150"
            style={{
              border: `1px solid ${rememberMe ? "#F25730" : "#4A4946"}`,
              background: rememberMe ? "#F25730" : "#333333",
            }}
          >
            {rememberMe && (
              <svg
                viewBox="0 0 24 24"
                className="w-[11px] h-[11px] fill-none stroke-white stroke-[2.6]"
              >
                <path d="M5 12.5 10 17l9-10" />
              </svg>
            )}
          </span>
          Keep me signed in
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-[4px] w-full font-poppins font-semibold text-[15px] text-white border-0 rounded-[8px] px-[16px] py-[13px] flex items-center justify-center gap-[9px] transition-all duration-150"
          style={{
            background: isLoading ? "#ED5339" : "#F25730",
            boxShadow: "0 0 0 1px rgba(242,87,48,.35), 0 8px 30px rgba(242,87,48,.22)",
            cursor: isLoading ? "wait" : "pointer",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = "#FC816F";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = "#F25730";
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          {isLoading && (
            <span
              className="w-[16px] h-[16px] rounded-full flex-none animate-auth-spin"
              style={{
                border: "2px solid rgba(255,255,255,.4)",
                borderRightColor: "#fff",
              }}
              aria-hidden="true"
            />
          )}
          <span style={{ opacity: isLoading ? 0.85 : 1 }}>
            {isLoading ? "Signing in…" : "Sign in"}
          </span>
        </button>
      </form>

      {/* Footnote */}
      <p
        className="mt-[26px] text-center text-[13.5px]"
        style={{ color: "#B4B1AC" }}
      >
        New to MernHolidays?{" "}
        <Link
          to="/register"
          className="font-medium no-underline hover:underline"
          style={{ color: "#F25730" }}
        >
          Create an account
        </Link>
      </p>

      {/* Secure footer */}
      <div
        className="mt-[28px] flex items-center justify-center gap-[8px] font-mono text-[11px] tracking-[0.05em]"
        style={{ color: "#7C7A75" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[13px] h-[13px] fill-none stroke-current stroke-[1.8]"
          aria-hidden="true"
        >
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        Encrypted &amp; secure
      </div>
    </div>
  );
};

export default SignIn;
