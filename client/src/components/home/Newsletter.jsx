import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState("all");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E8E5DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 mb-8">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#B89B67] font-semibold flex items-center justify-center gap-2">
            <Mail size={13} />
            PRIVATE PRIVILEGES
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] tracking-tight">
            JOIN THE LOMARAA WORLD.
          </h2>

          <p className="text-sm sm:text-base text-[#666666] font-light max-w-xl mx-auto leading-relaxed">
            Subscribe to receive private invitations to new releases, seasonal lookbooks, and 10% complimentary credit toward your inaugural acquisition.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-[#FAF8F5] border border-[#B89B67]/30 p-8 max-w-lg mx-auto animate-fade-in space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#B89B67]/15 text-[#B89B67] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 size={22} />
            </div>
            <h3 className="font-serif text-xl text-[#111111]">Bienvenue to Lomaraa</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              We have welcomed <strong className="text-[#111111]">{email}</strong> to our private circle. Your 10% welcome code has been dispatched to your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            {/* Preference Selector */}
            <div className="flex justify-center items-center space-x-6 text-xs text-[#666666] pb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="preference"
                  checked={preference === "all"}
                  onChange={() => setPreference("all")}
                  className="accent-[#B89B67]"
                />
                <span className="tracking-wider uppercase text-[11px]">All Collections</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="preference"
                  checked={preference === "women"}
                  onChange={() => setPreference("women")}
                  className="accent-[#B89B67]"
                />
                <span className="tracking-wider uppercase text-[11px]">Womenswear</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="preference"
                  checked={preference === "men"}
                  onChange={() => setPreference("men")}
                  className="accent-[#B89B67]"
                />
                <span className="tracking-wider uppercase text-[11px]">Menswear</span>
              </label>
            </div>

            {/* Email Input & Submit */}
            <div className="flex flex-col sm:flex-row items-stretch border border-[#111111] bg-white">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email address..."
                aria-label="Email address for newsletter"
                className="flex-1 px-5 py-4 text-xs sm:text-sm tracking-wide text-[#111111] placeholder-[#888888] focus:outline-hidden bg-transparent"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group whitespace-nowrap"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-600 text-left pl-1">{error}</p>
            )}

            <p className="text-[11px] text-[#888888] tracking-normal pt-1">
              By subscribing, you agree to receive Lomaraa marketing communications and accept our{" "}
              <a href="#privacy" className="underline hover:text-[#111111]">Privacy Policy</a>. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;

