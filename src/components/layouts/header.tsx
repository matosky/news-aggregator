import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom's Link for navigation
import { UserCircle } from "lucide-react";
import { Button } from "../ui/button"; // Assuming you have a custom Button component
import { ModeToggle } from "../common/mode-toggle";
import { UserPreferencesDialog } from "../common/use-preferences-dialog";

// Create a context for user preferences in raw React
const UserPreferencesContext = React.createContext<any>(null);

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  return context;
};

// UserPreferencesProvider to manage user preferences globally
export const UserPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState({ /* your default preferences */ });
  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default function Header() {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <header className="border-b bg-background text-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          NewsHub
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2"
            onClick={() => setShowPreferences(true)}
          >
            <UserCircle className="h-4 w-4" />
            <span>Preferences</span>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowPreferences(true)}>
            <UserCircle className="h-5 w-5" />
          </Button>

          <ModeToggle />
        </div>

        <UserPreferencesDialog open={showPreferences} onOpenChange={setShowPreferences} />
      </div>
    </header>
  );
}
