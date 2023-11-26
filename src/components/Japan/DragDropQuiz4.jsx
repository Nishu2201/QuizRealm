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
    "question": "What is the Japanese particle 'で' used for in a sentence?",
    "options": [
      "To indicate the subject",
      "To indicate the location or means",
      "To mark the past tense",
      "To show politeness"
    ],
    "correctAnswer": "To indicate the location or means"
  },
  {
    "question": "What is the kanji character for 'mountain'?",
    "options": ["川", "木", "田", "山"],
    "correctAnswer": "山"
  },
  {
    "question": "How do you say 'I will go to Tokyo tomorrow' in Japanese?",
    "options": [
      "私は東京に行っています",
      "私は東京に行くでしょう",
      "私は東京に行きました",
      "私は東京に行くつもりです"
    ],
    "correctAnswer": "私は東京に行くつもりです"
  },
  {
    "question": "Which verb means 'to read' in Japanese?",
    "options": ["書く", "見る", "聞く", "読む"],
    "correctAnswer": "読む"
  },
  {
    "question": "What is the Japanese word for 'family'?",
    "options": ["友達", "兄弟", "家族", "学校"],
    "correctAnswer": "家族"
  },
  {
    "question": "Which phrase means 'excuse me' or 'I'm sorry' when you want to get someone's attention?",
    "options": ["ありがとう", "お願いします", "すみません", "ごめんなさい"],
    "correctAnswer": "すみません"
  },
  {
    "question": "In the sentence '彼は本を読んでいます', what is the verb tense?",
    "options": ["Present", "Past", "Future", "Conditional"],
    "correctAnswer": "Present"
  },
  {
    "question": "Which of the following is the correct way to say 'I like sushi' in Japanese?",
    "options": [
      "私は寿司が好きです",
      "私は寿司が好きではありません",
      "私は寿司が好きじゃない",
      "私は寿司が好きでした"
    ],
    "correctAnswer": "私は寿司が好きです"
  },
  {
    "question": "What does the particle 'も' indicate in a sentence?",
    "options": [
      "A direct object",
      "Inclusion of something or someone else",
      "Past tense",
      "A question"
    ],
    "correctAnswer": "Inclusion of something or someone else"
  },
  {
    "question": "Which of the following is a common New Year's greeting in Japanese?",
    "options": [
      "お疲れ様でした",
      "あけましておめでとうございます",
      "こんにちは",
      "さようなら"
    ],
    "correctAnswer": "あけましておめでとうございます"
  }
]

;
let score2_j=0;
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
      score2_j=score+1;
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
            <Heading textAlign={'center'} size={'2xl'} color={'blue.600'}>Drag and Drop Quiz</Heading>
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
export {score2_j};
export default DragDropQuiz1;
