import React from "react";
import Icon from "@/app/components/AppIcon";
import * as LucidIcon from "lucide-react";

type lucidIconName = keyof typeof LucidIcon;

interface Role {
  id: "student" | "teacher" | "admin";
  name: string;
  icon: lucidIconName;
  description: string;
  features: string[];
  color: "primary" | "secondary" | "accent";
}

interface RoleSelectionModalProps {
  onRoleSelect: (role: Role["id"]) => void;
  selectedRole: Role["id"] | "";
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  onRoleSelect,
  selectedRole,
}) => {
  const roles: Role[] = [
    {
      id: "student",
      name: "Student",
      icon: "BookOpen",
      description: "Complete daily tasks and missions to earn rewards",
      features: [
        "Access daily learning missions",
        "Earn blockchain rewards",
        "Track progress and achievements",
        "Join course leaderboards",
      ],
      color: "primary",
    },
    {
      id: "teacher",
      name: "Teacher",
      icon: "Users",
      description: "Create courses and manage student learning experiences",
      features: [
        "Create and manage courses",
        "Design daily tasks and missions",
        "Monitor student progress",
        "Earn points from engagement",
      ],
      color: "secondary",
    },
    {
      id: "admin",
      name: "Administrator",
      icon: "Shield",
      description: "Oversee platform operations and analytics",
      features: [
        "Comprehensive analytics dashboard",
        "User management and oversight",
        "Platform performance monitoring",
        "Generate detailed reports",
      ],
      color: "accent",
    },
  ];

  const getColorClasses = (
    color: "primary" | "secondary" | "accent",
    isSelected: boolean
  ) => {
    const colors = {
      primary: {
        border: isSelected
          ? "border-primary"
          : "border-border hover:border-primary",
        bg: isSelected ? "bg-primary-50" : "hover:bg-primary-50",
        icon: "bg-primary-100 text-primary",
        button: "bg-primary text-white hover:bg-primary-700",
      },
      secondary: {
        border: isSelected
          ? "border-secondary"
          : "border-border hover:border-secondary",
        bg: isSelected ? "bg-secondary-50" : "hover:bg-secondary-50",
        icon: "bg-secondary-100 text-secondary",
        button: "bg-secondary text-white hover:bg-secondary-700",
      },
      accent: {
        border: isSelected
          ? "border-accent"
          : "border-border hover:border-accent",
        bg: isSelected ? "bg-accent-50" : "hover:bg-accent-50",
        icon: "bg-accent-100 text-accent",
        button: "bg-accent text-white hover:bg-accent-600",
      },
    };
    return colors[color];
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-150">
      <div className="bg-surface rounded-xl shadow-elevation-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
            <Icon name="UserCheck" size={32} color="white" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Choose Your Role
          </h3>
          <p className="text-text-secondary">
            Select your role to access the appropriate dashboard and features
          </p>
        </div>

        {/* Role Cards */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              const colorClasses = getColorClasses(role.color, isSelected);

              return (
                <div
                  key={role.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                    colorClasses.border
                  } ${colorClasses.bg} ${
                    isSelected
                      ? "transform scale-105 shadow-elevation-card"
                      : ""
                  }`}
                >
                  {/* Role Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${colorClasses.icon}`}
                    >
                      <Icon name={role.icon} size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">
                      {role.name}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {role.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon
                            name="Check"
                            size={16}
                            className="text-success mt-0.5 flex-shrink-0"
                          />
                          <span className="text-sm text-text-secondary">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => onRoleSelect(role.id)}
                    disabled={!!selectedRole && selectedRole !== role.id}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-smooth disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected
                        ? `${colorClasses.button} animate-pulse`
                        : `${colorClasses.button}`
                    }`}
                  >
                    {isSelected ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="Check" size={16} />
                        Selected - Redirecting...
                      </div>
                    ) : (
                      `Select ${role.name}`
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-background rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-text-primary font-medium mb-1">
                  Role Selection
                </p>
                <p className="text-sm text-text-secondary">
                  You can change your role later in your profile settings. Each
                  role provides access to different features and dashboards
                  tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
