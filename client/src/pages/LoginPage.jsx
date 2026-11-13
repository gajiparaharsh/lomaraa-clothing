import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/account";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 600);
  };

  const handleQuickDemoCustomer = () => {
    setEmail("aarav@lomaraa.com");
    setPassword("lomaraa2026");
    login("aarav@lomaraa.com", "lomaraa2026");
    navigate("/account");
  };

  const handleQuickDemoAdmin = () => {
    setEmail("admin@lomaraa.com");
    setPassword("admin2026");
    login("admin@lomaraa.com", "admin2026");
    navigate("/admin");
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-[#E8E5DF] p-8 sm:p-10 shadow-xs">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block font-serif text-2xl tracking-[0.25em] font-bold text-[#111111]">
            LOMARAA
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B89B67] block font-semibold mt-1">
            CLIENT ATELIER ACCESS
          </span>
          <h2 className="font-serif text-xl text-[#111111] mt-3 font-medium">Sign In to Your Account</h2>
          <p className="text-xs text-[#777777] mt-1">
            Access your orders, bespoke wishlist and private styling services.
          </p>
        </div>

        {/* Demo Fast-Login Pills for Evaluation */}
        <div className="mb-6 p-3 bg-[#FAF8F5] border border-[#E8E5DF] text-center space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-[#888888] font-bold">Quick Evaluation Access</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleQuickDemoCustomer}
              className="flex-1 py-1.5 px-2 bg-white border border-[#E8E5DF] text-[11px] font-medium text-[#111111] hover:border-[#111111] transition-colors"
            >
              Customer Demo
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="flex-1 py-1.5 px-2 bg-[#111111] text-white text-[11px] font-medium hover:bg-black transition-colors"
            >
              Admin Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[#555555] block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-[#555555]">Password</label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-[#B89B67] hover:underline uppercase tracking-wider"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
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
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-xs text-[#666666] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#111111] w-3.5 h-3.5"
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-xs"
          >
            {isLoading ? <span>Signing In...</span> : <span>SIGN IN TO ATELIER</span>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E8E5DF] text-center text-xs text-[#666666]">
          <span>New to Lomaraa? </span>
          <Link to="/register" className="text-[#111111] font-semibold uppercase tracking-wider hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
