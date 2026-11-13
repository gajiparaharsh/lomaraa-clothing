import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { showToast } = useShop();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Compute password strength
  const getStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill out both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Password updated successfully. Please sign in.");
      navigate("/login");
    }, 800);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-[#E8E5DF] p-8 sm:p-10 shadow-xs">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block font-serif text-2xl tracking-[0.25em] font-bold text-[#111111]">
            LOMARAA
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B89B67] block font-semibold mt-1">
            SECURITY CREDENTIALS
          </span>
          <h2 className="font-serif text-xl text-[#111111] mt-3 font-medium">Create New Password</h2>
          <p className="text-xs text-[#777777] mt-1">
            Choose a secure passphrase to safeguard your atelier orders and personal details.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[#555555] block mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111]"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Strength Bar */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1">
                  <div
                    className={`flex-1 transition-all ${
                      strength >= 1 ? "bg-[#C62828]" : "bg-[#E8E5DF]"
                    }`}
                  />
                  <div
                    className={`flex-1 transition-all ${
                      strength >= 2 ? "bg-[#F57F17]" : "bg-[#E8E5DF]"
                    }`}
                  />
                  <div
                    className={`flex-1 transition-all ${
                      strength >= 3 ? "bg-[#2E7D32]" : "bg-[#E8E5DF]"
                    }`}
                  />
                  <div
                    className={`flex-1 transition-all ${
                      strength >= 4 ? "bg-[#1B5E20]" : "bg-[#E8E5DF]"
                    }`}
                  />
                </div>
                <p className="text-[10px] text-[#777777] text-right">
                  {strength <= 1 ? "Weak" : strength === 2 ? "Moderate" : strength === 3 ? "Good" : "Excellent"}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-[#555555] block mb-1">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-xs"
          >
            {isLoading ? <span>Updating Credentials...</span> : <span>UPDATE PASSWORD &amp; SIGN IN</span>}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E8E5DF] text-center">
          <Link
            to="/login"
            className="text-xs text-[#777777] hover:text-[#111111] uppercase tracking-wider"
          >
            Cancel and Return
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
