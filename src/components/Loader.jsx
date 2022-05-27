import React from 'react'
import {Flex, Box,Spinner,Text} from '@chakra-ui/react'

const Loader = () => {
    return (
     <Flex flexDirection={"column"} alignItems="center" justifyContent="center" m={5} mt={10}>
       
       <Box bg="white" width="4rem" height="4rem" borderRadius="50%" display="flex" justifyContent="center" alignItems="center" boxShadow="lg">
          <Spinner thickness="4px" speed="0.85s" emptyColor="gray.300" size="xl" color="myTeal.100"  />
          
       </Box>
       <Text mt={5} color="myTeal.100">Checking authentication</Text>
     </Flex>
    )
}

export default Loader