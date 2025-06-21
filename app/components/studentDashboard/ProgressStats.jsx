import React from 'react';
import Icon from 'components/AppIcon';
import ProgressIndicator from 'components/ui/ProgressIndicator';

const ProgressStats = ({ studentData }) => {
  const levelProgress = ((studentData.totalPoints % 250) / 250) * 100;
  const pointsToNextLevel = studentData.nextLevelPoints - studentData.totalPoints;

  const stats = [
    {
      label: 'Tasks Completed',
      value: studentData.totalTasksCompleted,
      icon: 'CheckSquare',
      color: 'text-success'
    },
    {
      label: 'Current Streak',
      value: `${studentData.streak} days`,
      icon: 'Flame',
      color: 'text-orange-500'
    },
    {
      label: 'Enrolled Courses',
      value: studentData.enrolledCourses,
      icon: 'BookOpen',
      color: 'text-primary'
    }
  ];

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h4 className="font-semibold text-text-primary mb-6">Your Progress</h4>
      
      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Level {studentData.level}</span>
          <span className="text-sm text-text-secondary">{pointsToNextLevel} pts to next</span>
        </div>
        <ProgressIndicator
          value={levelProgress}
          max={100}
          type="linear"
          color="primary"
          showLabel={false}
          showPercentage={false}
          size="sm"
        />
      </div>

      {/* Stats Grid */}
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
              <Icon name={stat.icon} size={16} className={stat.color} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-text-primary">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Goal */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-primary">Weekly Goal</span>
          <span className="text-sm text-text-secondary">21/35 tasks</span>
        </div>
        <ProgressIndicator
          value={21}
          max={35}
          type="linear"
          color="secondary"
          showLabel={false}
          showPercentage={true}
          size="sm"
        />
      </div>
    </div>
  );
};

export default ProgressStats;