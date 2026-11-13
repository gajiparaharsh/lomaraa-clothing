import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please complete all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (!agreedTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      setIsLoading(false);
      navigate("/account");
    }, 600);
  };

  const fillSampleData = () => {
    setFormData({
      name: "Diya Mehra",
      email: "diya.mehra@atelier.com",
      phone: "+91 98330 45678",
      password: "lomaraapassword",
      confirmPassword: "lomaraapassword"
    });
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
            CLIENT ATELIER REGISTRATION
          </span>
          <h2 className="font-serif text-xl text-[#111111] mt-3 font-medium">Create an Atelier Account</h2>
          <p className="text-xs text-[#777777] mt-1">
            Join the Lomaraa world for bespoke privileges, express checkout and private launches.
          </p>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={fillSampleData}
            className="text-[10px] uppercase tracking-wider text-[#B89B67] hover:underline font-semibold"
          >
            Auto-fill Sample Patron
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[#555555] block mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Diya Mehra"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="text-xs text-[#555555] block mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="name@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="text-xs text-[#555555] block mb-1">Mobile Number (Optional)</label>
            <input
              type="tel"
              placeholder="+91 98000 00000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#555555] block mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111] pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111]"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Confirm Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start space-x-2 text-xs text-[#666666] cursor-pointer leading-tight">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="accent-[#111111] w-3.5 h-3.5 mt-0.5 shrink-0"
              />
              <span>
                I agree to the Lomaraa Terms of Service, Privacy Policy and consent to receiving bespoke curation updates.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-xs"
          >
            {isLoading ? <span>Creating Account...</span> : <span>CREATE ATELIER ACCOUNT</span>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E8E5DF] text-center text-xs text-[#666666]">
          <span>Already registered with us? </span>
          <Link to="/login" className="text-[#111111] font-semibold uppercase tracking-wider hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
