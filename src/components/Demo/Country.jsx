import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import CountryOption from './CountryOption';
import Russia from '../../Assets/images/Russia flag.jpeg';
import Germany from '../../Assets/images/GermanyFlag.jpg';
import China from '../../Assets/images/ChinaFlag.jpg';
import Japan from '../../Assets/images/JapanFlag.jpg';
import USA from '../../Assets/images/USAFlag.jpg';

const Country = () => {
  const countries = [
    { name: 'Germany', image: Germany },
    { name: 'Russia', image: Russia },
    { name: 'China', image: China },
    { name: 'Japan', image: Japan },
    { name: 'USA', image: USA },
  ];

  return (
    <Box textAlign="center" p={'10vh'} minHeight="100vh">
      <Heading as="h1" size="2xl" mb={4} color="blue.600">
        Welcome to QuizRealm🏅
      </Heading>
      <Text fontSize="2xl">Select a country to start the quiz:</Text>
      {countries.map(country => (
        <CountryOption key={country.name} country={country} />
      ))}
    </Box>
  );
};

export default Country;
