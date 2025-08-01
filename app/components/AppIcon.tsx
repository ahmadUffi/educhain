import React from "react";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";

// Ambil semua nama ikon yang valid
type LucideIconName = keyof typeof LucideIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string; // hanya boleh pakai icon yang ada di Lucide
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

function Icon({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  ...props
}: IconProps) {
  const IconComponent = LucideIcons[name] as React.ElementType;

  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color="gray"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}

export default Icon;
