import React from 'react'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink  } from "react-router-dom";


const Home = () => {
  return (
    <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
           Welcome to the  app <br />
            <Text as={'span'} color={'myTeal.100'}>
             Ormhel and Cody
            </Text>
          </Heading>
          <Text color={'gray.500'}>
             Check the work that I made, click get started to go to the register page then login, after that you will be redirected to dashboard where only authenticated users are allowed
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
              <RouterLink to={'/register'}>
                <Button
                  colorScheme={'green'}
                  bg={'green.400'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'green.500',
                  }}>
                  Get Started
                </Button>
            </RouterLink>
            <RouterLink to={'/dashboard'}>
              <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                This link will navigate you to the dashboard but if you're not authenticated you will be redirected to login
              </Button>
            </RouterLink>
            
          </Stack>
        </Stack>
      </Container>
  )
}

export default Home


