import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ChakraProvider } from '@chakra-ui/react';
import {Global,css} from '@emotion/react'
import '@fontsource/poppins';
import theme from './utils/theme'
import AppRoutes from './routes';

const GlobalStyle = ({ children }) => {
  return (
    <>

      <Global
        styles={css`
          body{
            background-color: white;
            scroll-behavior: smooth;
            font-family:Poppins
          }
        `}
      />
      {children}
    </>
  );
};

function App() {
  return (
   <HelmetProvider>
     <ChakraProvider theme={theme} >
           <GlobalStyle>
              <AppRoutes/>
          </GlobalStyle> 
     </ChakraProvider>
   </HelmetProvider> 
    
  );
}

export default App;
