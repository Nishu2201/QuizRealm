import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Heading,
  Box,
  Button,
  Select,
  Textarea,
  HStack,
  Text,
  VStack,
  ChakraProvider,
} from '@chakra-ui/react';

const Translator = () => {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = () => {
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios
      .post('https://libretranslate.de/translate', params, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data);
        setOutput(res.data.translatedText);
      });
  };

  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then(res => {
        console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  return (
    <ChakraProvider>
      <Box textAlign={'center'} p={'6.5vh'} mx="auto" maxW="800px" minHeight="100vh">
        <Heading as="h1" size="2xl" mb={4} color="blue.600">
          Translate here
        </Heading>
        <VStack spacing={8}>
          <HStack spacing={4} w="100%">
            <Box w="50%">
              <Text fontSize={'2xl'} fontWeight={'semibold'}>
                From :
                <Select onChange={e => setFrom(e.target.value)}>
                  {options.map(opt => (
                    <option key={opt.code} value={opt.code}>
                      {opt.name}
                    </option>
                  ))}
                </Select>
              </Text>
            </Box>
            <Box w="50%">
              <Text fontSize={'2xl'} fontWeight={'semibold'}>
                To :
                <Select onChange={e => setTo(e.target.value)}>
                  {options.map(opt => (
                    <option key={opt.code} value={opt.code}>
                      {opt.name}
                    </option>
                  ))}
                </Select>
              </Text>
            </Box>
          </HStack>
          <HStack spacing={4} w="100%">
            <Textarea
              shadow={'md'}
              flex="1"
              rows="8"
              onInput={e => setInput(e.target.value)}
              placeholder="Enter text to translate..."
            />
            <Textarea flex="1" rows="8" value={output} isReadOnly />
          </HStack>
          <Button colorScheme={'red'} size={'lg'} onClick={translate}>
            Translate
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Translator;
