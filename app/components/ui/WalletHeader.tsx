import React, { useState } from 'react';
import Icon from '../AppIcon';

const WalletHeader = ({ 
  walletAddress = null, 
  balance = 0, 
  isConnected = false, 
  userRole = null,
  notifications = 0,
  onWalletConnect,
  onWalletDisconnect,
  onNotificationClick 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(balance);
  };

  const handleWalletClick = () => {
    if (isConnected) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      onWalletConnect?.();
    }
  };

  const handleDisconnect = () => {
    onWalletDisconnect?.();
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-center gap-3 relative">
      {/* Notifications */}
      {isConnected && notifications > 0 && (
        <button
          onClick={onNotificationClick}
          className="relative p-2 text-text-secondary hover:text-primary transition-smooth rounded-lg hover:bg-surface-hover"
        >
          <Icon name="Bell" size={20} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
              {notifications > 99 ? '99+' : notifications}
            </span>
          )}
        </button>
      )}

      {/* Wallet Connection */}
      <div className="relative">
        <button
          onClick={handleWalletClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-smooth ${
            isConnected
              ? 'bg-surface border-border hover:border-primary text-text-primary' :'bg-primary border-primary text-white hover:bg-primary-700'
          }`}
        >
          <Icon 
            name={isConnected ? "Wallet" : "Wallet"} 
            size={18} 
            color={isConnected ? "currentColor" : "white"}
          />
          
          {/* Desktop View */}
          <div className="hidden md:flex flex-col items-start">
            {isConnected ? (
              <>
                <span className="font-data text-sm font-medium">
                  {formatAddress(walletAddress)}
                </span>
                <span className="font-data text-xs text-text-secondary">
                  {formatBalance(balance)} ETH
                </span>
              </>
            ) : (
              <span className="font-medium text-sm">Connect Wallet</span>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {isConnected ? (
              <span className="font-data text-sm font-medium">
                {formatBalance(balance)}
              </span>
            ) : (
              <span className="font-medium text-sm">Connect</span>
            )}
          </div>

          {isConnected && (
            <Icon name="ChevronDown" size={16} className="text-text-secondary" />
          )}
        </button>

        {/* Wallet Dropdown */}
        {isConnected && isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevation-modal z-150">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm capitalize">{userRole || 'User'}</p>
                  <p className="font-data text-xs text-text-secondary">
                    {formatAddress(walletAddress)}
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Balance</span>
                  <span className="font-data font-medium">{formatBalance(balance)} ETH</span>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress);
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-surface-hover rounded-lg transition-smooth"
              >
                <Icon name="Copy" size={16} />
                Copy Address
              </button>
              
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-error hover:bg-error-50 rounded-lg transition-smooth"
              >
                <Icon name="LogOut" size={16} />
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-100" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default WalletHeader;