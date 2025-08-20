import React, { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Search,
  Heart,
  Share2,
  Copy,
  RefreshCw,
  BookOpen,
  Calendar,
  Star,
  Filter,
  Shuffle,
} from "lucide-react";
import quotesData from "../data/quotes.json";

type Verse = {
  Emotion: string;
  Reference: string;
  Verse: string;
};

const QuotesApp: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [versesData, setVersesData] = useState<Verse[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayVerse, setDisplayVerse] = useState<Verse | null>(null);
  const [dailyVerse, setDailyVerse] = useState<Verse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [favorites, setFavorites] = useState<Verse[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Load favorites from memory
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);

    // TODO: Replace this with your actual verses data
    // You can either:
    // 1. Paste your JSON data directly into a variable here
    // 2. Use a fetch request to load from an API
    // 3. Copy-paste your verses into the versesData state
    
    // Example: setVersesData(yourActualBibleVersesArray);
    
    // Set daily verse from your actual data (when available)
    // if (yourVersesData.length > 0) {
    //   const today = new Date().getDate();
    //   setDailyVerse(yourVersesData[today % yourVersesData.length]);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleEmotionChange = (emotion: string) => {
    setSelectedEmotion(emotion);
    setShowDropdown(false);
    setDisplayVerse(null);
    setErrorMsg("");
  };

  const searchByEmotion = () => {
    if (!selectedEmotion) {
      setErrorMsg("Please select an emotion.");
      return;
    }

    if (versesData.length === 0) {
      setErrorMsg("Verse data not loaded yet. Please make sure your JSON file is imported.");
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const filtered = versesData.filter(
        (v) => v.Emotion?.trim().toLowerCase() === selectedEmotion.toLowerCase()
      );

      if (filtered.length > 0) {
        const randomVerse = filtered[Math.floor(Math.random() * filtered.length)];
        setDisplayVerse(randomVerse);
        setErrorMsg("");
      } else {
        setDisplayVerse(null);
        setErrorMsg("No verse found for this emotion. Try another emotion!");
      }
      setIsLoading(false);
    }, 500);
  };

  const searchByKeyword = () => {
    if (!searchKeyword.trim()) {
      setErrorMsg("Please enter a keyword to search.");
      return;
    }

    if (versesData.length === 0) {
      setErrorMsg("Verse data not loaded yet. Please make sure your JSON file is imported.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const filtered = versesData.filter(
        (v) => 
          v.Verse.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          v.Reference.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      if (filtered.length > 0) {
        const randomVerse = filtered[Math.floor(Math.random() * filtered.length)];
        setDisplayVerse(randomVerse);
        setErrorMsg("");
      } else {
        setDisplayVerse(null);
        setErrorMsg("No verse found containing that keyword. Try a different search!");
      }
      setIsLoading(false);
    }, 500);
  };

  const getRandomVerse = () => {
    if (versesData.length === 0) {
      setErrorMsg("Verse data not loaded yet. Please make sure your JSON file is imported.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const randomVerse = versesData[Math.floor(Math.random() * versesData.length)];
      setDisplayVerse(randomVerse);
      setErrorMsg("");
      setIsLoading(false);
    }, 300);
  };

  const toggleFavorite = (verse: Verse) => {
    const isAlreadyFavorite = favorites.some(fav => 
      fav.Reference === verse.Reference && fav.Verse === verse.Verse
    );

    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => 
        !(fav.Reference === verse.Reference && fav.Verse === verse.Verse)
      ));
    } else {
      setFavorites([...favorites, verse]);
    }
  };

  const copyToClipboard = async (verse: Verse) => {
    const text = `"${verse.Verse}" - ${verse.Reference}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareVerse = async (verse: Verse) => {
    const text = `"${verse.Verse}" - ${verse.Reference}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bible Verse',
          text: text,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      copyToClipboard(verse);
    }
  };

  const isFavorite = (verse: Verse) => {
    return favorites.some(fav => 
      fav.Reference === verse.Reference && fav.Verse === verse.Verse
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white" 
        : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900"
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`p-3 rounded-full transition-all duration-300 ${
            theme === "dark"
              ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } shadow-lg hover:shadow-xl transform hover:scale-105`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bible Verses
          </h1>
          <p className={`text-lg md:text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Find comfort and guidance through God's word
          </p>
        </div>

        {/* Daily Verse */}
        {dailyVerse && (
          <div className={`mb-8 p-6 rounded-2xl shadow-lg transition-all duration-300 ${
            theme === "dark" 
              ? "bg-white/10 backdrop-blur-sm border border-white/20" 
              : "bg-white/80 backdrop-blur-sm border border-gray-200"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="text-blue-500" size={20} />
              <h3 className="text-lg font-semibold">Verse of the Day</h3>
            </div>
            <p className={`text-lg italic mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
              "{dailyVerse.Verse}"
            </p>
            <p className="font-semibold text-blue-600">- {dailyVerse.Reference}</p>
          </div>
        )}

        {/* Search Section */}
        <div className={`mb-8 p-6 rounded-2xl shadow-lg transition-all duration-300 ${
          theme === "dark" 
            ? "bg-white/10 backdrop-blur-sm border border-white/20" 
            : "bg-white/80 backdrop-blur-sm border border-gray-200"
        }`}>
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setShowFavorites(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !showFavorites
                  ? "bg-blue-600 text-white shadow-lg"
                  : theme === "dark"
                  ? "bg-white/20 text-gray-300 hover:bg-white/30"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Search size={16} className="inline mr-2" />
              Search
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                showFavorites
                  ? "bg-blue-600 text-white shadow-lg"
                  : theme === "dark"
                  ? "bg-white/20 text-gray-300 hover:bg-white/30"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Heart size={16} className="inline mr-2" />
              Favorites ({favorites.length})
            </button>
          </div>

          {!showFavorites ? (
            <div className="space-y-4">
              {/* Emotion Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search by Emotion</label>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                      theme === "dark"
                        ? "bg-white/10 border-white/30 hover:bg-white/20"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className={selectedEmotion ? "" : "text-gray-500"}>
                      {selectedEmotion ? selectedEmotion.charAt(0).toUpperCase() + selectedEmotion.slice(1) : "Select an emotion"}
                    </span>
                    <ChevronDown size={20} className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className={`absolute z-20 w-full mt-1 max-h-48 overflow-y-auto rounded-lg border shadow-lg ${
                      theme === "dark"
                        ? "bg-gray-800 border-white/30"
                        : "bg-white border-gray-300"
                    }`}>
                      {emotions.map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => handleEmotionChange(emotion)}
                          className={`w-full p-3 text-left hover:bg-blue-600 hover:text-white transition-all ${
                            selectedEmotion === emotion ? "bg-blue-600 text-white" : ""
                          }`}
                        >
                          {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search by Keyword</label>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Enter a word or phrase..."
                  className={`w-full p-3 rounded-lg border transition-all ${
                    theme === "dark"
                      ? "bg-white/10 border-white/30 placeholder-gray-400 hover:bg-white/20"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && searchByKeyword()}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={searchByEmotion}
                  disabled={isLoading}
                  className="flex-1 min-w-[120px] bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Filter size={16} />}
                  Search Emotion
                </button>
                <button
                  onClick={searchByKeyword}
                  disabled={isLoading}
                  className="flex-1 min-w-[120px] bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
                  Search Keyword
                </button>
                <button
                  onClick={getRandomVerse}
                  disabled={isLoading}
                  className="flex-1 min-w-[120px] bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Shuffle size={16} />}
                  Random Verse
                </button>
              </div>
            </div>
          ) : (
            /* Favorites Section */
            <div>
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={48} className={`mx-auto mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-300"}`} />
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    No favorite verses yet. Add some by clicking the heart icon!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((verse, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all ${
                        theme === "dark"
                          ? "bg-white/10 border-white/20 hover:bg-white/20"
                          : "bg-white border-gray-200 hover:shadow-md"
                      }`}
                    >
                      <p className={`text-lg mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                        "{verse.Verse}"
                      </p>
                      <p className="font-semibold text-blue-600 mb-3">- {verse.Reference}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(verse)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Heart size={16} fill="currentColor" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(verse)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => shareVerse(verse)}
                          className="text-gray-500 hover:text-green-600 transition-colors"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className={`p-6 rounded-2xl shadow-lg min-h-[200px] flex flex-col justify-center transition-all duration-300 ${
          theme === "dark" 
            ? "bg-white/10 backdrop-blur-sm border border-white/20" 
            : "bg-white/80 backdrop-blur-sm border border-gray-200"
        }`}>
          {errorMsg ? (
            <div className="text-center">
              <div className="text-red-500 text-lg mb-2">❌</div>
              <p className="text-red-500">{errorMsg}</p>
            </div>
          ) : displayVerse ? (
            <div className="text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="text-blue-500" size={24} />
                <h3 className="text-xl font-semibold">{displayVerse.Reference}</h3>
              </div>
              <p className={`text-xl md:text-2xl leading-relaxed mb-6 italic ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}>
                "{displayVerse.Verse}"
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => toggleFavorite(displayVerse)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isFavorite(displayVerse)
                      ? "text-red-500 hover:text-red-600"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <Heart size={20} fill={isFavorite(displayVerse) ? "currentColor" : "none"} />
                  {isFavorite(displayVerse) ? "Favorited" : "Add to Favorites"}
                </button>
                <button
                  onClick={() => copyToClipboard(displayVerse)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    copySuccess ? "text-green-500" : theme === "dark" ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  <Copy size={20} />
                  {copySuccess ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => shareVerse(displayVerse)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    shareSuccess ? "text-green-500" : theme === "dark" ? "text-gray-400 hover:text-green-500" : "text-gray-600 hover:text-green-500"
                  }`}
                >
                  <Share2 size={20} />
                  {shareSuccess ? "Shared!" : "Share"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-6xl mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>📖</div>
              <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Select an emotion, search by keyword, or get a random verse to begin.
              </p>
            </div>
          )}
        </div>

        {/* Success Messages */}
        {(copySuccess || shareSuccess) && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            {copySuccess && "Verse copied to clipboard!"}
            {shareSuccess && "Verse shared successfully!"}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuotesApp;
