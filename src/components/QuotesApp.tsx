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

type Verse = {
  Emotion: string;
  Reference: string;
  Verse: string;
};

const QuotesApp: React.FC = () => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [filteredVerses, setFilteredVerses] = useState<Verse[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load verses.json
  useEffect(() => {
    fetch("/verses.json")
      .then((res) => res.json())
      .then((data) => {
        setVerses(data);
        setFilteredVerses(data);
      });
  }, []);

  // Filter by emotion
  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setFilteredVerses(
      emotion ? verses.filter((v) => v.Emotion === emotion) : verses
    );
  };

  // Shuffle verses
  const handleShuffle = () => {
    setFilteredVerses([...filteredVerses].sort(() => Math.random() - 0.5));
  };

  // Copy verse to clipboard
  const handleCopy = (verse: Verse) => {
    navigator.clipboard.writeText(`${verse.Verse} — ${verse.Reference}`);
    alert("Copied to clipboard!");
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-yellow-300" /> Daily Inspiration
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-300" />
            )}
          </button>
          <Search className="w-6 h-6 text-white" />
        </div>
      </nav>

      {/* Filters */}
      <div className="flex justify-center gap-3 p-4 flex-wrap">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
          onClick={() => handleEmotionSelect("")}
        >
          <Filter className="w-5 h-5 text-yellow-200" /> All
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
          onClick={() => handleEmotionSelect("Love")}
        >
          <Heart className="w-5 h-5 text-red-200" /> Love
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
          onClick={() => handleEmotionSelect("Faith")}
        >
          <Star className="w-5 h-5 text-yellow-300" /> Faith
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
          onClick={() => handleEmotionSelect("Hope")}
        >
          <Calendar className="w-5 h-5 text-blue-200" /> Hope
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
          onClick={handleShuffle}
        >
          <Shuffle className="w-5 h-5 text-yellow-200" /> Shuffle
        </button>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredVerses.map((verse, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 dark:text-white flex flex-col justify-between"
          >
            <p className="text-lg italic mb-4">“{verse.Verse}”</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-indigo-600 dark:text-indigo-300">
                {verse.Reference}
              </span>
              <div className="flex gap-3">
                <button onClick={() => handleCopy(verse)}>
                  <Copy className="w-5 h-5 text-gray-500 hover:text-indigo-500" />
                </button>
                <button>
                  <Share2 className="w-5 h-5 text-gray-500 hover:text-indigo-500" />
                </button>
                <button>
                  <RefreshCw className="w-5 h-5 text-gray-500 hover:text-indigo-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesApp;
