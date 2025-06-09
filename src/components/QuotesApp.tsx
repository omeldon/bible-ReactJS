import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
    Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import versesDataJson from "../data/quotes.json";
import { BorderColor } from "@mui/icons-material";

type Verse = {
    Emotion: string;
    Reference: string;
    Verse: string;
};

const emotions = [
    "happiness",
    "love",
    "excitement",
    "gratitude",
    "pride",
    "serenity",
    "amusement",
    "joy",
    "hope",
    "contentment",
    "sadness",
    "anger",
    "fear",
    "disgust",
    "jealousy",
    "guilt",
    "shame",
    "frustration",
    "despair",
    "anxiety",
    "confusion",
    "surprise",
    "empathy",
    "awe",
    "relief",
    "nostalgia",
    "regret",
    "envy",
    "compassion",
];

// Styled toggle switch with icon
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
    const [displayVerse, setDisplayVerse] = useState<Verse | null>(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.classList.toggle("dark", savedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle("dark", theme === "dark");
        document.body.style.overflow = "hidden";
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        setVersesData(versesDataJson);
    }, []);

    const handleEmotionChange = (event: SelectChangeEvent) => {
        setSelectedEmotion(event.target.value);
        setDisplayVerse(null);
        setErrorMsg("");
    };

    const searchVerse = () => {
        if (!selectedEmotion) return alert("Please select an emotion.");
        if (versesData.length === 0) return alert("Verse data not loaded yet.");

        const filtered = versesData.filter(
            (v) => v.Emotion?.trim().toLowerCase() === selectedEmotion.toLowerCase()
        );

        if (filtered.length > 0) {
            const randomVerse = filtered[Math.floor(Math.random() * filtered.length)];
            setDisplayVerse(randomVerse);
            setErrorMsg("");
        } else {
            setDisplayVerse(null);
            setErrorMsg("No verse found for this emotion.");
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

            {/* Main Content */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                maxWidth="600px"
                mx="auto"
                textAlign="center"
                gap={3}
                width="100%"
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                >
                    Find a Bible Verse for Your Emotion
                </Typography>

                <Box width="100%">
                    <FormControl fullWidth>
                        <InputLabel
                            id="emotion-label"
                            sx={{
                                color: theme === "dark" ? "#fff" : "#000",
                                "&.Mui-focused": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                            }}
                        >
                            Select Emotion
                        </InputLabel>
                        <Select
                            labelId="emotion-label"
                            value={selectedEmotion}
                            onChange={handleEmotionChange}
                            label="Select Emotion"
                            sx={{
                                color: theme === "dark" ? "#fff" : "#000",
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme === "dark" ? "#fff" : "#000",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme === "dark" ? "#fff" : "#000",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme === "dark" ? "#fff" : "#000",
                                },
                            }}
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
                </Box>

                <Box width="100%">
                    <Button
                        onClick={searchVerse}
                        sx={{
                            borderRadius: "20px",
                            px: 4,
                            py: 1.5,
                            fontSize: "1rem",
                            background: "linear-gradient(to right, #3b82f6, #60a5fa)",
                            color: "#fff",
                            "&:hover": {
                                background: "linear-gradient(to right, #2563eb, #3b82f6)",
                            },
                            mx: "auto",       // centers button horizontally
                            display: "block", // needed for mx auto centering
                            minWidth: 140,    // or whatever width you want
                        }}
                    >
                        Search
                    </Button>
                </Box>

                <Card
                    sx={{
                        width: "100%",
                        minHeight: 120,
                        p: { xs: 2, sm: 4 },
                        bgcolor: theme === "dark" ? "#1e1e1e" : "#fff",
                        color: theme === "dark" ? "#fff" : "#000",
                        borderRadius: 2,
                        boxShadow:
                            theme === "dark"
                                ? "0 0 10px rgba(255,255,255,0.1)"
                                : "0 0 10px rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    {errorMsg ? (
                        <Typography sx={{ color: "error.main" }}>{errorMsg}</Typography>
                    ) : displayVerse ? (
                        <>
                            <Typography fontWeight="bold" mb={1}>
                                {displayVerse.Reference}
                            </Typography>
                            <Typography>{displayVerse.Verse}</Typography>
                        </>
                    ) : (
                        <Typography
                            variant="body2"
                            fontStyle="italic"
                            sx={{ color: theme === "dark" ? "#ddd" : "text.secondary" }}
                        >
                            Select an emotion and click search.
                        </Typography>
                    )}
                </Card>
            </Box>
        </Box>
    );
};

export default QuotesApp;
