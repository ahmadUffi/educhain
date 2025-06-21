import React from "react";
import Icon from "components/AppIcon";
import NotificationBadge from "components/ui/NotificationBadge";

const DailyMissionCard = ({ mission, onClick }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "success",
          bgColor: "bg-success-50",
          bgAction: "bg-success",
          borderColor: "border-success",
          textColor: "text-success ",
          outlineColor: "outline outline-1 outline-success",
          icon: "CheckCircle",
        };
      case "in_progress":
        return {
          color: "text-warning",
          bgColor: "bg-warning-50",
          bgAction: "bg-warning",
          borderColor: "border-warning",
          textColor: "text-warning",
          outlineColor: "outline outline-1 outline-warning",
          icon: "Clock",
        };
      case "overdue":
        return {
          color: "text-error",
          bgColor: "bg-error-50",
          bgAction: "bg-error",
          borderColor: "border-error",
          textColor: "text-error",
          outlineColor: "outline outline-1 outline-error",
          icon: "AlertTriangle",
        };
      case "pending":
        return {
          color: "text-primary",
          bgColor: "bg-primary-50",
          bgAction: "bg-primary",
          borderColor: "border-error",
          textColor: "text-primary",
          outlineColor: "outline outline-1 outline-primary",
          icon: "AlertTriangle",
        };
      default:
        return {
          color: "text-text-secondary",
          bgColor: "bg-background",
          borderColor: "border-border",
          bgAction: "bg-background",
          icon: "Circle",
        };
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "text-success bg-success-50";
      case "intermediate":
        return "text-warning bg-warning-50";
      case "advanced":
        return "text-error bg-error-50";
      default:
        return "text-text-secondary bg-background";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "coding":
        return "Code";
      case "quiz":
        return "HelpCircle";
      case "assignment":
        return "FileText";
      case "essay":
        return "PenTool";
      default:
        return "BookOpen";
    }
  };

  const formatDeadline = (deadline) => {
    const now = new Date();
    const diff = deadline - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `Due in ${days} days`;
  };

  const statusConfig = getStatusConfig(mission.status);

  return (
    <div
      onClick={onClick}
      className={`bg-surface rounded-xl p-6 border-2 cursor-pointer transition-all duration-150 hover:shadow-elevation-card hover:translate-y-[-5px] ${
        mission.status === "completed" ? "opacity-75" : ""
      } `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${mission.courseColor} rounded-lg flex items-center justify-center`}
          >
            <Icon name={getTypeIcon(mission.type)} size={20} color="white" />
          </div>
          <div>
            <p className="text-[12px] text-text-secondary mb-1">
              {mission.course}
            </p>
            <h4 className="font-semibold text-text-primary  ">
              {mission.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <NotificationBadge
            count={mission.points}
            type={mission.status}
            size="md"
            className="text-xs font-medium"
          /> */}
          <div className={`p-1.5 rounded-full ${statusConfig.bgColor}`}>
            <Icon
              name={statusConfig.icon}
              size={16}
              className={statusConfig.color}
            />
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Icon name="User" size={14} className="text-text-tertiary" />
            <span className="text-xs text-text-secondary">
              {mission.teacher}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={14} className="text-text-tertiary" />
            <span className="text-xs text-text-secondary">
              {mission.estimatedTime}
            </span>
          </div>
        </div>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(
            mission.difficulty
          )}`}
        >
          {mission.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {mission.description}
      </p>

      {/* Progress and Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {mission.status === "completed" && (
            <div className="flex items-center gap-1">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Completed {mission.score && `(${mission.score}%)`}
              </span>
            </div>
          )}

          {mission.status === "in_progress" && mission.submissions > 0 && (
            <div className="flex items-center gap-1">
              <Icon name="Upload" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                {mission.submissions}/{mission.maxSubmissions} submissions
              </span>
            </div>
          )}

          {mission.status === "pending" && (
            <span className="text-sm text-text-secondary">Ready to start</span>
          )}

          {mission.status === "overdue" && (
            <div className="flex items-center gap-1">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Overdue</span>
            </div>
          )}
        </div>

        <div className="text-right">
          <div
            className={`text-sm font-medium ${
              mission.status === "overdue"
                ? "text-error"
                : "text-text-secondary"
            }`}
          >
            {formatDeadline(mission.deadline)}
          </div>
        </div>
      </div>

      {/* Action Indicator and point*/}
      <div className=" flex justify-between pt-1 border-t mt-3">
        <div
          className={`mt-4 p-2 rounded-lg  w-[130px] ${statusConfig.bgAction} flex items-center justify-center cursor-pointer order-1`}
        >
          <div className="flex items-center justify-between ">
            <span className={`text-sm text-white ${statusConfig.color}`}>
              {mission.status === "completed"
                ? "View details"
                : "Click to start"}
            </span>
            <Icon name="ChevronRight" size={16} className="text-white" />
          </div>
        </div>
        {/* Point */}
        <div
          className={`mt-4 p-2 rounded-lg  w-[130px] ${statusConfig.outlineColor} flex items-center justify-center cursor-pointer`}
        >
          <div className="flex items-center justify-between ">
            <span className={`text-sm  ${statusConfig.textColor}`}>
              XP Earn +{mission.points}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMissionCard;
