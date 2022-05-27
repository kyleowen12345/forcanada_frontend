import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PageBaseUrl } from "./utils/url";


import Home from "./pages/Home";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";





export default function AppRoutes() {
    return (
        <>
        
           <BrowserRouter>
           <AuthProvider>
                <Routes>
                   
                    <Route
                       path={PageBaseUrl.Homepage}
                       element={
                        <>
                        {/* <Header/> */}
                        <Home/>
                        {/* <Footer/> */}
                        </>
                       
                      }
                     />

                     <Route
                       path={PageBaseUrl.Auth.Login}
                       element={
                        <>
                        
                        <Login/>

                        
                        </>
                       
                      }
                     />

                      <Route
                       path={PageBaseUrl.Auth.Register}
                       element={
                       <>
                       
                        <Register/>
                        
                       </>
                      }
                     />
                    
                    {/* Protected Routes */}

                    <Route
                       path={PageBaseUrl.Dashboard}
                       element={
                       
                       
                          <Dashboard/>
                  
                      
                       }
                     />
                  
                      
                </Routes>
                </AuthProvider>
           </BrowserRouter>
       
        </>
    )
}