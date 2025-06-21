"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/app/components/AppIcon";
import WalletConnectionModal from "../components/walletConection/WalletConnectionModal";
import RoleSelectionModal from "../components/walletConection/RoleSelectionModal";
import Web3Tooltip from "../components/walletConection/Web3Tooltip";

// interface wallet address
interface WalletAddress {
  metamask: string;
  walletconnect: string;
  coinbase: string;
}

const WalletConnectionRoleSelection: React.FC = () => {
  const navigate = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [showRoleSelection, setShowRoleSelection] = useState<boolean>(false);
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<
    "student" | "teacher" | "admin" | ""
  >("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Mock wallet addresses for different wallet types
  const mockAddresses: WalletAddress = {
    metamask: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    walletconnect: "0x8ba1f109551bD432803012645Hac189451b957",
    coinbase: "0x123456789abcdef123456789abcdef123456789a",
  };

  // Mock wallet connection simulation
  const handleWalletConnection = async (
    walletType: keyof typeof mockAddresses
  ): Promise<void> => {
    setIsConnecting(true);
    setConnectionError("");

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const address = mockAddresses[walletType] || mockAddresses.metamask;
      setWalletAddress(address);
      setIsWalletConnected(true);
      setShowWalletModal(false);
      setShowRoleSelection(true);
    } catch (error) {
      setConnectionError("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRoleSelection = (role: "student" | "teacher" | "admin") => {
    setSelectedRole(role);

    // Navigate to respective dashboard based on role
    const roleRoutes = {
      student: "/student-dashboard",
      teacher: "/teacher-dashboard",
      admin: "/admin-analytics-dashboard",
    };

    setTimeout(() => {
      navigate.push(roleRoutes[role]);
    }, 500);
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-text-primary">
                  EduChain
                </h1>
                <p className="text-xs text-text-secondary">
                  Blockchain Education Platform
                </p>
              </div>
            </div>

            {/* Wallet Status */}
            {isWalletConnected && (
              <div className="flex items-center gap-2 px-3 py-2 bg-success-50 border border-success-100 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="font-data text-sm text-success-700">
                  {formatAddress(walletAddress)}
                </span>
                <button
                  onClick={copyWalletAddress}
                  className="p-1 hover:bg-success-100 rounded transition-smooth"
                >
                  <Icon name="Copy" size={14} className="text-success-700" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {!isWalletConnected ? (
            <div className="text-center">
              {/* Welcome Section */}
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <Icon name="Wallet" size={48} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  Welcome to EduChain
                </h2>
                <p className="text-text-secondary mb-6">
                  Connect your Web3 wallet to access the decentralized education
                  platform and start earning rewards for learning.
                </p>
              </div>

              {/* Connect Wallet Button */}
              <button
                onClick={() => setShowWalletModal(true)}
                disabled={isConnecting}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Icon name="Wallet" size={20} />
                    Connect Wallet
                  </>
                )}
              </button>

              {/* Web3 Help */}
              <div className="relative">
                <button
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="flex items-center gap-2 mx-auto text-text-secondary hover:text-primary transition-smooth"
                >
                  <Icon name="HelpCircle" size={16} />
                  <span className="text-sm">New to Web3?</span>
                </button>

                {showTooltip && (
                  <Web3Tooltip onClose={() => setShowTooltip(false)} />
                )}
              </div>

              {/* Connection Error */}
              {connectionError && (
                <div className="mt-4 p-4 bg-error-50 border border-error-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <span className="text-sm text-error-700">
                      {connectionError}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              {/* Success State */}
              <div className="w-24 h-24 mx-auto bg-success-100 rounded-full flex items-center justify-center mb-6">
                <Icon name="CheckCircle" size={48} className="text-success" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Wallet Connected Successfully!
              </h2>
              <p className="text-text-secondary mb-6">
                Please select your role to continue to your dashboard.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <WalletConnectionModal
          onConnect={handleWalletConnection}
          onClose={() => setShowWalletModal(false)}
          isConnecting={isConnecting}
        />
      )}

      {/* Role Selection Modal */}
      {showRoleSelection && (
        <RoleSelectionModal
          onRoleSelect={handleRoleSelection}
          selectedRole={selectedRole}
        />
      )}
    </div>
  );
};

export default WalletConnectionRoleSelection;
