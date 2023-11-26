import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaTelegram, FaYoutube, FaInstagram } from 'react-icons/fa';
const Footer = () => {
  return (
    <Box padding={'4'} bg="black" minH={'10vh'} bottom={'0'} position={'relative'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="@Nishu"
            color={'green.700'}
          />
        </VStack>

        <HStack spacing=
        {['2', '10']}
        justifyContent="center"
        // color={'green.700'}
        fontSize="35"
        >
          <a href="https://youtube.com/" target={'blank'}>
            <FaYoutube color='#b30000' />
          </a>
          <a href="https://telegram.me/" target={'blank'}>
            <FaTelegram color='#0099ff'/>
          </a>
          <a href="https://instagram.com" target={'blank'}>
            <FaInstagram color='#b2004c' />
          </a>

        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
