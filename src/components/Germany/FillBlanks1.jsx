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

const questions =[
  {
    "question": "The German word for 'book' is '___1___'.",
    "answers": ["Buch"]
  },
  {
    "question": "'___1___' means 'hello' in German.",
    "answers": ["Hallo"]
  },
  {
    "question": "In German, '___1___' means 'thank you'.",
    "answers": ["Danke"]
  },
  {
    "question": "The German word for 'house' is '___1___'.",
    "answers": ["Haus"]
  },
  {
    "question": "'___1___' is 'goodbye' in German.",
    "answers": ["Auf Wiedersehen"]
  },
  {
    "question": "The German word for 'car' is '___1___'.",
    "answers": ["Auto"]
  },
  {
    "question": "'___1___' means 'yes' in German.",
    "answers": ["Ja"]
  },
  {
    "question": "The German word for 'cat' is '___1___'.",
    "answers": ["Katze"]
  },
  {
    "question": "'___1___' is 'no' in German.",
    "answers": ["Nein"]
  },
  {
    "question": "The German word for 'friend' is '___1___'.",
    "answers": ["Freund"]
  }
];
let score1_g=0;
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
      score1_g=score+1;

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
export{score1_g}
export default FillBlanks5;
