import * as React from "react";
import reaction from "../../assets/Images/reaction2.png";
import predictions from "../../assets/Images/predictions.png";
import visualizing from "../../assets/Images/visualizing.png";
import AlbumLayout from "../AlbumLayout";

const cards = [
  {
    Heading: "Visualizing",
    Description:
      "The visual mnemonic technique involves creating a mental image that interlinks vivid representations of each word in a memorable scene, leveraging the brain's ability to better recall visuals and spatial relationships to enhance memory retention.",
    Image: visualizing,
    path: "/visualizing",
    action: "MORE",
  },
  {
    Heading: "Reaction games",
    Description:
      "Reaction games are excellent for brain training as they challenge and improve your ability to respond quickly and accurately to stimuli. These games enhance your reaction time, hand-eye coordination, and cognitive processing speed. By engaging in reaction games, you can boost your mental alertness and sharpen your reflexes, skills that are valuable in various real-life situations, from driving to decision-making in fast-paced environments.This reaction game, involving double-tapping a button upon seeing circle shapes, is beneficial for improving cognitive functions in several ways. It enhances visual perception and attention to detail by requiring quick recognition of specific shapes. Additionally, it boosts hand-eye coordination and reflexes, as players must respond rapidly and accurately. This exercise is particularly effective for sharpening focus and reaction speed, making it a valuable tool for brain training.",
    Image: reaction,
    path: "/reaction",
    action: "MORE",
  },
  {
    Heading: "Making predictions",
    Description:
      "This method of brain training, which focuses on making predictions, is beneficial for enhancing critical thinking and foresight. By anticipating future events and planning accordingly, it stimulates strategic thinking and problem-solving abilities. This exercise also helps in improving mental flexibility and the capacity to adapt to new information, which are crucial skills for decision-making and planning in everyday life.",
    Image: predictions,
    path: "/predictions",
    action: "MORE",
  },
];

export default function Home() {
  return (
    <AlbumLayout
      cards={cards}
      title={"Memory Games"}
      subtitle={
        "Memory is not just a faculty of our brains; it is the cornerstone of learning and personal development. Brain training, the practice of stimulating cognitive functions to maintain or improve them, has gained immense popularity."
      }
      info={
        "Incorporating these methods into daily routines can significantly enhance memory and cognitive functions. Each method targets different aspects of brain training, offering a comprehensive approach to mental fitness. Whether it&apos;s expanding vocabulary, playing reaction games, or solving riddles, the key is consistency and engagement. As with physical fitness, the brain requires regular exercise to stay sharp and agile. By adopting these varied techniques, individuals can not only boost their memory but also enrich their overall cognitive abilities, paving the way for lifelong learning and mental well-being."
      }
      updateGameComponent={() => {}}
    />
  );
}
