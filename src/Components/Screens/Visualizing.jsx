import * as React from "react";
import { Box, Container } from "@mui/material";
import AlbumLayout from "../AlbumLayout";
import randomwords from "../../assets/Images/randomwords.png";
import memorycards from "../../assets/Images/memorycards.png";
import MemoryCards from "../Games/MemoryCards";
import RandomWords from "../Games/RandomWords";

export default function Visualizing() {
  // Conditionally render the components based on the pathname
  const [gameComponent, setGameComponent] = React.useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateGameComponent = () => {
    switch (window.location.pathname) {
      case `${import.meta.env.BASE_URL + "visualizing/randomwords"}`:
        setGameComponent(<RandomWords />);
        scrollToTop();
        break;
      case `${import.meta.env.BASE_URL + "visualizing/memorycards"}`:
        setGameComponent(<MemoryCards />);
        scrollToTop();
        break;
      default:
        setGameComponent(null);
        scrollToTop();
        break;
    }
  };

  const cards = [
    {
      Heading: "Random Words",
      Description:
        "Visualizing words is a potent memory training technique. It involves creating vivid mental images associated with the words you wish to remember. This method enhances memory retention by engaging the brain's imaginative and associative capabilities. It's particularly effective for learning new vocabulary, complex concepts, or sequential information, as the mental imagery created makes recall easier and more intuitive. By converting abstract words into concrete images, visualizing words strengthens memory, improves focus, and aids in long-term retention of information.",
      Image: randomwords,
      path: "visualizing/randomwords",
      action: "PLAY",
    },
    {
      Heading: "Memory Cards",
      Description:
        "Memory Card games are excellent for enhancing cognitive abilities, particularly memory and concentration. By challenging players to match pairs of cards, these games stimulate the brain, improve pattern recognition, and strengthen short-term memory. They are also beneficial for all ages, helping in cognitive development in children and maintaining mental agility in adults.",
      Image: memorycards,
      path: "visualizing/memorycards",
      action: "PLAY",
    },
  ];

  return (
    <>
      {gameComponent != null && (
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">{gameComponent}</Container>
        </Box>
      )}
      <AlbumLayout
        cards={cards}
        title={"Visualizing"}
        subtitle={
          "Visualizing to enhance memory retention involves creating vivid mental images of the information you want to remember. This technique engages multiple senses, making recall easier and more effective. It helps organize information, enhances creativity, and is applicable across various disciplines. Visualization not only improves long-term memory but also reduces stress, making it a powerful and versatile tool for both learning and overall well-being."
        }
        info={""}
        updateGameComponent={updateGameComponent}
      />
    </>
  );
}
