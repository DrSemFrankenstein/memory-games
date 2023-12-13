import * as React from "react";
import { Box, Container } from "@mui/material";
import RedCircleGame from "../Games/RedCircleGame";
import FighterPilotGame from "../Games/FighterPilotGame";
import AlbumLayout from "../AlbumLayout";
import fighterpilotgame from "../../assets/Images/fighterpilotgame.png";
import redcircle from "../../assets/Images/redcircle.png";

export default function Reaction() {
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
      case "/reaction/fighterpilotgame":
        setGameComponent(<FighterPilotGame />);
        scrollToTop();
        break;
      case "/reaction/redcircle":
        setGameComponent(<RedCircleGame />);
        scrollToTop();
        break;
      default:
        setGameComponent(null);
        break;
    }
  };

  const cards = [
    {
      Heading: "Fighter Pilot Game",
      Description:
        "Fighter Pilot Challenge is a brain-training game that enhances cognitive skills such as hand-eye coordination, spatial awareness, reaction time, problem-solving, and more. Players must navigate their rectangle through a maze of moving obstacles, requiring focus, strategy, and quick thinking. This engaging game not only provides mental stimulation but also promotes stress management, time management, and resilience, making it an enjoyable and beneficial activity for sharpening cognitive abilities.",
      Image: fighterpilotgame,
      path: "/reaction/fighterpilotgame",
      action: "PLAY",
    },
    {
      Heading: "Red Circle",
      Description:
        "This reaction game, involving double-tapping a button upon seeing circle shapes, is beneficial for improving cognitive functions in several ways. It enhances visual perception and attention to detail by requiring quick recognition of specific shapes. Additionally, it boosts hand-eye coordination and reflexes, as players must respond rapidly and accurately. This exercise is particularly effective for sharpening focus and reaction speed, making it a valuable tool for brain training.",
      Image: redcircle,
      path: "/reaction/redcircle",
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
        title={"Reaction Games"}
        subtitle={
          "Memory is not just a faculty of our brains; it is the cornerstone of learning and personal development. Brain training, the practice of stimulating cognitive functions to maintain or improve them, has gained immense popularity."
        }
        info={""}
        updateGameComponent={updateGameComponent}
      />
    </>
  );
}
