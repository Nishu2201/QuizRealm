import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {FaHome} from 'react-icons/fa';

const NotFound = () => {
  return (
    <Container h="90vh">
      <VStack justifyContent={'center'} h="full" spacing={'3'}>
        <Heading textTransform={'uppercase'}>Lost your way..!!?💀</Heading>
        <Link to="/">
          <Button variant={'ghost'} rightIcon={<FaHome/>}>Go to Home</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
