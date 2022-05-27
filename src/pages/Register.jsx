import React from 'react'
import { useForm } from 'react-hook-form';
import { Link as RouterLink  } from "react-router-dom";
import { Helmet } from "react-helmet-async";


import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon, 
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


import { useAuth } from '../context/auth';






const Register = () => {
  const {signup,registerLoad,registerError} = useAuth()
 

  

  

  const { register, formState: { errors } , handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async({name,email,password}) => {
    await signup(name,email,password)
    
};

  return (
    <>
    <Helmet title={'Register'}>
      <body id={'register'}></body>
    </Helmet>
          <Flex
          minH={'80vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
          >
          <Stack 
             spacing={8} 
             mx={'auto'} 
             minW={['300px','300px','300px','500px']} 
             py={12} 
             px={6}
          >
            {/* Heading */}
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                      Register
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                      Remember your registered account then login ✌️
                    </Text>
                </Stack>
                {/* Form */}
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >

                <form onSubmit={handleSubmit(onSubmit)}> 
                    <Stack spacing={4}>
                    
                          {/*  Name */}
                          <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" 
                              {...register('name', {
                                required: 'this is required',
                                minLength: {
                                  value: 5,
                                  message: 'Min length is 5',
                                },
                              })}
                              isInvalid={errors.name && errors.name.message}
                              errorBorderColor="crimson"
                            />
                            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.name && errors.name.message}</Text>
                          </FormControl>
                        
         
                          
                        
                        {/* Email */}
                      <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email"
                            {...register('email', {
                            required: 'this is required',
                            pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email address',
                            },
                            })}
                            isInvalid={errors.email && errors.email.message}
                            errorBorderColor="crimson"
                        />
                        <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.email && errors.email.message}</Text>
                      </FormControl>

                      {/* Password */}
                      <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input type={showPassword ? 'text' : 'password'}  
                              {...register('password', {
                                required: 'this is required',
                                minLength: {
                                  value: 5,
                                  message: 'Min length is 5',
                                },
                              })}
                              isInvalid={errors.password && errors.password.message}
                              errorBorderColor="crimson"
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }>
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.password && errors.password.message}</Text>
                      </FormControl>

                      {/* Error Message */}
                      {
                        registerError &&
                        <Alert status='error'>
                          <AlertIcon />
                            {registerError}
                        </Alert>
                      }

                      {/* Button */}
                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Submitting"
                          size="lg"
                          bg={'myTeal.100'}
                          color={'white'}
                          type="submit" 
                          disabled={registerLoad}
                          isLoading={registerLoad}
                          fontWeight="light"
                          _hover={{
                            bg: 'myTeal.50',
                          }}>
                          Sign up
                        </Button>
                      </Stack>
                      <Stack pt={6}>
                      <RouterLink to={'/login'}>
                        <Text align={'center'} color={'myTeal.100'}>
                            Already have an account?
                        </Text>
                      </RouterLink> 
                      </Stack>
                    </Stack>
                </form> 

            </Box>
          </Stack>
        </Flex>
    </>
       
      
    
  )
}

export default Register