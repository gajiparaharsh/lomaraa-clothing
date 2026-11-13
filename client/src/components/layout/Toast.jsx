import React from "react";
import { Check, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";

export const Toast = () => {
  const { toastMessage, showToast } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <div className="bg-[#111111] text-[#F5F1E8] px-5 py-3.5 shadow-2xl flex items-center space-x-3 border-l-2 border-[#B89B67] text-xs tracking-wider">
        <div className="w-5 h-5 rounded-full bg-[#B89B67] text-white flex items-center justify-center flex-shrink-0">
          <Check size={12} strokeWidth={2.5} />
        </div>
        <span className="font-medium">{toastMessage}</span>
        <button
          onClick={() => showToast(null)}
          className="text-[#999999] hover:text-white ml-2 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;

