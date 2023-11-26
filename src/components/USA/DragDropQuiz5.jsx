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
    "question": "What is the correct plural form of 'child'?",
    "options": ["childs", "childes", "children", "child's"],
    "correctAnswer": "children"
  },
  {
    "question": "Identify the verb in the following sentence: 'She is singing a beautiful song.'",
    "options": ["She", "is", "singing", "beautiful"],
    "correctAnswer": "singing"
  },
  {
    "question": "Which of the following is a demonstrative pronoun?",
    "options": ["he", "she", "this", "run"],
    "correctAnswer": "this"
  },
  {
    "question": "What is the past tense of the verb 'eat'?",
    "options": ["eating", "ate", "eaten", "eats"],
    "correctAnswer": "ate"
  },
  {
    "question": "Which of the following is a preposition?",
    "options": ["jump", "on", "quickly", "with"],
    "correctAnswer": "on"
  },
  {
    "question": "Choose the correct sentence:",
    "options": ["Their going to the park.", "They're going to the park.", "There going to the park.", "Theres going to the park."],
    "correctAnswer": "They're going to the park."
  },
  {
    "question": "What is the comparative form of the adjective 'good'?",
    "options": ["well", "gooder", "better", "best"],
    "correctAnswer": "better"
  },
  {
    "question": "Which of the following is a conjunction?",
    "options": ["quickly", "and", "table", "blue"],
    "correctAnswer": "and"
  },
  {
    "question": "Identify the direct object in the sentence: 'She baked a delicious cake.'",
    "options": ["She", "baked", "a", "delicious cake"],
    "correctAnswer": "delicious cake"
  },
  {
    "question": "What is the correct order of adjectives in English?",
    "options": ["Size, color, origin, material, purpose", "Material, size, purpose, color, origin", "Color, size, material, origin, purpose", "Origin, size, material, purpose, color"],
    "correctAnswer": "Size, color, origin, material, purpose"
  }
]
;
let score2_u=0;
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
      score2_u=score+1;
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
            <Heading color={'blue.600'}>Drag and Drop Quiz</Heading>
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
export{score2_u};
export default DragDropQuiz1;
