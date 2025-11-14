// src/components/InstallPWAButton.tsx
import React, { useState, useEffect } from "react";

// Define the event interface (it's not standard in TS yet)
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the custom install button
      setIsVisible(true);
      console.log("PWA install prompt deferred.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed
    window.addEventListener("appinstalled", () => {
      // Hide the prompt if the app is installed
      setIsVisible(false);
      setDeferredPrompt(null);
      console.log("PWA installed successfully.");
    });

    // Cleanup
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    // Show the browser's install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the PWA install prompt");
    } else {
      console.log("User dismissed the PWA install prompt");
    }
    // We've used the prompt, so clear it
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger the install
    setIsVisible(false);
    console.log("User dismissed the custom PWA install banner.");
  };

  // --- TEMPORARILY DISABLED ---
  // To re-enable, remove the line below.
  // This is now placed AFTER all hooks and handlers.
  // return null; // <-- THIS LINE WAS REMOVED
  // --------------------------

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="pwa-install-toast"
      onClick={handleInstallClick}
      title="Install AI Home Decorator App"
    >
      <div className="pwa-install-content">
        <img
          src="/icons/icon-192x192.png"
          alt="App Logo"
          className="pwa-install-logo"
        />
        <div className="pwa-install-text">
          <strong>Install AI Home Decorator</strong>
          <p>Add to your Home Screen for a faster experience.</p>
        </div>
        <button className="pwa-install-button">Install</button>
      </div>
      <button
        onClick={handleCloseClick}
        className="pwa-install-close"
        title="Dismiss"
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  );
};

export default InstallPWAButton;
