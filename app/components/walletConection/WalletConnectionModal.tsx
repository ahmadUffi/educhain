import React from "react";
import Icon from "@/app/components/AppIcon";

interface WalletConnectionModalProps {
  onConnect: (walletId: string) => void;
  onClose: () => void;
  isConnecting: boolean;
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({
  onConnect,
  onClose,
  isConnecting,
}) => {
  const walletOptions = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "Wallet",
      description: "Connect using browser extension",
      popular: true,
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "Smartphone",
      description: "Scan with mobile wallet",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "CreditCard",
      description: "Connect with Coinbase",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-150">
      <div className="bg-surface rounded-xl shadow-elevation-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-text-primary">
            Connect Wallet
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg transition-smooth"
            disabled={isConnecting}
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text-secondary mb-6 text-center">
            Choose your preferred wallet to connect to EduChain
          </p>

          {/* Wallet Options */}
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => onConnect(wallet.id)}
                disabled={isConnecting}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary-50 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-smooth">
                  <Icon name={wallet.icon} size={24} className="text-primary" />
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-text-primary">
                      {wallet.name}
                    </h4>
                    {wallet.popular && (
                      <span className="px-2 py-1 bg-accent-100 text-accent-600 text-xs font-medium rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {wallet.description}
                  </p>
                </div>

                <Icon
                  name="ChevronRight"
                  size={20}
                  className="text-text-secondary group-hover:text-primary transition-smooth"
                />
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isConnecting && (
            <div className="mt-6 flex items-center justify-center gap-3 p-4 bg-primary-50 rounded-lg">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-primary font-medium">
                Connecting to wallet...
              </span>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-6 p-4 bg-background rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-text-primary font-medium mb-1">
                  Don't have a wallet?
                </p>
                <p className="text-sm text-text-secondary">
                  Download MetaMask or another supported wallet to get started
                  with Web3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionModal;
