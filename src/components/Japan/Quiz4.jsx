import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Text,
  useToast,
  CircularProgress,
  CircularProgressLabel, // Import useToast from Chakra UI
} from '@chakra-ui/react';
let score3_j=0;
function Quiz5() {
  const questions = useMemo(
    () =>[
      {
          "question": "What is the Japanese word for 'computer'?",
          "options": [
              "でんき (Denki)",
              "けいたい (Keitai)",
              "コンピュータ (Konpyūta)",
              "ねこ (Neko)"
          ],
          "correctAnswer": "コンピュータ (Konpyūta)"
      },
      {
          "question": "How do you say 'I will go to Tokyo tomorrow' in Japanese?",
          "options": [
              "わたしはきょうとうにいきます (Watashi wa Kyoutou ni ikimasu)",
              "あなたはどこにいますか？ (Anata wa doko ni imasuka?)",
              "にほんごをはなしますか？ (Nihongo o hanashimasu ka?)",
              "あしたわたしはとうきょうにいきます (Ashita watashi wa Tokyo ni ikimasu)"
          ],
          "correctAnswer": "あしたわたしはとうきょうにいきます (Ashita watashi wa Tokyo ni ikimasu)"
      },
      {
          "question": "What is the Japanese word for 'friend'?",
          "options": [
              "せんせい (Sensei)",
              "ともだち (Tomodachi)",
              "くるま (Kuruma)",
              "おかね (Okane)"
          ],
          "correctAnswer": "ともだち (Tomodachi)"
      },
      {
          "question": "Which of the following means 'beautiful' in Japanese?",
          "options": [
              "かっこいい (Kakkoii)",
              "うれしい (Ureshii)",
              "むずかしい (Muzukashii)",
              "きれい (Kirei)"
          ],
          "correctAnswer": "きれい (Kirei)"
      },
      {
          "question": "What is the Japanese word for 'to travel'?",
          "options": [
              "あそぶ (Asobu)",
              "のむ (Nomu)",
              "りょこうする (Ryokou suru)",
              "かう (Kau)"
          ],
          "correctAnswer": "りょこうする (Ryokou suru)"
      },
      {
          "question": "How would you say 'Please wait a moment' in Japanese?",
          "options": [
              "いってきます (Ittekimasu)",
              "ちょっとまってください (Chotto matte kudasai)",
              "おねがいします (Onegaishimasu)",
              "ごめんなさい (Gomen nasai)"
          ],
          "correctAnswer": "ちょっとまってください (Chotto matte kudasai)"
      },
      {
          "question": "What does '漫画' (manga) mean in English?",
          "options": [
              "Movie",
              "Book",
              "Manga",
              "Food"
          ],
          "correctAnswer": "Manga"
      },
      {
          "question": "Which verb means 'to study' in Japanese?",
          "options": [
              "たべる (Taberu)",
              "しごとする (Shigoto suru)",
              "べんきょうする (Benkyou suru)",
              "きく (Kiku)"
          ],
          "correctAnswer": "べんきょうする (Benkyou suru)"
      },
      {
          "question": "What is the Japanese word for 'restaurant'?",
          "options": [
              "やさい (Yasai)",
              "いえ (Ie)",
              "えき (Eki)",
              "レストラン (Resutoran)"
          ],
          "correctAnswer": "レストラン (Resutoran)"
      },
      {
          "question": "How would you say 'I have been to Kyoto' in Japanese?",
          "options": [
              "わたしはきょうとにいる (Watashi wa Kyoto ni iru)",
              "わたしはきょうとにいきました (Watashi wa Kyoto ni ikimashita)",
              "きょうとはすごいです (Kyouto wa sugoi desu)",
              "いただきます (Itadakimasu)"
          ],
          "correctAnswer": "わたしはきょうとにいきました (Watashi wa Kyoto ni ikimashita)"
      }
  ]
  
  ,
    []
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const toast = useToast(); 

  const handleOptionChange = value => {
    setSelectedOption(value);
  };

  const handleNextQuestion = useCallback(() => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      score3_j=score+1;
    }

    setSelectedOption('');

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScoreboard(true);
    }
    toast({
      title:
        selectedOption === questions[currentQuestion].correctAnswer
          ? 'Correct!'
          : 'Wrong!',
      description:
        selectedOption === questions[currentQuestion].correctAnswer
          ? 'You chose the correct answer.'
          : `The correct answer is:- ${questions[currentQuestion].correctAnswer}`,
      status:
        selectedOption === questions[currentQuestion].correctAnswer
          ? 'success'
          : 'error',
      duration: 2500, 
      isClosable: true,
      position:'bottom-right',
    });
  }, [selectedOption, currentQuestion, score, questions, toast]);

  useEffect(() => {
    if (selectedOption !== '') {
      handleNextQuestion();
    }
  }, [selectedOption, handleNextQuestion]);
  const percentageCorrect = (score / questions.length) * 100;
  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Flex
          align="center"
          justify="center"
          flex="1"
          flexDirection="column"
          px={4}
          pt={8}
        ><Box
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
          <Heading
            as="h1"
            mb={'10vh'}
            textAlign="center"
            color={'blue.600'}
            size={'2xl'}
          >
           Choose Correct Option
          </Heading>
          <Text fontSize={'lg'} fontWeight={'semibold'}>
            Choose the correct option:
          </Text>
          <Box
            bgColor="gray.200"
            boxShadow="dark-lg"
            rounded="lg"
            width="100%"
            maxWidth="600px"
            p={4}
            borderRadius="md"
            bg="gray.100"
            mb={'45vh'}
            mt={42}
          >
            {showScoreboard ? (
              <Box textAlign="center">
                <Heading as="h2" size="lg" mb={8} color={'GrayText'}>
                  Quiz Completed!🎉
                </Heading>
                <Text fontSize="xl" fontWeight="bold" color={'green.500'}>
                  Your Score: {score} / {questions.length}
                </Text>
              </Box>
            ) : (
              <Box bgColor={'gray.100'} height={'50vh'}>
                <Heading
                  color={'GrayText'}
                  as="h2"
                  size="xl"
                  mb={4}
                  fontWeight="bold"
                >
                  Question {currentQuestion + 1}/{questions.length}
                </Heading>
                <Text color={'gray.700'} fontSize="lg" fontWeight="bold" mb={4}>
                  {questions[currentQuestion].question}
                </Text>
                <RadioGroup
                  size="lg"
                  textColor="gray.700"
                  letterSpacing={1.5}
                  onChange={handleOptionChange}
                  value={selectedOption}
                  colorScheme="green"
                  style={{ flexDirection: 'column' }}
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Radio
                        value={option}
                        fontWeight="bold"
                        colorScheme="green"
                        mb={2}
                      >
                        {option}
                      </Radio>
                    </div>
                  ))}
                </RadioGroup>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
export{score3_j}
export default Quiz5;
