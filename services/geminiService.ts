import { TriviaQuestion } from "../types";

// Local dataset to replace API calls for offline functionality
const LOCAL_TRIVIA_DATA: TriviaQuestion[] = [
  {
    question: "What is the name of the Grinch's dog?",
    options: ["Max", "Rex", "Spot", "Buddy"],
    correctAnswer: "Max"
  },
  {
    question: "What kind of nose does Rudolph have?",
    options: ["Blue", "Red", "Green", "Yellow"],
    correctAnswer: "Red"
  },
  {
    question: "What do we leave out for Santa to eat?",
    options: ["Pizza", "Burgers", "Cookies", "Broccoli"],
    correctAnswer: "Cookies"
  },
  {
    question: "Where does Santa Claus live?",
    options: ["Hawaii", "The North Pole", "The Moon", "New York"],
    correctAnswer: "The North Pole"
  },
  {
    question: "What is Frosty the Snowman's nose made of?",
    options: ["A Carrot", "A Button", "A Rock", "A Berry"],
    correctAnswer: "A Button"
  },
  {
    question: "What brings Frosty to life?",
    options: ["A Magic Hat", "A Scarf", "Sunshine", "Snow"],
    correctAnswer: "A Magic Hat"
  },
  {
    question: "Who helps Santa make toys?",
    options: ["Elves", "Trolls", "Fairies", "Goblins"],
    correctAnswer: "Elves"
  },
  {
    question: "How does Santa get into the house?",
    options: ["The Door", "The Window", "The Chimney", "The Garage"],
    correctAnswer: "The Chimney"
  },
  {
    question: "What do naughty kids get in their stocking?",
    options: ["Candy", "Toys", "Coal", "Fruit"],
    correctAnswer: "Coal"
  },
  {
    question: "What animal pulls Santa's sleigh?",
    options: ["Horses", "Dogs", "Reindeer", "Polar Bears"],
    correctAnswer: "Reindeer"
  }
];

export const getFestiveTrivia = async (): Promise<TriviaQuestion> => {
  // Simulate a small network delay for effect
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const randomIndex = Math.floor(Math.random() * LOCAL_TRIVIA_DATA.length);
  return LOCAL_TRIVIA_DATA[randomIndex];
};
