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
      <ThemeProvider>
        <UserPreferencesProvider>
          <NewsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <footer className="py-6 border-t bg-background text-foreground">
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
