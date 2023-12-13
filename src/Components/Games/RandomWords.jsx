import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Grid,
  styled,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { rusWords } from "../../assets/russian_words";
import { Label } from "@mui/icons-material";

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Control = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const WordsContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const WordItem = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const DisplayButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function RandomWords() {
  const [language, setLanguage] = React.useState("EN");
  const [words, setWords] = useState([1, 2, 3, 4, 5]);
  const [selectedTime, setSelectedTime] = useState(2);
  const [selectedWordsNumber, setSelectedWordsNumber] = useState(5);
  const [displayedWords, setDisplayedWords] = useState([]);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [showAllWords, setShowAllWords] = useState(false);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const handleWordsNumberChange = (event) => {
    setSelectedWordsNumber(event.target.value);
  };
  const fetchWords = async () => {
    try {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${selectedWordsNumber}`
      );
      const data = await response.json();
      return data; // Return the fetched words
    } catch (error) {
      console.error("Failed to fetch words:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const startDisplay = async () => {
    let fetchedWordsuUpercase = [];
    if (language === "EN") {
      const fetchedWords = await fetchWords(); // Wait for words to be fetched
      fetchedWordsuUpercase = fetchedWords.map((str) => str.toUpperCase());
    }
    if (language === "RU") {
      while (fetchedWordsuUpercase.length < selectedWordsNumber) {
        fetchedWordsuUpercase.push(
          rusWords[Math.floor(Math.random() * rusWords.length)]
        );
      }
    }
    setWords(fetchedWordsuUpercase); // Update the state with the fetched words
    setDisplayedWords([]);
    setIsDisplaying(true);
    setShowAllWords(false);

    let currentIndex = 0;

    const displayWord = () => {
      if (currentIndex < fetchedWordsuUpercase.length) {
        setDisplayedWords([fetchedWordsuUpercase[currentIndex]]);
        currentIndex++;
        setTimeout(() => {
          setDisplayedWords((prevWords) =>
            prevWords.slice(0, prevWords.length - 1)
          );
          displayWord();
        }, selectedTime * 1000);
      } else {
        setIsDisplaying(false);
      }
    };

    displayWord();
  };

  const showWords = () => {
    return (
      <WordsContainer container spacing={1} sx={{ textAlign: "center" }}>
        {displayedWords.map((word, index) => (
          <WordItem item xs={12} key={index}>
            <Typography variant="h2">{word}</Typography>
          </WordItem>
        ))}
      </WordsContainer>
    );
  };

  const handleShowAll = () => {
    setShowAllWords(true);
    setDisplayedWords(words); // Set all words to be displayed
  };

  const handleLanguage = (event, newDevices) => {
    if (newDevices.length) {
      setLanguage(newDevices);
    }
  };

  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ my: 2 }}
      >
        <h3>Visualizing Random Words</h3>

        <InputLabel>Language</InputLabel>
        <ToggleButtonGroup
          color="primary"
          value={language}
          exclusive
          onChange={handleLanguage}
          aria-label="Platform"
        >
          <ToggleButton value="EN">EN</ToggleButton>
          <ToggleButton value="RU">RU</ToggleButton>
        </ToggleButtonGroup>

        <Control fullWidth>
          <InputLabel>Number of Words</InputLabel>
          <Select
            value={selectedWordsNumber}
            onChange={handleWordsNumberChange}
            label="Number of Words"
          >
            <MenuItem value={5}>5 words</MenuItem>
            <MenuItem value={10}>10 words</MenuItem>
            <MenuItem value={12}>12 words</MenuItem>
            <MenuItem value={15}>15 words</MenuItem>
            <MenuItem value={20}>20 words</MenuItem>
          </Select>
        </Control>
        <Control fullWidth>
          <InputLabel>Display Time</InputLabel>
          <Select
            value={selectedTime}
            onChange={handleTimeChange}
            label="Display Time"
          >
            <MenuItem value={2}>2 seconds</MenuItem>
            <MenuItem value={3}>3 seconds</MenuItem>
            <MenuItem value={4}>4 seconds</MenuItem>
            <MenuItem value={5}>5 seconds</MenuItem>
            <MenuItem value={10}>10 seconds</MenuItem>
          </Select>
        </Control>

        <DisplayButton
          variant="contained"
          color="primary"
          onClick={startDisplay}
          disabled={isDisplaying || words.length === 0}
        >
          Start
        </DisplayButton>

        {showWords()}

        {!isDisplaying && !showAllWords && (
          <DisplayButton
            variant="contained"
            color="primary"
            onClick={handleShowAll}
          >
            Show All Words
          </DisplayButton>
        )}
      </Stack>
    </Container>
  );
}

export default RandomWords;
