import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Switch,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import versesDataJson from "../data/quotes.json";

type Verse = {
  Emotion: string;
  Reference: string;
  Verse: string;
};

const emotions = [
  "happiness", "love", "excitement", "gratitude", "pride", "serenity",
  "amusement", "joy", "hope", "contentment", "sadness", "anger",
  "fear", "disgust", "jealousy", "guilt", "shame", "frustration",
  "despair", "anxiety", "confusion", "surprise", "empathy", "awe",
  "relief", "nostalgia", "regret", "envy", "compassion",
];

// Daily verses
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

// Theme Switch (with icons)
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    padding: 6,
    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#333",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#000",
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: 16,
      color: theme.palette.mode === "dark" ? "#000" : "#fff",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    backgroundColor: "#ccc",
    border: "1px solid grey",
  },
}));

const QuotesApp: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [versesData, setVersesData] = useState<Verse[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayVerse, setDisplayVerse] = useState<Verse | null>(null);
  const [dailyVerse, setDailyVerse] = useState<Verse | null>(null);
  const [favorites, setFavorites] = useState<Verse[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  // init theme + data
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark", savedTheme === "dark");

    setVersesData(versesDataJson);

    const today = new Date().getDate();
    setDailyVerse(dailyVerses[today % dailyVerses.length]);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleEmotionChange = (event: SelectChangeEvent) => {
    setSelectedEmotion(event.target.value);
    setDisplayVerse(null);
    setErrorMsg("");
  };

  const searchByEmotion = () => {
    if (!selectedEmotion) return setErrorMsg("Please select an emotion.");

    const filtered = versesData.filter(
      (v) => v.Emotion?.trim().toLowerCase() === selectedEmotion.toLowerCase()
    );

    if (filtered.length > 0) {
      setDisplayVerse(filtered[Math.floor(Math.random() * filtered.length)]);
      setErrorMsg("");
    } else {
      setDisplayVerse(null);
      setErrorMsg("No verse found for this emotion.");
    }
  };

  const searchByKeyword = () => {
    if (!searchKeyword.trim()) return setErrorMsg("Please enter a keyword.");

    const filtered = versesData.filter(
      (v) =>
        v.Verse.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        v.Reference.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    if (filtered.length > 0) {
      setDisplayVerse(filtered[Math.floor(Math.random() * filtered.length)]);
      setErrorMsg("");
    } else {
      setDisplayVerse(null);
      setErrorMsg("No verse found with that keyword.");
    }
  };

  const getRandomVerse = () => {
    if (versesData.length === 0) return;
    setDisplayVerse(versesData[Math.floor(Math.random() * versesData.length)]);
    setErrorMsg("");
  };

  const toggleFavorite = (verse: Verse) => {
    const isFav = favorites.some(
      (f) => f.Reference === verse.Reference && f.Verse === verse.Verse
    );
    if (isFav) {
      setFavorites(favorites.filter((f) => f.Reference !== verse.Reference));
    } else {
      setFavorites([...favorites, verse]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme === "dark" ? "#121212" : "#e5e4e2",
        color: theme === "dark" ? "#fff" : "#000",
        transition: "all 0.3s ease",
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 5 },
        position: "relative",
      }}
    >
      {/* Theme Toggle */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <ThemeSwitch
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          icon={<WbSunnyIcon style={{ color: "gold" }} />}
          checkedIcon={<DarkModeIcon />}
        />
      </Box>

      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Bible Verses
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find comfort and guidance through God's word
        </Typography>
      </Box>

      {/* Daily Verse */}
      {dailyVerse && (
        <Card sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CalendarTodayIcon color="primary" />
            <Typography variant="h6">Verse of the Day</Typography>
          </Box>
          <Typography variant="body1" fontStyle="italic" mb={1}>
            "{dailyVerse.Verse}"
          </Typography>
          <Typography variant="subtitle2" color="primary">
            - {dailyVerse.Reference}
          </Typography>
        </Card>
      )}

      {/* Search Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Emotion</InputLabel>
          <Select
            value={selectedEmotion}
            label="Select Emotion"
            onChange={handleEmotionChange}
          >
            <MenuItem value="">
              <em>-- Choose an Emotion --</em>
            </MenuItem>
            {emotions.map((emo) => (
              <MenuItem key={emo} value={emo}>
                {emo.charAt(0).toUpperCase() + emo.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by keyword..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchByKeyword()}
          sx={{ mb: 2 }}
        />

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" startIcon={<SearchIcon />} onClick={searchByEmotion}>
            Search Emotion
          </Button>
          <Button variant="contained" color="success" startIcon={<SearchIcon />} onClick={searchByKeyword}>
            Search Keyword
          </Button>
          <Button variant="contained" color="secondary" startIcon={<ShuffleIcon />} onClick={getRandomVerse}>
            Random Verse
          </Button>
        </Box>
      </Card>

      {/* Results */}
      <Card sx={{ p: 3, minHeight: 150 }}>
        {errorMsg ? (
          <Typography color="error">{errorMsg}</Typography>
        ) : displayVerse ? (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              {displayVerse.Reference}
            </Typography>
            <Typography variant="body1" fontStyle="italic" gutterBottom>
              "{displayVerse.Verse}"
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="center" gap={2}>
              <IconButton onClick={() => toggleFavorite(displayVerse)}>
                {favorites.some((f) => f.Reference === displayVerse.Reference) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <IconButton onClick={() => navigator.clipboard.writeText(`"${displayVerse.Verse}" - ${displayVerse.Reference}`)}>
                <ContentCopyIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Typography textAlign="center" color="text.secondary">
            Select an emotion, enter a keyword, or click random verse to begin.
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default QuotesApp;
