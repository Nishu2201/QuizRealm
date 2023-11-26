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
    "question": "怎么说 'hello' 在中文？ (How do you say 'hello' in Chinese?)",
    "options": [
      "你好 (Nǐ hǎo)",
      "谢谢 (Xièxiè)",
      "再见 (Zàijiàn)",
      "对不起 (Duìbuqǐ)"
    ],
    "correctAnswer": "你好 (Nǐ hǎo)"
  },
  {
    "question": "下面哪个是中文的数字 '五'？ (Which one is the Chinese numeral 'five'?)",
    "options": ["一", "三", "四", "五"],
    "correctAnswer": "五"
  },
  {
    "question": "怎么说 'I want to eat dumplings' 在中文？ (How do you say 'I want to eat dumplings' in Chinese?)",
    "options": [
      "我爱吃饺子 (Wǒ ài chī jiǎozi)",
      "我去吃面条 (Wǒ qù chī miàntiáo)",
      "我不喜欢米饭 (Wǒ bù xǐhuān mǐfàn)",
      "我想吃饺子 (Wǒ xiǎng chī jiǎozi)"
    ],
    "correctAnswer": "我想吃饺子 (Wǒ xiǎng chī jiǎozi)"
  },
  {
    "question": "以下哪个词意味着 '大'？ (Which word means 'big'?)",
    "options": ["小 (Xiǎo)", "多 (Duō)", "长 (Cháng)", "大 (Dà)"],
    "correctAnswer": "大 (Dà)"
  },
  {
    "question": "怎么说 'I am studying Chinese' 在中文？ (How do you say 'I am studying Chinese' in Chinese?)",
    "options": [
      "我去看电影 (Wǒ qù kàn diànyǐng)",
      "我正在学英语 (Wǒ zhèngzài xué Yīngyǔ)",
      "我正在学中文 (Wǒ zhèngzài xué Zhōngwén)",
      "我喜欢吃中餐 (Wǒ xǐhuān chī Zhōngcān)"
    ],
    "correctAnswer": "我正在学中文 (Wǒ zhèngzài xué Zhōngwén)"
  },
  {
    "question": "以下哪个是中文的颜色 '绿色'？ (Which one is the Chinese color 'green'?)",
    "options": ["红色 (Hóngsè)", "蓝色 (Lán sè)", "黄色 (Huángsè)", "绿色 (Lǜsè)"],
    "correctAnswer": "绿色 (Lǜsè)"
  },
  {
    "question": "怎么说 'Thank you' 在中文？ (How do you say 'Thank you' in Chinese?)",
    "options": [
      "再见 (Zàijiàn)",
      "对不起 (Duìbuqǐ)",
      "谢谢 (Xièxiè)",
      "不客气 (Bù kèqì)"
    ],
    "correctAnswer": "谢谢 (Xièxiè)"
  },
  {
    "question": "以下哪个词是中文中的 '家庭'？ (Which word means 'family' in Chinese?)",
    "options": ["朋友 (Péngyǒu)", "兄弟 (Xiōngdì)", "学校 (Xuéxiào)", "家庭 (Jiātíng)"],
    "correctAnswer": "家庭 (Jiātíng)"
  },
  {
    "question": "怎么说 'I love to travel' 在中文？ (How do you say 'I love to travel' in Chinese?)",
    "options": [
      "我喜欢读书 (Wǒ xǐhuān dúshū)",
      "我喜欢旅行 (Wǒ xǐhuān lǚxíng)",
      "我喜欢运动 (Wǒ xǐhuān yùndòng)",
      "我喜欢做饭 (Wǒ xǐhuān zuò fàn)"
    ],
    "correctAnswer": "我喜欢旅行 (Wǒ xǐhuān lǚxíng)"
  },
  {
    "question": "下面哪个是 '是' 的反义词？ (Which one is the antonym of '是'?)",
    "options": ["有 (Yǒu)", "不 (Bù)", "和 (Hé)", "在 (Zài)"],
    "correctAnswer": "不 (Bù)"
  }
]

;

let score2_c=0;
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
      score2_c=score+1;
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
            <Heading  size ={'2xl'}textAlign={'center'} color={'blue.600'}>Drag and Drop Quiz</Heading>
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
export {score2_c};
export default DragDropQuiz1;
