import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";
import Image from "components/AppImage";
import WalletHeader from "components/ui/WalletHeader";
import RoleBasedNavigation from "components/ui/RoleBasedNavigation";
import ProgressIndicator from "components/ui/ProgressIndicator";

import DailyMissionCard from "./components/DailyMissionCard";
import ProgressStats from "./components/ProgressStats";
import QuickFilters from "./components/QuickFilters";
import RecentAchievements from "./components/RecentAchievements";

import { mockAchievements, mockMissions } from "./mock";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [missions, setMissions] = useState([]);
  const [studentData, setStudentData] = useState({});

  // Mock student data
  const mockStudentData = {
    name: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    balance: 2.4567,
    totalPoints: 1250,
    dailyGoal: 5,
    completedToday: 3,
    streak: 7,
    level: 12,
    nextLevelPoints: 1500,
    enrolledCourses: 4,
    totalTasksCompleted: 89,
  };

  useEffect(() => {
    setStudentData(mockStudentData);
    setMissions(mockMissions);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleMissionClick = (mission) => {
    navigate("/task-completion-interface", { state: { mission } });
  };

  const handleEnrollCourse = () => {
    // Navigate to course enrollment (would be implemented later)
    console.log("Navigate to course enrollment");
  };

  const filteredMissions = missions.filter((mission) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return mission.status === "pending";
    if (activeFilter === "completed") return mission.status === "completed";
    if (activeFilter === "overdue") return mission.status === "overdue";
    if (activeFilter === "in_progress") return mission.status === "in_progress";
    return true;
  });

  const getFilterCounts = () => {
    return {
      all: missions.length,
      pending: missions.filter((m) => m.status === "pending").length,
      completed: missions.filter((m) => m.status === "completed").length,
      overdue: missions.filter((m) => m.status === "overdue").length,
      in_progress: missions.filter((m) => m.status === "in_progress").length,
    };
  };

  const dailyProgress =
    (studentData.completedToday / studentData.dailyGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <h1 className="font-heading font-semibold text-lg text-text-primary hidden sm:block">
                EduChain
              </h1>
            </div>

            {/* Wallet Header */}
            <WalletHeader
              walletAddress={studentData.walletAddress}
              balance={studentData.balance}
              isConnected={true}
              userRole="student"
              notifications={3}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl lg:mb-[4.5rem]  mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="w-16 h-16 rounded-full border-4 border-white/20"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    Welcome back, {studentData.name}!
                  </h2>
                  <p className="text-white/80">
                    Ready to continue your learning journey?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {studentData.totalPoints}
                  </div>
                  <div className="text-sm text-white/80">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{studentData.streak}</div>
                  <div className="text-sm text-white/80">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    Level {studentData.level}
                  </div>
                  <div className="text-sm text-white/80">Current Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {studentData.enrolledCourses}
                  </div>
                  <div className="text-sm text-white/80">Courses</div>
                </div>
              </div>
            </div>

            {/* Daily Progress */}
            <div className="bg-surface rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Daily Progress
                </h3>
                <button
                  onClick={handleRefresh}
                  className={`p-2 text-text-secondary hover:text-primary transition-smooth rounded-lg hover:bg-surface-hover ${
                    refreshing ? "animate-spin" : ""
                  }`}
                >
                  <Icon name="RefreshCw" size={20} />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <ProgressIndicator
                    value={studentData.completedToday}
                    max={studentData.dailyGoal}
                    type="circular"
                    size="lg"
                    color="success"
                    showPercentage={false}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <span className="text-xs font-bold text-text-primary">
                      {studentData.completedToday}
                    </span>

                    <span className="text-xs text-text-secondary">
                      of {studentData.dailyGoal}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-text-primary font-medium mb-2">
                    {studentData.completedToday} tasks completed today
                  </p>
                  <p className="text-text-secondary text-sm mb-3">
                    {studentData.dailyGoal - studentData.completedToday > 0
                      ? `${
                          studentData.dailyGoal - studentData.completedToday
                        } more to reach your daily goal!`
                      : "🎉 Daily goal achieved! Keep up the great work!"}
                  </p>
                  <ProgressIndicator
                    value={dailyProgress}
                    max={100}
                    type="linear"
                    color="success"
                    showLabel={false}
                    showPercentage={false}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="">
              <QuickFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={getFilterCounts()}
              />
            </div>
            {/* Mission Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  Daily Missions ({filteredMissions.length})
                </h3>
                {activeFilter !== "all" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="text-sm text-primary hover:text-primary-700 transition-smooth"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {filteredMissions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="CheckCircle"
                      size={32}
                      className="text-text-tertiary"
                    />
                  </div>
                  <h4 className="text-lg font-medium text-text-primary mb-2">
                    {activeFilter === "completed"
                      ? "Great job!"
                      : "No missions found"}
                  </h4>
                  <p className="text-text-secondary">
                    {activeFilter === "completed"
                      ? "You've completed all your tasks in this category."
                      : "Try adjusting your filter or check back later for new missions."}
                  </p>
                </div>
              ) : (
                <div className=" grid md:grid-cols-2 grid-cols-1 gap-5 ">
                  {filteredMissions.map((mission) => (
                    <DailyMissionCard
                      key={mission.id}
                      mission={mission}
                      onClick={() => handleMissionClick(mission)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Stats */}
            <ProgressStats studentData={studentData} />

            {/* Quick Actions */}
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-text-primary mb-4">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <button
                  onClick={handleEnrollCourse}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="Plus" size={18} />
                  Enroll in Course
                </button>

                <button
                  onClick={() => navigate("/leaderboard-rankings")}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-border text-text-primary rounded-lg hover:bg-surface-hover transition-smooth"
                >
                  <Icon name="Trophy" size={18} />
                  View Leaderboard
                </button>
              </div>
            </div>

            {/* Recent Achievements */}
            <RecentAchievements achievements={mockAchievements} />
          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={handleEnrollCourse}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-elevation-modal flex items-center justify-center hover:bg-primary-700 transition-smooth z-40"
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Role-based Navigation */}
      <RoleBasedNavigation
        userRole="student"
        isWalletConnected={true}
        notifications={{
          dashboard: 0,
          tasks: missions.filter((m) => m.status === "pending").length,
          leaderboard: 1,
        }}
        onNavigate={(path) => navigate(path)}
      />
    </div>
  );
};

export default StudentDashboard;
