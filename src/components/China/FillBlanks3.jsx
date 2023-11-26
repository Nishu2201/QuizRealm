import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

const questions = [
  {
    "question": "In Chinese, the word for 'hello' is '___1___. Please provide the Pinyin transliteration.'",
    "answers": ["ni hao"]
  },
  {
    "question": "To say 'thank you' in Chinese, you can say '___1___. Please provide the Pinyin transliteration.'",
    "answers": ["xie xie"]
  },
  {
    "question": "In Chinese, '___1___' means 'yes,' and '___2___' means 'no.' Please provide the Pinyin transliterations.",
    "answers": ["shi", "bu shi"]
  },
  {
    "question": "To ask 'What is your name?' in Chinese, you can say 'Ni jiao shenme mingzi?' Please provide the Pinyin transliteration for '___1___.",
    "answers": ["mingzi"]
  },
  {
    "question": "The Chinese writing system consists of characters called '___1___. Please provide the Pinyin transliteration.'",
    "answers": ["Hanzi"]
  },
  {
    "question": "In Chinese, '___1___' means 'I love you.' Please provide the Pinyin transliteration.'",
    "answers": ["wo ai ni"]
  },
  {
    "question": "To say 'goodbye' in Chinese, you can say 'zaijian' or '___1___. Please provide the Pinyin transliteration for '___1___.",
    "answers": ["xia ci jian"]
  },
  {
    "question": "In Chinese, '___1___' is used to count objects. Please provide the Pinyin transliteration.'",
    "answers": ["ge"]
  },
  {
    "question": "The Chinese word '___1___' means 'family.' Please provide the Pinyin transliteration.'",
    "answers": ["jiating"]
  },
  {
    "question": "To ask 'How are you?' in Chinese, you can say 'Ni hao ___1___?' Please provide the Pinyin transliteration for '___1___.",
    "answers": ["ma"]
  }
]

;

let score1_c=0;
const FillBlanks5 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const initialUserAnswers = questions.map(question =>
    Array(question.answers.length).fill('')
  );
  const [userAnswers, setUserAnswers] = useState(initialUserAnswers);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const toast = useToast();

  const handleAnswerChange = (event, index) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion][index] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitAnswer = () => {
    setIsButtonDisabled(true);

    const userAnswer = userAnswers[currentQuestion];
    const correctAnswers = questions[currentQuestion].answers;

    const isCorrect = userAnswer.every(
      (answer, index) =>
        answer.toLowerCase() === correctAnswers[index].toLowerCase()
    );

    if (isCorrect) {
      setAnswerStatus('Correct✅');
      setScore(score + 1);
      score1_c=score+1;

      toast({
        title: 'Correct Answer',
        description: 'Well done!',
        status: 'success',
        duration: 2000,
        position: 'bottom-right',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Wrong Answer',
        description: `The correct answer is: ${correctAnswers.join(' & ')}`,
        status: 'error',
        duration: 2500,
        position: 'bottom-right',
        isClosable: true,
      });
    }

    // Automatically move to the next question after a brief delay
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setAnswerStatus('');
        setIsButtonDisabled(false);
      } else {
        setShowScoreboard(true);
      }
    }, 1000);
  };

  const percentageCorrect = (score / questions.length) * 100;
  const renderQuestion = () => {
    if (showScoreboard) {
      return (
        <Center flexDirection="column" alignItems="center" mt={8}>
          <Text color={'yellow.400'} fontSize="2xl" fontWeight="bold">
            Quiz Completed!🎉
          </Text>
          <Box mt={4} bg="green.200" borderRadius="md" p={4} boxShadow="lg">
            <Text
              padding={'4'}
              fontWeight="bold"
              fontSize="lg"
              color="green.800"
            >
              Your score: {score}
            </Text>
          </Box>
        </Center>
      );
    }

    const questionObj = questions[currentQuestion];
    const questionText = questionObj.question;
    const blankIndexes = questionText.match(/___\d+___/g);

    if (!blankIndexes) {
      return <Text color="black">{questionText}</Text>;
    }

    const questionParts = questionText.split(/___\d+___/);
    const answers = userAnswers[currentQuestion];

    return (
      <Center flexDirection="column" alignItems="left" mt={4}>
        <Box
          backgroundColor={'gray.200'}
          p={4} // Adjust padding
          borderRadius="md"
          width="100%" // Make the box take up the full width
          textAlign="left" // Align text to the left
        >
          <Box
            position="absolute"
            top="1rem"
            right="1rem"
            zIndex="999" // Ensure it's above other content
          >
            <CircularProgress
              size="80px"
              value={percentageCorrect}
              color="green.500"
              thickness="10px"
            >
              <CircularProgressLabel>
                {`${Math.round(percentageCorrect)}%`} {/* Show percentage */}
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
          {questionParts.map((part, index) => (
            <React.Fragment key={index}>
              <Text color="black" fontSize={'2xl'} mt={2}>
                {part}
              </Text>
              {blankIndexes[index] && (
                <Input
                  bgColor={'white'} // Change the input background color to white
                  mt={2} // Adjust margin-top
                  value={answers[index] || ''}
                  onChange={event => handleAnswerChange(event, index)}
                  placeholder={`Answer ${index + 1}`}
                  size="md"
                  mx={2}
                  width="100px"
                  textAlign="center"
                  color="red" // Set input text color to red
                  isReadOnly={false}
                />
              )}
            </React.Fragment>
          ))}
          <Button
            colorScheme="red"
            onClick={handleSubmitAnswer}
            mt={4} // Adjust margin-top
            disabled={isButtonDisabled}
          >
            Submit
          </Button>
        </Box>
      </Center>
    );
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Box p={4} flexGrow={1} textAlign="center">
        <Heading color={'blue.600'} size={'2xl'}>
        Fill in the blanks
        </Heading>
        {renderQuestion()}
        {answerStatus && (
          <Text color={'gray.500'} fontWeight={'medium'}>
            {answerStatus}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
export {score1_c};
export default FillBlanks5;
