import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
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
            ACCOUNT RECOVERY
          </span>
          <h2 className="font-serif text-xl text-[#111111] mt-3 font-medium">Reset Your Password</h2>
          <p className="text-xs text-[#777777] mt-1">
            Enter your registered email address and we will dispatch a secure link to reset your atelier password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-serif text-lg text-[#111111]">Reset Link Dispatched</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              We have sent an authentication link to <span className="font-semibold text-[#111111]">{email}</span>. Please check your inbox and spam folder.
            </p>
            <div className="pt-2">
              <Link
                to="/reset-password"
                className="inline-block px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
              >
                Simulate Entering Reset Code →
              </Link>
            </div>
            <div className="pt-4 border-t border-[#E8E5DF]">
              <Link
                to="/login"
                className="text-xs text-[#777777] hover:text-[#111111] flex items-center justify-center gap-1 uppercase tracking-wider"
              >
                <ArrowLeft size={13} />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[#555555] block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-xs"
            >
              {isLoading ? <span>Dispatching Link...</span> : <span>SEND RESET LINK</span>}
            </button>

            <div className="text-center pt-4">
              <Link
                to="/login"
                className="text-xs text-[#777777] hover:text-[#111111] flex items-center justify-center gap-1 uppercase tracking-wider"
              >
                <ArrowLeft size={13} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
