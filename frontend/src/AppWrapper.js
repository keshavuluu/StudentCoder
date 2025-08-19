import React from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import App from "./App";

// Wrapper component that only uses Clerk hooks when inside ClerkProvider
const AppWithClerk = () => {
  const clerkAuth = useUser();
  const clerkAuthObj = useAuth();

  // Log Clerk authentication status
  if (clerkAuth?.isLoaded) {
    console.log("🔐 Clerk authentication ready:", clerkAuth?.isSignedIn ? "Signed in" : "Not signed in");
  }

  return (
    <App useClerk={true} clerkAuth={clerkAuth} clerkAuthObj={clerkAuthObj} />
  );
};

const AppWithoutClerk = () => {
  return <App useClerk={false} clerkAuth={null} clerkAuthObj={null} />;
};

export { AppWithClerk, AppWithoutClerk };
