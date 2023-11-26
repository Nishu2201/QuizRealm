import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Container,
  Text,
  VStack,
  Heading,
  CircularProgress,
  CircularProgressLabel,
  useToast,
} from '@chakra-ui/react';

const questions = [
  {
    "question": "Wie sagt man 'hello' auf Deutsch? (How do you say 'hello' in German?)",
    "options": [
      "Guten Tag",
      "Auf Wiedersehen",
      "Danke",
      "Entschuldigung"
    ],
    "correctAnswer": "Guten Tag"
  },
  {
    "question": "Was ist der Artikel für das Wort 'Haus' im Deutschen? (What is the article for the word 'Haus' in German?)",
    "options": ["der", "die", "das", "den"],
    "correctAnswer": "das"
  },
  {
    "question": "Wie sagt man 'I am learning German' auf Deutsch? (How do you say 'I am learning German' in German?)",
    "options": [
      "Ich kann Deutsch sprechen",
      "Ich lerne Deutsch",
      "Ich liebe Deutsch",
      "Ich esse Deutsch"
    ],
    "correctAnswer": "Ich lerne Deutsch"
  },
  {
    "question": "Was ist das Verb für 'to eat' auf Deutsch? (What is the verb for 'to eat' in German?)",
    "options": ["trinken", "gehen", "lesen", "essen"],
    "correctAnswer": "essen"
  },
  {
    "question": "Wie nennt man die Farbe 'blau' auf Deutsch? (What is the color 'blue' called in German?)",
    "options": ["grün", "rot", "gelb", "blau"],
    "correctAnswer": "blau"
  },
  {
    "question": "Wie sagt man 'Thank you' auf Deutsch? (How do you say 'Thank you' in German?)",
    "options": [
      "Bitte",
      "Guten Tag",
      "Entschuldigung",
      "Danke"
    ],
    "correctAnswer": "Danke"
  },
  {
    "question": "Was ist das deutsche Wort für 'family'? (What is the German word for 'family'?)",
    "options": ["Freunde", "Brüder", "Schule", "Familie"],
    "correctAnswer": "Familie"
  },
  {
    "question": "Wie sagt man 'I like to travel' auf Deutsch? (How do you say 'I like to travel' in German?)",
    "options": [
      "Ich hasse zu reisen",
      "Ich lese gern",
      "Ich schlafe gern",
      "Ich reise gern"
    ],
    "correctAnswer": "Ich reise gern"
  },
  {
    "question": "Welches Wort bedeutet 'yes' auf Deutsch? (Which word means 'yes' in German?)",
    "options": ["ja", "nein", "bitte", "danke"],
    "correctAnswer": "ja"
  },
  {
    "question": "Was ist das deutsche Wort für 'book'? (What is the German word for 'book'?)",
    "options": ["Stift", "Auto", "Haus", "Buch"],
    "correctAnswer": "Buch"
  }
]

;
let score2_g=0;
const DragDropQuiz1 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [draggedOption, setDraggedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (score / questions.length) * 100;

  const toast = useToast();

  useEffect(() => {
    setIsCorrect(null);
    setDraggedOption('');
  }, [currentQuestionIndex]);

  const handleDragStart = (event, option) => {
    event.dataTransfer.setData('text/plain', option);
    setDraggedOption(option);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    const option = event.dataTransfer.getData('text/plain');
    setDraggedOption('');

    const isAnswerCorrect = option === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
      score2_g=score+1;
    }

    const toastMessage = isAnswerCorrect
      ? 'Correct Answer!'
      : `Wrong Answer!`;
    const toastDescription = isAnswerCorrect
      ? 'You choose correct answer!'
      : `The correct answer is: ${currentQuestion.correctAnswer}`;
    toast({
      title: toastMessage,
      description:toastDescription,
      status: isAnswerCorrect ? 'success' : 'error',
      duration: 2000,
      isClosable: true,
      position:'bottom-right'
    });

    setTimeout(() => {
      // Move to the next question automatically
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1000); // Adjust the delay as needed
  };

  useEffect(() => {
    if (isCorrect !== null && isCorrect) {
      // If the answer is correct, clear the dragged option
      setDraggedOption('');
    }
  }, [isCorrect]);

  return (
    <Container maxW="xl" minHeight="100vh">
      <Box p={4} minHeight="100vh">
        <Center>
          <VStack spacing={4} align="stretch">
            <Box
              position="absolute"
              top={4}
              right={4}
              zIndex={1}
              textAlign="center"
            >
              <CircularProgress
                value={progress}
                color="blue.400"
                size="80px"
              >
                <CircularProgressLabel>
                  {`${Math.round(progress)}%`}
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Heading size={'2xl'} textAlign={'center'} color={'blue.600'}>Drag and Drop Quiz</Heading>
            {currentQuestion && (
              <Box p={4} bg="gray.300" borderRadius="md">
                <VStack spacing={4} align="stretch">
                  <Text fontWeight={'semibold'} textColor={'red.500'} fontSize="lg">
                    {currentQuestion.question}
                  </Text>
                  <Box
                    p={2}
                    bg={draggedOption ? 'gray.300' : 'white'}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    minHeight="60px"
                    borderWidth="2px"
                    borderRadius="md"
                    pointerEvents={isCorrect ? 'none' : 'auto'} // Disable interactions on correct answers
                  >
                    {draggedOption ? (
                      <Text>{draggedOption}</Text>
                    ) : (
                      <Text textColor={'GrayText'}>
                        Drag an option here
                      </Text>
                    )}
                  </Box>
                  <VStack spacing={2} mt={4} align="stretch">
                    {currentQuestion.options.map((option, index) => (
                      <Text
                        textShadow={'dark-lg'}
                        key={index}
                        p={2}
                        bg={
                          draggedOption === option
                            ? 'gray.300'
                            : isCorrect
                            ? 'green.100'
                            : 'white'
                        }
                        draggable
                        onDragStart={e => handleDragStart(e, option)}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        color={
                          isCorrect === false &&
                          option === currentQuestion.correctAnswer
                            ? 'red.500'
                            : 'black'
                        }
                      >
                        {option}
                      </Text>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            )}
            <Center>
              <Box mt={4} p={4} bg="green.200" borderRadius="md">
                <Text fontWeight="bold" fontSize="lg" color="green.800">
                  Score: {score}/{questions.length}
                </Text>
              </Box>
            </Center>
          </VStack>
        </Center>
      </Box>
    </Container>
  );
};
export{score2_g}
export default DragDropQuiz1;
