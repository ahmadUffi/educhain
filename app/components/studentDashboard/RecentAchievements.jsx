import React from 'react';
import Icon from 'components/AppIcon';

const RecentAchievements = ({ achievements }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Award" size={20} className="text-accent" />
        <h4 className="font-semibold text-text-primary">Recent Achievements</h4>
      </div>
      
      {achievements.length === 0 ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Trophy" size={24} className="text-text-tertiary" />
          </div>
          <p className="text-text-secondary text-sm">
            Complete more tasks to earn achievements!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-3 bg-background rounded-lg hover:bg-surface-hover transition-smooth"
            >
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={achievement.icon} size={16} className={achievement.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-text-primary text-sm">{achievement.title}</h5>
                <p className="text-text-secondary text-xs mb-1">{achievement.description}</p>
                <span className="text-text-tertiary text-xs">
                  {formatTimeAgo(achievement.earnedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {achievements.length > 0 && (
        <button className="w-full mt-4 text-sm text-primary hover:text-primary-700 transition-smooth">
          View All Achievements
        </button>
      )}
    </div>
  );
};

export default RecentAchievements;