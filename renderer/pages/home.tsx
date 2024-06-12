import React, { useEffect, useState } from 'react';
import { Button, ChakraProvider, Box, Spinner, Text, Flex } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { isSysSetup } from '../lib/os/sysChecks';
import { useRouter } from 'next/router';
const MotionBox = motion(Box);

const App = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [currentTaskCheck, setCurrentTaskCheck] = useState("Loading...");
  const controls = useAnimation();
  const router = useRouter();

  const setupCheck = async () => {
    setCurrentTaskCheck("Checking Initilization Status...")
    const isSetup = await isSysSetup();
    if (!isSetup) {
      setCurrentTaskCheck("Initilizing Setup...") 
      router.push('/setup')
    }
    setCurrentTaskCheck("Initilization confirmed...")
  }

  const thingOSLoadChecks = async () => {
    // check if system is already setup, if so then continue, else start setup process.
    setupCheck()

  }

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, transition: { duration: 1.5 } });
      setTimeout(() => {
        setShowSpinner(true);
        thingOSLoadChecks()
      }, 1000); // Delay before showing spinner
    };
    sequence();
  }, [controls]);

  return (
    <Box bg={'black'}>
      <MotionBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        {!showSpinner && <img alt='1' src='/thingos.png'/>}
        {showSpinner && (
          <Flex direction="column" justify="space-evenly" h={'100vh'} align={'center'}>
          <Spinner size="xl" color='white'/>
          <Text color={'white'}>
            {currentTaskCheck}
          </Text>
          </Flex>
          )}
      </MotionBox>
    </Box>
  );
};

export default App;
