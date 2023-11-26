import {
  Avatar,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
// import ap from '../../Assets/images/founder_pic.png';
const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar
       // src={ap}
        boxSize={['40', '48']}
      />
      <Text fontSize={'2xl'} children="Founder & CEO" opacity={0.7} />
    </VStack>

    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading
        color={'green.500'}
        children="Nishu"
        size={['md', 'xl']}
      />
      <Text
        textAlign={['center', 'left']}
        children={`Hi, I am a Full-Stack developer and tutor.
        Our mission is to provide best quiz providing platform with fast auto-scoring.`}
      />
    </VStack>
  </Stack>
);

const about = () => {
  return (
    <Container maxW={'container.lg'} padding="16" boxShadow={'dark-lg'}>
      <Heading
        color={'blue.600'}
        textTransform={'uppercase'}
        children="About us"
        textAlign={['center', 'left']}
      />
      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems="center">
        <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']} lineHeight={'7'}>
          Welcome to QuizRealm, where language learning becomes an
          exhilarating adventure. Our innovative platform redefines how you
          master foreign languages, offering cutting-edge technology that adapts
          to your style and pace. Whether you're a beginner or aspiring for
          fluency, our expert-curated content, personalized paths, and gamified
          approach ensure an engaging and effective learning journey. Join our
          global community of language enthusiasts, immerse yourself in
          authentic conversations, and explore cultures through communication.
          At QuizRealm, fluency is more than a skill it's a
          transformative experience. Start your linguistic expedition today and
          open doors to a world of possibilities.
        </Text>

        <Text fontSize={'md'} fontWeight={'semibold'} color={'red.600'}>✨"Begin your journey now and embrace the magic of multilingualism."✨</Text>

        {/* <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="green">
            Checkout Our Plans
          </Button>
        </Link> */}
      </Stack>

      <HStack my="4" p={'4'}>
        <FiPhoneCall size={'30px'} />
        <Heading
          size={'sm'}
          color="green.400"
          fontFamily="sans-serif"
          textTransform={'uppercase'}
          children={'Contact us:-  +919XXXXXXXXX '}
        />
      </HStack>
    </Container>
  );
};

export default about;
