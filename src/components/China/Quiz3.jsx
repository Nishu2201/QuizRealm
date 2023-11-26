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
let score3_c=0;
function Quiz5() {
  const questions = useMemo(
    () =>[
      {
          "question": "What is the Chinese word for 'yes'?",
          "options": [
              "是的 (Shì de)",
              "不是 (Bù shì)",
              "好的 (Hǎo de)",
              "再见 (Zàijiàn)"
          ],
          "correctAnswer": "是的 (Shì de)"
      },
      {
          "question": "How do you say 'thank you' in Chinese?",
          "options": [
              "对不起 (Duìbuqǐ)",
              "请 (Qǐng)",
              "再见 (Zàijiàn)",
              "谢谢 (Xièxiè)"
          ],
          "correctAnswer": "谢谢 (Xièxiè)"
      },
      {
          "question": "What is the Chinese word for 'book'?",
          "options": [
              "狗 (Gǒu)",
              "电视 (Diànshì)",
              "书 (Shū)",
              "手机 (Shǒujī)"
          ],
          "correctAnswer": "书 (Shū)"
      },
      {
          "question": "How would you say 'good morning' in Chinese?",
          "options": [
              "晚上好 (Wǎnshàng hǎo)",
              "下午好 (Xiàwǔ hǎo)",
              "早上好 (Zǎoshang hǎo)",
              "晚安 (Wǎn'ān)"
          ],
          "correctAnswer": "早上好 (Zǎoshang hǎo)"
      },
      {
          "question": "Which of the following is the correct translation for 'apple' in Chinese?",
          "options": [
              "梨子 (Lízi)",
              "苹果 (Píngguǒ)",
              "葡萄 (Pútáo)",
              "香蕉 (Xiāngjiāo)"
          ],
          "correctAnswer": "苹果 (Píngguǒ)"
      },
      {
          "question": "What is the Chinese word for 'cat'?",
          "options": [
              "狗 (Gǒu)",
              "鱼 (Yú)",
              "猫 (Māo)",
              "鸟 (Niǎo)"
          ],
          "correctAnswer": "猫 (Māo)"
      },
      {
          "question": "What is the Chinese word for 'water'?",
          "options": [
              "米饭 (Mǐfàn)",
              "牛奶 (Niúnǎi)",
              "水 (Shuǐ)",
              "面包 (Miànbāo)"
          ],
          "correctAnswer": "水 (Shuǐ)"
      },
      {
          "question": "Which verb means 'to eat' in Chinese?",
          "options": [
              "喝 (Hē)",
              "睡觉 (Shuìjiào)",
              "吃 (Chī)",
              "跑 (Pǎo)"
          ],
          "correctAnswer": "吃 (Chī)"
      },
      {
          "question": "What does '学生' (xuéshēng) mean in English?",
          "options": [
              "Teacher",
              "Student",
              "Doctor",
              "Engineer"
          ],
          "correctAnswer": "Student"
      },
      {
          "question": "How would you say 'my name is' in Chinese?",
          "options": [
              "我叫什么名字？ (Wǒ jiào shénme míngzì?)",
              "你好 (Nǐ hǎo)",
              "你在哪儿？ (Nǐ zài nǎ'er?)",
              "我叫 (Wǒ jiào)"
          ],
          "correctAnswer": "我叫 (Wǒ jiào)"
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
      score3_c=score+1;
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
            letterSpacing={2}
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
export{score3_c}
export default Quiz5;
