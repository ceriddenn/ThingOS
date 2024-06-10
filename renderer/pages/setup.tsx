import { Box, Flex, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { FaSignal } from "react-icons/fa";
import { createSetupNetwork } from '../lib/os/sysUtil';
const MotionBox = motion(Box);

const SetupPage = () => {
    const controls = useAnimation();
    const [showContent, setShowContent] = useState(false);

    window.ipc.on('connected-users', (event, connectedUsers) => {
        // Update UI with connected users information
        console.log('Connected users:', connectedUsers);
        // You can update the UI as per your requirement here
      });

    useEffect(() => {
        setInterval(async () => {
            // Check for connected users every 1 second
            window.ipc.send('check-users');
          }, 1000);
        const sequence = async () => {
          await controls.start({ opacity: 1, transition: { duration: 1.5 } });
          setTimeout(() => {
            setShowContent(true);
            createSetupNetwork();
          }, 1000); // Delay before showing spinner
        };
        sequence();
      }, [controls]);

  return (
    <Box bg={'#000000'}>
      <MotionBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <Flex direction={'column'} alignItems={'center'}>
          <Text color={'white'} fontSize={'4xl'} fontWeight={'semibold'}>
            Let's Get Setup
          </Text>
          <Text fontSize={'lg'} color={'grey'}>Connect to the created network below on a mobile device.</Text>
          {showContent && (
            <MotionBox
            initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
          >
            <Flex borderRadius={12} bg={'#13161E'} px={2} py={2} alignItems={'center'} mt={6} direction={'row'} gap={3}>
                <Text color={'#ff8200'}>DashThing-8357SN</Text>
                <FaSignal color='green'/>
            </Flex>
            </MotionBox>
          )}
          </Flex>
      </MotionBox>
    </Box>
  )
}

export default SetupPage