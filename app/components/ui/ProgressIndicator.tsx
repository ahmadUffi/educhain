import React, { useEffect, useState } from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  value = 0, 
  max = 100, 
  type = 'linear',
  size = 'md',
  showLabel = true,
  showPercentage = true,
  label = 'Progress',
  color = 'primary',
  animated = true,
  milestones = [],
  className = '',
  onMilestoneReached
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [celebratingMilestone, setCelebratingMilestone] = useState(null);

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Animate progress value
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animated]);

  // Check for milestone achievements
  useEffect(() => {
    const reachedMilestones = milestones.filter(milestone => 
      animatedValue >= milestone.value && (animatedValue - value) < milestone.value
    );
    
    reachedMilestones.forEach(milestone => {
      setCelebratingMilestone(milestone);
      onMilestoneReached?.(milestone);
      
      setTimeout(() => {
        setCelebratingMilestone(null);
      }, 2000);
    });
  }, [animatedValue, milestones, onMilestoneReached, value]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  };

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    accent: 'bg-accent'
  };

  const backgroundColorClasses = {
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100',
    success: 'bg-success-100',
    warning: 'bg-warning-100',
    accent: 'bg-accent-100'
  };

  // Linear Progress Bar
  if (type === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        {(showLabel || showPercentage) && (
          <div className="flex justify-between items-center mb-2">
            {showLabel && (
              <span className="text-sm font-medium text-text-primary">{label}</span>
            )}
            {showPercentage && (
              <span className="text-sm font-medium text-text-secondary">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        
        <div className={`w-full ${backgroundColorClasses[color]} rounded-full ${sizeClasses[size]} relative overflow-hidden`}>
          <div 
            className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out ${
              animated ? 'transition-celebration' : ''
            } ${celebratingMilestone ? 'animate-pulse' : ''}`}
            style={{ width: `${percentage}%` }}
          />
          
          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="absolute top-0 bottom-0 w-0.5 bg-surface border-l-2 border-text-secondary"
              style={{ left: `${(milestone.value / max) * 100}%` }}
              title={milestone.label}
            />
          ))}
        </div>

        {/* Milestone Celebration */}
        {celebratingMilestone && (
          <div className="mt-2 flex items-center gap-2 text-success animate-bounce">
            <Icon name="Trophy" size={16} />
            <span className="text-sm font-medium">{celebratingMilestone.label}</span>
          </div>
        )}
      </div>
    );
  }

  // Circular Progress
  if (type === 'circular') {
    const radius = size === 'sm' ? 20 : size === 'md' ? 30 : size === 'lg' ? 40 : 50;
    const strokeWidth = size === 'sm' ? 3 : size === 'md' ? 4 : size === 'lg' ? 5 : 6;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg 
          width={radius * 2 + strokeWidth * 2} 
          height={radius * 2 + strokeWidth * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className={`${backgroundColorClasses[color]} opacity-20`}
          />
          
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${colorClasses[color]} transition-all duration-500 ease-out ${
              celebratingMilestone ? 'animate-pulse' : ''
            }`}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercentage && (
            <span className={`font-bold ${
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'
            } text-text-primary`}>
              {Math.round(percentage)}%
            </span>
          )}
          {showLabel && size !== 'sm' && (
            <span className="text-xs text-text-secondary text-center">{label}</span>
          )}
        </div>
      </div>
    );
  }

  // Step Progress
  if (type === 'steps') {
    const steps = Array.from({ length: max }, (_, i) => i + 1);
    
    return (
      <div className={`${className}`}>
        {showLabel && (
          <div className="mb-4">
            <span className="text-sm font-medium text-text-primary">{label}</span>
            {showPercentage && (
              <span className="ml-2 text-sm text-text-secondary">
                ({value}/{max})
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-smooth ${
                step <= value 
                  ? `${colorClasses[color]} border-transparent text-white` 
                  : `border-border text-text-secondary hover:border-${color}`
              }`}>
                {step <= value ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-xs font-medium">{step}</span>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 rounded-full ${
                  step < value ? colorClasses[color] : backgroundColorClasses[color]
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// Predefined progress components for common use cases
export const TaskProgress = ({ completed, total, ...props }) => (
  <ProgressIndicator
    value={completed}
    max={total}
    label="Tasks Completed"
    color="success"
    milestones={[
      { value: Math.floor(total * 0.25), label: "Quarter Complete!" },
      { value: Math.floor(total * 0.5), label: "Halfway There!" },
      { value: Math.floor(total * 0.75), label: "Almost Done!" },
      { value: total, label: "All Tasks Complete!" }
    ]}
    {...props}
  />
);

export const LearningProgress = ({ currentLevel, maxLevel, ...props }) => (
  <ProgressIndicator
    value={currentLevel}
    max={maxLevel}
    type="steps"
    label="Learning Path"
    color="primary"
    {...props}
  />
);

export const RewardProgress = ({ earned, target, ...props }) => (
  <ProgressIndicator
    value={earned}
    max={target}
    type="circular"
    label="Reward Goal"
    color="accent"
    size="lg"
    {...props}
  />
);

export default ProgressIndicator;