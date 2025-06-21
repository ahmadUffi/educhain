import React from "react";
import Icon from "@/app/components/AppIcon";

interface web3TooltipProps {
  onClose: () => void;
}

const Web3Tooltip: React.FC<web3TooltipProps> = ({ onClose }) => {
  const web3Concepts = [
    {
      title: "What is Web3?",
      description:
        "Web3 is the next generation of the internet built on blockchain technology, giving users control over their data and digital assets.",
    },
    {
      title: "What is a Wallet?",
      description:
        "A digital wallet stores your cryptocurrencies and allows you to interact with blockchain applications securely.",
    },
    {
      title: "Why Connect a Wallet?",
      description:
        "Your wallet serves as your identity on EduChain, allowing you to earn and manage blockchain-based rewards for learning.",
    },
  ];

  const walletRecommendations = [
    {
      name: "MetaMask",
      description: "Most popular browser extension wallet",
      url: "https://metamask.io",
    },
    {
      name: "Coinbase Wallet",
      description: "User-friendly mobile and browser wallet",
      url: "https://wallet.coinbase.com",
    },
  ];

  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-surface border border-border rounded-lg shadow-elevation-modal p-6 z-100">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 hover:bg-surface-hover rounded transition-smooth"
      >
        <Icon name="X" size={16} className="text-text-secondary" />
      </button>

      {/* Header */}
      <div className="mb-4">
        <h4 className="font-semibold text-text-primary mb-2">
          Web3 Guide for Beginners
        </h4>
        <p className="text-sm text-text-secondary">
          New to blockchain? Here's what you need to know:
        </p>
      </div>

      {/* Web3 Concepts */}
      <div className="space-y-4 mb-6">
        {web3Concepts.map((concept, index) => (
          <div key={index} className="border-l-2 border-primary pl-3">
            <h5 className="font-medium text-text-primary text-sm mb-1">
              {concept.title}
            </h5>
            <p className="text-xs text-text-secondary">{concept.description}</p>
          </div>
        ))}
      </div>

      {/* Wallet Recommendations */}
      <div className="mb-4">
        <h5 className="font-medium text-text-primary text-sm mb-3">
          Recommended Wallets:
        </h5>
        <div className="space-y-2">
          {walletRecommendations.map((wallet, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-background rounded"
            >
              <div>
                <p className="font-medium text-text-primary text-sm">
                  {wallet.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {wallet.description}
                </p>
              </div>
              <Icon name="ExternalLink" size={14} className="text-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="p-3 bg-warning-50 border border-warning-100 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Shield" size={16} className="text-warning mt-0.5" />
          <div>
            <p className="font-medium text-warning-700 text-sm mb-1">
              Safety First
            </p>
            <p className="text-xs text-warning-600">
              Never share your wallet's private key or seed phrase with anyone.
              EduChain will never ask for this information.
            </p>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-border"></div>
    </div>
  );
};

export default Web3Tooltip;
