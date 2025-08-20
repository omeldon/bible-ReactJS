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
  ChevronDown,
  Filter,
  Shuffle
} from "lucide-react";

type Verse = {
  Emotion: string;
  Reference: string;
  Verse: string;
};

// Sample verses data from your JSON structure
const sampleVerses: Verse[] = [
  {"Emotion":"Happiness","Reference":"Psalm 144:15","Verse":"Blessed are the people whose God is the Lord!"},
  {"Emotion":"Happiness","Reference":"Proverbs 16:20","Verse":"Whoever gives thought to the word will discover good, and blessed is he who trusts in the Lord."},
  {"Emotion":"Happiness","Reference":"John 16:22","Verse":"So also you have sorrow now, but I will see you again, and your hearts will rejoice."},
  {"Emotion":"Happiness","Reference":"Philippians 4:4","Verse":"Rejoice in the Lord always; again I will say, rejoice."},
  {"Emotion":"Happiness","Reference":"Psalm 118:24","Verse":"This is the day that the Lord has made; let us rejoice and be glad in it."},
  {"Emotion":"Happiness","Reference":"Psalm 126:5","Verse":"Those who sow with tears will reap with songs of joy."},
  {"Emotion":"Happiness","Reference":"Romans 15:13","Verse":"May the God of hope fill you with all joy and peace as you trust in Him."},
  {"Emotion":"Happiness","Reference":"Nehemiah 8:10","Verse":"The joy of the Lord is your strength."},
  {"Emotion":"Love","Reference":"1 John 4:19","Verse":"We love because he first loved us."},
  {"Emotion":"Fear","Reference":"Joshua 1:9","Verse":"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."},
  {"Emotion":"Sadness","Reference":"Psalm 34:18","Verse":"The Lord is close to the brokenhearted and saves those who are crushed in spirit."},
  {"Emotion":"Anxiety","Reference":"Philippians 4:6-7","Verse":"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."}
];

const emotions = [
  "happiness", "love", "excitement", "gratitude", "pride", "serenity",
  "amusement", "joy", "hope", "contentment", "sadness", "anger",
  "fear", "disgust", "jealousy", "guilt", "shame", "frustration",
  "despair", "anxiety", "confusion", "surprise", "empathy", "awe",
  "relief", "nostalgia", "regret", "envy", "compassion"
];

const dailyVerses: Verse[] = [
  {
    Emotion: "Hope",
    Reference: "Jeremiah 29:11",
    Verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future."
  },
  {
    Emotion: "Faith",
    Reference: "Romans 8:28",
    Verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."
  },
  {
    Emotion: "Strength",
    Reference: "Isaiah 40:31",
    Verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
  }
];

const QuotesApp: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [versesData, setVersesData] = useState<Verse[]>(sampleVerses);
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
    // Initialize theme without localStorage
    const savedTheme = "light"; // Default to light theme
    setTheme(savedTheme);

    // Initialize favorites without localStorage
    const savedFavorites: Verse[] = []; // Start with empty favorites
    setFavorites(savedFavorites);

    // Set daily verse
    const today = new Date().getDate();
    setDailyVerse(dailyVerses[today % dailyVerses.length]);

    // Load verses data (in a real app, you'd load from quotes.json here)
    setVersesData(sampleVerses);
  }, []);

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

      <style>{`
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
