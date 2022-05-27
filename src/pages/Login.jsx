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
  Link,
  Alert,
  AlertIcon,
  Checkbox 
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useAuth } from '../context/auth';



const Login = () => {
  const {login,loginLoad,loginError}=useAuth()
  


  
  const { register, formState: { errors } , handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async({email,password}) => {
    await login(email,password)
    
};

  return (
    <>
     <Helmet title={'Login'}>
      <body id={'login'}></body>
    </Helmet>
      <Flex
    minH={'80vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>

    <Stack 
      spacing={8}
      mx={'auto'}
      minW={['300px','300px','300px','500px']} 
      py={12}
      px={6}>

        {/* Heading */}
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Login</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          This is the last step of the authentication ✌️
        </Text>
      </Stack>

        {/* Form */}
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>

       <form onSubmit={handleSubmit(onSubmit)}> 
          <Stack spacing={4}>

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


            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>

               {/* Error Message */}
               {
                  loginError &&
                  <Alert status='error'>
                    <AlertIcon />
                      {loginError}
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
                        disabled={loginLoad}
                        isLoading={loginLoad}
                        fontWeight="light"
                        _hover={{
                          bg: 'myTeal.50',
                        }}>
                        Sign in
                      </Button>
                </Stack>
                <Stack pt={6}>
                <RouterLink to={'/register'}>
                  <Text align={'center'} color={'myTeal.100'}>
                      No Account? 
                  </Text>
                </RouterLink>
                </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  </Flex>
     
    </>
    
  )
}

export default Login