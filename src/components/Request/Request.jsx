import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';


const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const toast= useToast();
  const sendEmail = e => {
    e.preventDefault();

    // Replace these with your actual EmailJS credentials
    const serviceID = 'service_nvz9pv6';
    const templateID = 'template_pvdxsgh';
    const userID = 'xvM_r4chTT9fzI8Ep';

    emailjs
      .sendForm(serviceID, templateID, e.target, userID)
      .then(result => {
   

          toast({
            title: 'Application submitted!',
            description: "Thanks for submitting your application. Our team will get back to you soon👍",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        
        // You can clear the form inputs here if needed
        setName('');
        setEmail('');
        setCourse('');
      })
      .catch(error => {
        toast({
          title: 'Failed to send message',
          description: "Please try after sometime.👍",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })

      });
  };

  return (
    <Container h="92vh">
      <VStack h="full" justifyContent={'center'} spacing="13">
        <Heading
          color={'blue.600'}
          textTransform={'uppercase'}
          children="Request new topic"
          alignContent={'center'}
        />
        <form style={{ width: '100%' }} onSubmit={sendEmail}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              type={'text'}
              focusBorderColor="#6c63ff"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="#6c63ff"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Enter Language name and description of topic"
              focusBorderColor="#6c63ff"
            />
          </Box>

          <Button
            my={'4'}
            leftIcon={<RiSendPlaneFill />}
            colorScheme={'red'}
            type="submit"
          >
            Send Message
          </Button>

          <Box my="4">
            See available Quizes!{' '}
            <Link to="/Country">
              <Button colorScheme={'red'} variant="link">
                Click here
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
