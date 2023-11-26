import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'green'}
        width="12"
        height={'12'}
        rounded="full"
        zIndex={'overlay'}
        position={'fixed'}
        top="6"
        left={'6'}
      >
        <CgMenuLeftAlt />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(4px'} />
        <DrawerContent>
          <DrawerHeader
            textAlign={'center'}
            borderBottomWidth={'2px'}
            fontSize="3xl"
            fontFamily={'Old-english-font'}
            letterSpacing="widest"
            color={'blue.600'}
          >
            {' '}
            QuizRealm🏅{' '}
          </DrawerHeader>
          <DrawerBody textAlign={'center'}>
            <VStack spacing={'6'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/Country"
                title="Fill in the Blanks"
              />
              <LinkButton
                onClose={onClose}
                url="/Country"
                title="Drag and Drop Quiz"
              />
              <LinkButton
                onClose={onClose}
                url="/Country"
                title="Choose correct answer"
              />
              <LinkButton
                onClose={onClose}
                url="/Translator"
                title="Language Translator"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request for New Quiz"
              />
              <LinkButton onClose={onClose} url="/about" title="About Us" />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
