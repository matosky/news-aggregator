import React, { ReactNode } from "react"; // Import ReactNode for typing children
import { UserPreferencesProvider } from "../../context/user-preferences-context";
import { NewsProvider } from "../../context/news-context";
import Header from "./header";
import { ThemeProvider } from "../../context/theme-context";

interface LayoutProps {
  children: ReactNode; // Typing the children prop as ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Applying the Inter font globally */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <ThemeProvider>
        <UserPreferencesProvider>
          <NewsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <footer className="py-6 border-t">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                  <p>© {new Date().getFullYear()} NewsHub. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </NewsProvider>
        </UserPreferencesProvider>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
