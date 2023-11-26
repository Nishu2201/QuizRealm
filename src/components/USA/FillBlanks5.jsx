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
    question:
      "In English, a ___1___ is a word that replaces a noun. For example, 'He' and 'She' are ___2___ pronouns.",
    answers: ['pronoun', 'personal'],
  },
  {
    question:
      "The past tense of the verb 'to go' is '___1___.' Yesterday, I ___2___ to the park.",
    answers: ['went', 'went'],
  },
  {
    question:
      "An ___1___ is a word that describes a noun. In the sentence 'The ___2___ cat climbed the tree,' 'brown' is an adjective.",
    answers: ['adjective', 'brown'],
  },
  {
    question:
      "A ___1___ is a group of words that includes a subject and a verb. In the sentence 'She ___2___ to the store,' 'She goes' is an example of a simple sentence.",
    answers: ['sentence', 'goes'],
  },
  {
    question:
      "To form a negative sentence in the present tense, you often add '___1___' before the verb. For example, 'I ___2___ not hungry.'",
    answers: ['not', 'am'],
  },
  {
    question:
      "In a question, the ___1___ of the subject and the verb is reversed. For example, 'You are happy' becomes '___2___ you happy?'",
    answers: ['order', 'Are'],
  },
  {
    question:
      "A ___1___ is a word that joins two words or phrases together. In the sentence 'She is smart ___1___ funny,' 'and' is a ___2___.",
    answers: ['conjunction', 'conjunction'],
  },
  {
    question:
      "The ___1___ tense is used to talk about actions that will happen in the future. 'I ___2___ go to the party tomorrow.'",
    answers: ['future', 'will'],
  },
  {
    question:
      "An ___1___ is a word that shows the relationship between two words. In the phrase 'The book is ___2___ the table,' 'on' is a preposition.",
    answers: ['preposition', 'on'],
  },
  {
    question:
      "A ___1___ is a word used to express strong feeling or emotion. 'Wow!' is an example of an ___2___.",
    answers: ['interjection', 'interjection'],
  },
];
let score1_u=0;
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
      score1_u=score+1;

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
export{score1_u};
export default FillBlanks5;
