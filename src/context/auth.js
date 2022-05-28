import React,{useState,useContext,createContext, useEffect, useCallback} from 'react'
import { useNavigate,useLocation  } from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie';



const authContext=createContext()


export function AuthProvider({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth(){
    const navigate = useNavigate();
    const location = useLocation()

    const [loginLoad,setLoginLoad]=useState(false)
    const [loginError,setLoginError]=useState(false)

    const [registerLoad,setRegisterLoad]=useState(false)
    const [registerError,setRegisterError]=useState(false)

    const [currentUser,setCurrentUser] = useState({})

    const [loadingAuth,setLoadingAuth] = useState(false)
    const [ authenticated, setAuthentication ] = useState(false);

    
    const userCookie=Cookies.get('forcanada')
 
   

    
    const signup=async (name,email,password)=>{
       try {
        setRegisterLoad(true)
        const {data}= await axios.post(
          `${process.env.REACT_APP_API_KEY}/register`,
          {
            name:name,
            email:email,
            password:password
          }
        )
         if(data) {
           navigate('/login')
           setRegisterLoad(false)
         }
        
         
       } catch (error) {
         setRegisterLoad(false)
         setRegisterError(error.response.data.error)
       }
           
    }
    const login=async (email,password)=>{
 
           try {
            setLoginLoad(true)
            const {data}= await axios.post(
              `${process.env.REACT_APP_API_KEY}/login`,
              {
                email:email,
                password:password
              }
            )

            if(data) {
              
              Cookies.set('forcanada',data?.token,{expires:1,secure:true})
              navigate('/dashboard')
              setLoginLoad(false)
            }
           
           } catch (error) {
            setLoginLoad(false)
            
            setLoginError(error.response.data.error)
           }
    }

    const signOut=useCallback (()=>{
      fetch(`${process.env.REACT_APP_API_KEY}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userCookie}`
        },
    })
      .then(response => response.json())
      .then((res) => {
          Cookies.remove('forcanada')
          navigate('/login')
          setAuthentication(false)
      })
      .catch(e => {
        Cookies.remove('forcanada')
        navigate('/login')
      });
    },[navigate,userCookie])
    
    const validUser =useCallback(()=>{
      setLoadingAuth(true)
      fetch(`${process.env.REACT_APP_API_KEY}/protected`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userCookie}`,
            'Access-Control-Allow-Origin': process.env.REACT_APP_HEADER_KEY
        },
    })
      .then(response => response.json())
      .then((res) => {
          if(res.error){
            signOut()
          }else{
            setAuthentication(true)
            setCurrentUser(res.user)
            setLoadingAuth(false)
          }
          
      })
      .catch(e => {
        signOut()
      });
    },[userCookie,signOut]) 
      
      
       
       
    

    useEffect(() => {
        if(location.pathname === '/dashboard'){
           validUser()
        }
        
    },[validUser,location.pathname])

   
    return {
    signup,
    login,
    signOut,
    validUser,
    loginLoad,
    setLoginLoad,
    loginError,
    setLoginError,
    registerLoad,
    setRegisterLoad,
    registerError,
    setRegisterError,
    currentUser,
    setCurrentUser,
    loadingAuth,
    setLoadingAuth,
    authenticated,
    setAuthentication
    }
}
