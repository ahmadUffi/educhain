import React from "react";
import Icon from "../AppIcon";

const NotificationBadge = ({
  count = 0,
  type = "default",
  size = "md",
  position = "top-right",
  showZero = false,
  maxCount = 99,
  className = "",
  onClick,
  children,
}) => {
  const shouldShow = count > 0 || showZero;

  const sizeClasses = {
    sm: "h-4 w-4 text-xs min-w-[16px]",
    md: "h-5 w-5 text-xs min-w-[20px]",
    lg: "h-6 w-6 text-sm min-w-[24px]",
  };

  const typeClasses = {
    overdue: "bg-error text-white",
    completed: "bg-success text-white",
    in_progress: "bg-warning text-white",
    pending: "bg-primary text-white",
    secondary: "bg-text-secondary text-white",
  };

  const positionClasses = {
    "top-right": "-top-1 -right-1",
    "top-left": "-top-1 -left-1",
    "bottom-right": "-bottom-1 -right-1",
    "bottom-left": "-bottom-1 -left-1",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  };

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  if (!children) {
    // Standalone badge
    return shouldShow ? (
      <span
        className={`inline-flex items-center justify-center rounded-full font-medium transition-smooth cursor-pointer ${sizeClasses[size]} ${typeClasses[type]} ${className}`}
        onClick={onClick}
      >
        {displayCount}
      </span>
    ) : null;
  }

  // Badge with children (wrapper)
  return (
    <div className="relative inline-flex">
      {children}
      {shouldShow && (
        <span
          className={`absolute flex items-center justify-center rounded-full font-medium transition-smooth ${sizeClasses[size]} ${typeClasses[type]} ${positionClasses[position]} ${className}`}
          onClick={onClick}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

// Notification types for different contexts
export const NotificationTypes = {
  TASK_ASSIGNED: "info",
  TASK_COMPLETED: "success",
  REWARD_EARNED: "warning",
  SYSTEM_ALERT: "default",
  ACHIEVEMENT_UNLOCKED: "success",
};

// Predefined notification components for common use cases
export const TaskNotificationBadge = ({ count, onClick, children }) => (
  <NotificationBadge
    count={count}
    type="info"
    onClick={onClick}
    className="animate-pulse"
  >
    {children}
  </NotificationBadge>
);

export const RewardNotificationBadge = ({ count, onClick, children }) => (
  <NotificationBadge
    count={count}
    type="warning"
    onClick={onClick}
    className="animate-bounce"
  >
    {children}
  </NotificationBadge>
);

export const AchievementNotificationBadge = ({ count, onClick, children }) => (
  <NotificationBadge
    count={count}
    type="success"
    onClick={onClick}
    className="animate-pulse"
  >
    {children}
  </NotificationBadge>
);

// Notification Bell Component
export const NotificationBell = ({
  notifications = 0,
  hasUnread = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-text-secondary hover:text-primary transition-smooth rounded-lg hover:bg-surface-hover ${className}`}
    >
      <Icon
        name="Bell"
        size={20}
        className={hasUnread ? "animate-pulse" : ""}
      />
      <NotificationBadge
        count={notifications}
        type="default"
        position="top-right"
      />
    </button>
  );
};

// Notification Dot (for subtle indicators)
export const NotificationDot = ({
  show = false,
  type = "default",
  size = "sm",
  position = "top-right",
  className = "",
  children,
}) => {
  const dotSizes = {
    xs: "h-2 w-2 ",
    sm: "h-3 w-3",
    md: "h-4 w-4",
  };

  const positionClasses = {
    "top-right": "-top-0.5 -right-0.5",
    "top-left": "-top-0.5 -left-0.5",
    "bottom-right": "-bottom-0.5 -right-0.5",
    "bottom-left": "-bottom-0.5 -left-0.5",
  };

  const typeClasses = {
    default: "bg-error",
    completed: "bg-success",
    warning: "bg-warning",
    info: "bg-primary",
  };

  return (
    <div className="relative inline-flex">
      {children}
      {show && (
        <span
          className={`absolute rounded-full animate-pulse ${dotSizes[size]} ${typeClasses[type]} ${positionClasses[position]} ${className}`}
        />
      )}
    </div>
  );
};

export default NotificationBadge;
