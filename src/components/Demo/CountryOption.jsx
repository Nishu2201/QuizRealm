import React from 'react';
import { Box, Heading, Link, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const CountryOption = ({ country }) => {
  return (
    <Box
      as='button'
      p={6}
      borderWidth="1px"
      borderRadius={'md'}
      shadow="dark-lg"
      // Add margin or mb (margin-bottom) here
      mt={'8vh'}
      mb={4} // Adjust the vertical spacing as needed
      ml={8}// Add horizontal padding on hover
      _hover={{
        backgroundColor: 'teal.100', // Change the background color on hover
        // Add horizontal padding on hover
      }}
    >
      {/* maxH="100px" mx="auto" mb={2} */}
      <Image
        src={country.image}
        alt={country.name}
        boxSize={'140'}
        objectFit={'fill'}
        boxShadow={'dark-lg'}
        border={'ButtonShadow'}
        borderRadius={'50%'}
      />
      <Heading as="h2" size="md" mb={2}>
        {country.name}
      </Heading>
      <Link fontWeight={'semibold'} as={RouterLink} to={`/quiz/${country.name}`} color="teal.500">
        Start here
      </Link>
    </Box>
  );
};

export default CountryOption;
