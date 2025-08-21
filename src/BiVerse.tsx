import React, { useState } from "react";
import Navbar from "./components/NavBar";
import QuotesApp from "./components/QuotesApp";

const BiVerse: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <div className="relative">
      <Navbar 
        theme={theme} 
        isOpen={isNavbarOpen} 
        onToggle={toggleNavbar}
        onClose={closeNavbar}
      />
      
      <QuotesApp 
        theme={theme}
        onThemeToggle={toggleTheme}
        isNavbarOpen={isNavbarOpen}
        onNavbarToggle={toggleNavbar}
      />
    </div>
  );
};

export default BiVerse;