import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppWithClerk, AppWithoutClerk } from "./AppWrapper";
import { ClerkProvider } from "@clerk/clerk-react";

// Check if we have a valid Clerk key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const hasValidClerkKey =
  PUBLISHABLE_KEY &&
  PUBLISHABLE_KEY.startsWith("pk_test_") &&
  PUBLISHABLE_KEY !== "pk_test_demo_key";

console.log("🚀 Student Resources App starting...");
console.log(
  "🔐 Authentication mode:",
  hasValidClerkKey ? "Clerk (Production)" : "Development (Fallback)"
);

const root = ReactDOM.createRoot(document.getElementById("root"));

if (hasValidClerkKey) {
  // Use Clerk if we have a valid key
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AppWithClerk />
      </ClerkProvider>
    </React.StrictMode>
  );
} else {
  // Use fallback auth if no valid Clerk key
  root.render(
    <React.StrictMode>
      <AppWithoutClerk />
    </React.StrictMode>
  );
}
