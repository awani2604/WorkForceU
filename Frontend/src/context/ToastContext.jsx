import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Render Area */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((toast) => {
          let bgClass = "bg-[#141821] text-white border-gray-700";
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

          if (toast.type === "success") {
            bgClass = "bg-[#141821] text-white border-[#1D8C6C]";
            icon = <CheckCircle2 className="w-5 h-5 text-[#1D8C6C] shrink-0" />;
          } else if (toast.type === "error") {
            bgClass = "bg-[#141821] text-white border-[#C1502E]";
            icon = <AlertCircle className="w-5 h-5 text-[#C1502E] shrink-0" />;
          } else if (toast.type === "info") {
            bgClass = "bg-[#141821] text-white border-[#2E6FB0]";
            icon = <Info className="w-5 h-5 text-[#2E6FB0] shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg border shadow-lg transition-all ${bgClass}`}
            >
              <div className="flex items-center gap-3 text-sm font-medium">
                {icon}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-white p-1 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
