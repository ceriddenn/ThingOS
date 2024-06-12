import { Box, Button, Divider, Flex, Input, Select, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { FaSignal } from "react-icons/fa";
import { createSetupNetwork } from '../../lib/os/sysUtil';
import QRCode from 'react-qr-code';
const MotionBox = motion(Box);

const SetupPage = () => {
    const controls = useAnimation();
    const [showContent, setShowContent] = useState(false);

    const [transmission, setTransmission] = useState<string>();
    const [vehicleMake, setVehicleMake] = useState<string>();
    const [vehicleModel, setVehicleModel] = useState<string>();

    const handleExternalSetupCompletion = () => {
      fetch("http://10.42.0.1:3000/s/confirm/external", {
        method: "post",
        body: JSON.stringify({ isCompleted: true })
      })
    }

    useEffect(() => {
        
        const sequence = async () => {
          await controls.start({ opacity: 1, transition: { duration: 1.5 } });
          setTimeout(() => {
            setShowContent(true);
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
        <Flex direction={'column'} alignItems={'center'} textAlign={'center'}>
          <Text color={'white'} fontSize={'4xl'} fontWeight={'semibold'}>
            Great, We're Connected!
          </Text>
          <Text fontSize={'lg'} color={'grey'}>Fill out the fields below and then continue on your Dash device.</Text>
          {showContent && (
            <MotionBox
            initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
          >
            <Flex mt={6} direction={'column'} gap={5}>
            <Input variant='outline' placeholder='Vehicle Make' borderColor={'#ff8200'} textColor={'white'} onChange={event => setVehicleMake(event.target.value)}/>
            <Input variant='outline' placeholder='Vehicle Model' borderColor={'#ff8200'} textColor={'white'} onChange={event => setVehicleModel(event.target.value)}/>
            <Divider my={2}/>
            <Select placeholder='Transmission' color={'white'} _selection={{ bgColor: 'black'}} title='Transmission' _selected={{ bgColor: "black"}} onChange={event => setTransmission(event.target.value)}>
                <option value='AUTOMATIC' style={{ backgroundColor: 'black' }}>AUTOMATIC</option>
                <option value='MANUAL' style={{ backgroundColor: 'black' }}>MANUAL</option>
            </Select>
            <Button variant={'outline'} textColor={'white'} _focus={{ textColor: "black"}} onClick={() => handleExternalSetupCompletion()}>Save and Continue</Button>
            </Flex>
            </MotionBox>
          )}
          </Flex>
      </MotionBox>
    </Box>
  )
}

export default SetupPage