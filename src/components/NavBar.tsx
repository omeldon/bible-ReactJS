import React from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  theme,
  isOpen,
  onToggle,
  onClose,
}) => {
  const menuItems = [
    { id: 1, label: "Option 1", href: "#" },
    { id: 2, label: "Option 2", href: "#" },
    { id: 3, label: "Option 3", href: "#" },
    { id: 4, label: "Option 4", href: "#" },
  ];

  const handleMenuItemClick = (item: {
    id: number;
    label: string;
    href: string;
  }) => {
    console.log(`Clicked ${item.label}`);
    // Close the navbar when an item is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Burger Menu Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onToggle}
          className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
            theme === "dark"
              ? "bg-white/20 text-white hover:bg-white/30"
              : "bg-gray-800/20 text-gray-800 hover:bg-gray-800/30"
          }`}
        >
          {isOpen ? (
            <X
              size={20}
              className={theme === "dark" ? "text-black" : "text-white"}
            />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "light"
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
        } shadow-2xl`}
      >
        {/* Navbar Header */}
        <div className="p-6 border-b border-opacity-20 border-current flex justify-center items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
            Bi-Verse
          </h2>
        </div>

        {/* Navigation Items */}
        <nav className="p-6">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    theme === "light"
                      ? "text-gray-300 hover:text-white hover:bg-white/20"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-200/50"
                  } hover:translate-x-2 transform`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick(item);
                  }}
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-opacity-20 border-current">
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Bi-Verse App v1.0
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
