import React from "react";
import { SearchX, Inbox, AlertCircle } from "lucide-react";
import { Button } from "./Button";

export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No items found",
  description = "There are no records matching your current selection.",
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div className={`p-10 text-center bg-white rounded-lg border border-gray-200 shadow-subtle flex flex-col items-center justify-center ${className}`}>
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 mb-3 border border-gray-200">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-[#141821]">{title}</h4>
      <p className="text-sm text-gray-500 max-w-sm mt-1 mb-5">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
