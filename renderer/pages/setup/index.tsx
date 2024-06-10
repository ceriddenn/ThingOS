import { Box, Flex, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { FaSignal } from "react-icons/fa";
import { createSetupNetwork } from '../../lib/os/sysUtil';
import QRCode from 'react-qr-code';
const MotionBox = motion(Box);

const SetupPage = () => {
    const controls = useAnimation();
    const [showContent, setShowContent] = useState(false);
    const [showScanCode, setShowScanCode] = useState(false);

    window.ipc.on('setup_sys_network_connected-user', (connectedUser: boolean) => {
        setShowScanCode(connectedUser)    
      });

    useEffect(() => {
        setInterval(async () => {
            // Check for connected users every 1 second
            window.ipc.send('setup_check_user_connected');
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
           {showScanCode && (
            <MotionBox
            initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
          >
                <QRCode value='http://10.42.0.1:8888/setup/external'/>
            </MotionBox>
          )}
          </Flex>
      </MotionBox>
    </Box>
  )
}

export default SetupPage