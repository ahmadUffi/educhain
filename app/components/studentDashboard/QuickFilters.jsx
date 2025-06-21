import React from "react";
import Icon from "components/AppIcon";
import NotificationBadge from "components/ui/NotificationBadge";

const QuickFilters = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    {
      key: "all",
      label: "All Tasks",
      icon: "List",
      count: counts.all,
    },
    {
      key: "pending",
      label: "Pending",
      icon: "Clock",
      count: counts.pending,
    },
    {
      key: "in_progress",
      label: "In Progress",
      icon: "Play",
      count: counts.in_progress,
    },
    {
      key: "completed",
      label: "Completed",
      icon: "CheckCircle",
      count: counts.completed,
    },
    {
      key: "overdue",
      label: "Overdue",
      icon: "AlertTriangle",
      count: counts.overdue,
    },
  ];

  return (
    <div className="bg-surface rounded-xl p-4 border border-border ">
      <div className="flex items-center justify-evenly gap-2 overflow-x-auto ">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-smooth ${
              activeFilter === filter.key
                ? "bg-primary text-white"
                : "text-text-secondary hover:text-primary hover:bg-surface-hover"
            }`}
          >
            <Icon
              name={filter.icon}
              size={16}
              color={activeFilter === filter.key ? "white" : "currentColor"}
            />
            <span className="font-medium text-sm">{filter.label}</span>
            {filter.count > 0 && (
              <NotificationBadge
                count={filter.count}
                type={activeFilter === filter.key ? "secondary" : "default"}
                size="sm"
                className={
                  activeFilter === filter.key ? "bg-white text-primary" : ""
                }
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickFilters;
