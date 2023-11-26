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
    "question": "Как сказать 'hello' на русском языке? (How do you say 'hello' in Russian?)",
    "options": [
      "Здравствуйте (Zdravstvuyte)",
      "Спасибо (Spasibo)",
      "До свидания (Do svidaniya)",
      "Извините (Izvinite)"
    ],
    "correctAnswer": "Здравствуйте (Zdravstvuyte)"
  },
  {
    "question": "Какой символ в русском алфавите соответствует букве 'Ж'? (Which character in the Russian alphabet corresponds to the letter 'Ж'?)",
    "options": ["З", "Ж", "Ш", "Ч"],
    "correctAnswer": "Ж"
  },
  {
    "question": "Как сказать 'I am learning Russian' на русском языке? (How do you say 'I am learning Russian' in Russian?)",
    "options": [
      "Я говорю по-русски (Ya govoryu po-russki)",
      "Я изучаю русский (Ya izuchayu russkiy)",
      "Я понимаю по-русски (Ya ponimayu po-russki)",
      "Я не говорю по-русски (Ya ne govoryu po-russki)"
    ],
    "correctAnswer": "Я изучаю русский (Ya izuchayu russkiy)"
  },
  {
    "question": "Какой глагол означает 'читать' на русском языке? (Which verb means 'to read' in Russian?)",
    "options": ["писать (pisat')", "говорить (govorit')", "слушать (slushat')", "читать (chitat')"],
    "correctAnswer": "читать (chitat')"
  },
  {
    "question": "Какой цвет называется 'красный' на русском языке? (What color is called 'red' in Russian?)",
    "options": ["синий (siniy)", "красный (krasnyy)", "зеленый (zelenyy)", "желтый (zheltyy)"],
    "correctAnswer": "красный (krasnyy)"
  },
  {
    "question": "Как сказать 'Thank you' на русском языке? (How do you say 'Thank you' in Russian?)",
    "options": [
      "Пожалуйста (Pozhaluysta)",
      "Спасибо (Spasibo)",
      "Извините (Izvinite)",
      "Пока (Poka)"
    ],
    "correctAnswer": "Спасибо (Spasibo)"
  },
  {
    "question": "Какое слово означает 'семья' на русском языке? (Which word means 'family' in Russian?)",
    "options": ["друзья (druz'ya)", "братья (brat'ya)", "школа (shkola)", "семья (sem'ya)"],
    "correctAnswer": "семья (sem'ya)"
  },
  {
    "question": "Как сказать 'I like to travel' на русском языке? (How do you say 'I like to travel' in Russian?)",
    "options": [
      "Я не люблю путешествовать (Ya ne lyublyu puteshestvovat')",
      "Я люблю готовить (Ya lyublyu gotovit')",
      "Я люблю спать (Ya lyublyu spat')",
      "Я люблю путешествовать (Ya lyublyu puteshestvovat')"
    ],
    "correctAnswer": "Я люблю путешествовать (Ya lyublyu puteshestvovat')"
  },
  {
    "question": "Какой знак используется в русском языке для обозначения вопроса?",
    "options": ["!", "?", "-", "—"],
    "correctAnswer": "?"
  },
  {
    "question": "Как сказать 'no' на русском языке? (How do you say 'no' in Russian?)",
    "options": ["да (da)", "нет (net)", "пожалуйста (pozhaluysta)", "спасибо (spasibo)"],
    "correctAnswer": "нет (net)"
  }
]

;
let score2_r=0;
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
      score2_r=score+1;
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
            <Heading textAlign={'center'} size= {'2xl'} color={'blue.600'}>Drag and Drop Quiz</Heading>
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
export{score2_r};
export default DragDropQuiz1;
