import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useMutationWithLoading } from "../hooks/useLoadingHooks";
import * as apiClient from "../api-client";
import useAppContext from "../hooks/useAppContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "#E5533C" };
  if (score <= 3) return { score: 3, label: "Fair", color: "#E8A13C" };
  return { score: 5, label: "Strong", color: "#4FB477" };
}

const FOCUS_BORDER = "#F25730";
const FOCUS_SHADOW = "0 0 0 3px rgba(242,87,48,.55)";
const DEFAULT_BORDER = "#3C3B39";
const ERROR_BORDER = "#E5533C";

/** Wrap RHF register props to add orange focus/blur ring styling */
function withRing<T extends HTMLInputElement>(
  rhfProps: {
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    [key: string]: unknown;
  },
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

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutationWithLoading(apiClient.register, {
    onSuccess: async () => {
      showToast({
        title: "Registration Successful",
        description: "Your account has been created! Welcome to MernHolidays.",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        title: "Registration Failed",
        description: error.message,
        type: "ERROR",
      });
    },
    loadingMessage: "Creating your account...",
  });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    mutation.mutate(data, {
      onSettled: () => setIsLoading(false),
    });
  });

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";
  const strength = getPasswordStrength(password);

  const baseInputClass =
    "w-full font-poppins text-[15px] text-white rounded-[8px] px-[14px] py-[12px] outline-none transition-all duration-150";

  return (
    <div className="w-full">
      {/* Auth head */}
      <div style={{ marginBottom: "28px" }}>
        <p
          className="font-mono font-medium text-[12px] tracking-[0.16em] uppercase m-0 mb-[14px]"
          style={{ color: "#7C7A75" }}
        >
          Create account
        </p>
        <h2
          className="font-poppins font-bold leading-[1.1] tracking-[-0.02em] m-0 text-white"
          style={{ fontSize: "28px" }}
        >
          Join MernHolidays
        </h2>
        <p className="text-[15px] leading-[1.5] mt-[9px]" style={{ color: "#B4B1AC" }}>
          Start booking your perfect stays today.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="firstName"
              className="block text-[13px] font-medium mb-[7px]"
              style={{ color: "#B4B1AC" }}
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Jane"
              autoComplete="given-name"
              className={baseInputClass}
              style={{
                background: "#333333",
                border: `1px solid ${errors.firstName ? ERROR_BORDER : DEFAULT_BORDER}`,
              }}
              {...withRing(
                register("firstName", { required: "Required" }),
                !!errors.firstName
              )}
            />
            {errors.firstName && (
              <p className="text-[11.5px] mt-[5px]" style={{ color: ERROR_BORDER }}>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-[13px] font-medium mb-[7px]"
              style={{ color: "#B4B1AC" }}
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              className={baseInputClass}
              style={{
                background: "#333333",
                border: `1px solid ${errors.lastName ? ERROR_BORDER : DEFAULT_BORDER}`,
              }}
              {...withRing(
                register("lastName", { required: "Required" }),
                !!errors.lastName
              )}
            />
            {errors.lastName && (
              <p className="text-[11.5px] mt-[5px]" style={{ color: ERROR_BORDER }}>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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
          <label
            htmlFor="password"
            className="block text-[13px] font-medium mb-[7px]"
            style={{ color: "#B4B1AC" }}
          >
            Password
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
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
          {/* Password strength bar */}
          {password && !errors.password && (
            <div className="mt-[8px]">
              <div className="flex gap-[4px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-[3px] flex-1 rounded-full transition-all duration-300"
                    style={{
                      background: i <= strength.score ? strength.color : DEFAULT_BORDER,
                    }}
                  />
                ))}
              </div>
              <p className="text-[11.5px] mt-[5px]" style={{ color: strength.color }}>
                {strength.label} password
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-[13px] font-medium mb-[7px]"
            style={{ color: "#B4B1AC" }}
          >
            Confirm password
          </label>
          <div className="relative flex items-center">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••••••"
              className={`${baseInputClass} pr-[44px]`}
              style={{
                background: "#333333",
                border: `1px solid ${errors.confirmPassword ? ERROR_BORDER : DEFAULT_BORDER}`,
              }}
              {...withRing(
                register("confirmPassword", {
                  validate: (val) => {
                    if (!val) return "Please confirm your password";
                    if (password !== val) return "Passwords do not match";
                  },
                }),
                !!errors.confirmPassword
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="absolute right-[6px] p-2 rounded-[6px] flex items-center justify-center border-0 bg-transparent cursor-pointer transition-colors duration-150"
              style={{ color: "#7C7A75" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#B4B1AC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#7C7A75";
              }}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-[17px] h-[17px] stroke-[1.8]" />
              ) : (
                <Eye className="w-[17px] h-[17px] stroke-[1.8]" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[12.5px] mt-[6px]" style={{ color: ERROR_BORDER }}>
              {errors.confirmPassword.message}
            </p>
          )}
          {password &&
            confirmPassword &&
            !errors.confirmPassword &&
            confirmPassword === password && (
              <p className="text-[12.5px] mt-[6px]" style={{ color: "#4FB477" }}>
                ✓ Passwords match
              </p>
            )}
        </div>

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
            {isLoading ? "Creating account…" : "Create account"}
          </span>
        </button>
      </form>

      {/* Footnote */}
      <p
        className="mt-[26px] text-center text-[13.5px]"
        style={{ color: "#B4B1AC" }}
      >
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="font-medium no-underline hover:underline"
          style={{ color: "#F25730" }}
        >
          Sign in
        </Link>
      </p>

      {/* Secure footer */}
      <div
        className="mt-[20px] flex items-center justify-center gap-[8px] font-mono text-[11px] tracking-[0.05em]"
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

export default Register;
