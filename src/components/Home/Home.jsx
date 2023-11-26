import {
  Heading,
  Stack,
  VStack,
  Text,
  Button,
  Image,
  Box,
  HStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import vg from '../../Assets/images/HomeTest.svg';
import { GiWorld, GiNinjaHead, GiPathDistance, GiSaloon } from 'react-icons/gi';
import { AiFillWechat, AiTwotoneTrophy } from 'react-icons/ai';

const Home = () => {
  const toast = useToast();
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-start']}
            spacing="8"
          >
            <Heading
              children="Wanna learn languages !! "
              size={'2xl'}
              color={'#6c63ff'}
            />
            <Text
              fontFamily={'cursive'}
              textAlign={['center', 'left']}
              children="Learn Foreign Languages in an interactive way with fun✌️"
              fontSize={'large'}
            />
            <Link to="/Country">
              <Button
                onClick={() =>
                  toast({
                    title: 'Enjoy Learning.',
                    description: "We've drafted questions for you.👍",
                    status: 'success',
                    duration: 3000,
                    // isClosable: true,
                  })
                }
                size={'lg'}
                rightIcon={<GiWorld />}
                colorScheme="red"
              >
                Start Learning
              </Button>
            </Link>
          </VStack>
          <Image className="vector-graphics" boxSize={'lg'} src={vg} />
        </Stack>
      </div>

      <Box padding={'4'} bg="blue.100">
        <Heading
          textAlign={'center'}
          fontFamily="body"
          color={'#6c63ff'}
          children="Our Features"
        />
        <HStack
          className="brandsBanner"
          justifyContent={'space-evenly'}
          marginTop="4"
        >
          <AiFillWechat />
          <GiNinjaHead />
          <GiPathDistance />
          <GiSaloon />
          <AiTwotoneTrophy />
        </HStack>
      </Box>
    </section>
  );
};

export default Home;
