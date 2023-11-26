import React from 'react';
import { Flex, Box, Heading, Image, Button,CircularProgress,CircularProgressLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import dd from '../../Assets/images/dragdrop.svg';
import fb from '../../Assets/images/fillblanks.svg';
import co from '../../Assets/images/chooseone.svg';
import lt from '../../Assets/images/languageconvert.svg';

import { score1_g } from './FillBlanks1';
import{score2_g} from './DragDropQuiz1.jsx';
import { score3_g } from './Quiz1';

const Category1 = () => {
  const history = useNavigate();

  const handleOptionClick = (option) => {
    let route = '';

    switch (option) {
        case 'fill-in-the-blanks':
          route = '/germany/fill-blanks';
          break;
        case 'drag-and-drop':
          route = '/germany/drag-drop-quiz';
          break;
        case 'choose-correct-answer':
          route = '/germany/quiz';
          break;
        case 'language-translator':
          route = '/translator';
          break;
        default:
          // Handle default case or error
          break;
      }
    if (route) {
      history(route);
    }
  };

  const totalQuestions=30;
  const totalScore=totalQuestions > 0 ? ((score1_g + score2_g + score3_g) / totalQuestions) * 100 : 0;
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Box mt="4" textAlign="center">      <Box
              position="absolute"
              top={4}
              right={4}
              zIndex={1}
              textAlign="center"
            >
              <CircularProgress
                value={totalScore}
                color="blue.400"
                size="80px"
              >
                <CircularProgressLabel>
                  {`${Math.round(totalScore)}%`}
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
        <Heading as="h1" mb="25vh" color="blue.600" size={'2xl'}>
        Choose one option
        </Heading>
      </Box>
      <Flex justify="center" align="center" gap="4">
        {/* Option 1 */}
        <Box bgColor='gray.100' p="4" boxShadow="dark-lg" rounded="lg" width="300px" height={'50vh'} mb={'30vh'}>
          <Image src={fb} alt="Option 1" />
          <Heading as="h2" mt="16" color={'blackAlpha.800'} fontSize="xl" textAlign="center">
          Fill in the blanks
          </Heading>
          <Button shadow={'dark-lg'} colorScheme={'red'} onClick={() => handleOptionClick('fill-in-the-blanks')} mt="2" w="100%">
          Take Test
          </Button>
        </Box>

        {/* Option 2 */}
        <Box bgColor="gray.100" p="4" boxShadow="dark-lg" rounded="lg" width="300px" height={'50vh'} mb={'30vh'}>
          <Image src={dd} alt="Option 2" />
          <Heading as="h2" mt="16" color={'blackAlpha.800'} fontSize="xl" textAlign="center">
          Drag and Drop
          </Heading>
          <Button shadow={'dark-lg'} colorScheme={'red'} onClick={() => handleOptionClick('drag-and-drop')} mt="2" w="100%">
          Take Test 
          </Button>
        </Box>

        {/* Option 3 */}
        <Box bgColor="gray.100" p="4" boxShadow="dark-lg" rounded="lg" width="300px" height={'50vh'} mb={'30vh'}>
          <Image src={co} alt="Option 3" />
          <Heading as="h2" mt="4" color={'blackAlpha.800'} fontSize="xl" textAlign="center">
          Choose correct answer
          </Heading>
          <Button shadow={'dark-lg'} colorScheme={'red'} onClick={() => handleOptionClick('choose-correct-answer')} mt="2" w="100%">
          Take Test
          </Button>
        </Box>

        {/* Option 4 */}
        <Box bgColor="gray.100" p="4" boxShadow="dark-lg" rounded="lg" width="300px" height={'50vh'} mb={'30vh'}>
          <Image src={lt} alt="Option 4" />
          <Heading as="h2" mt="10" color={'blackAlpha.800'} fontSize="xl" textAlign="center">
         Language Translator
          </Heading>
          <Button shadow={'dark-lg'} colorScheme={'red'} onClick={() => handleOptionClick('language-translator')} mt="2" w="100%">
          Take Test
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Category1;
