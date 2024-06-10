import { Box, Flex, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { FaSignal } from "react-icons/fa";
import { exec } from 'child_process';
const MotionBox = motion(Box);

const createNetwork = () => {
exec('nmcli dev wifi hotspot ifname wlan0 ssid DashThing-54598SN password 12345678')
}

const SetupPage = () => {
    const controls = useAnimation();
    const [showContent, setShowContent] = useState(false);



    useEffect(() => {
        const sequence = async () => {
          await controls.start({ opacity: 1, transition: { duration: 1.5 } });
          setTimeout(() => {
            setShowContent(true);
            createNetwork()
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