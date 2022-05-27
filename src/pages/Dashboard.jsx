import React from 'react'
import { useAuth } from '../context/auth'

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Loader from '../components/Loader'

const Dashboard = () => {
  const {currentUser,loadingAuth,signOut}=useAuth()
  
  return loadingAuth ? <Loader/>
     :
    <Box textAlign="center" py={10} px={6}>  
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
          Welcome - {currentUser.name}
      </Heading>
      <Text color={'gray.500'}>
         I you are reading this then you are authenticated 
      </Text>
       <Button
       onClick={()=>signOut()}
       >Logout</Button>

    </Box>
  
}

export default Dashboard



