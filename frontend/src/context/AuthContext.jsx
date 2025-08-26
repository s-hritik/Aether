import React, { createContext, useContext, useState , useEffect, useCallback } from 'react'
import {api} from '../lib/api.js'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // this function checks if a user is already logged in when the app loads

    useEffect(() => {
        const checkUserStatus = async() => {
            try{
                const {data} = await api.auth.getProfile();
                setUser(data.data)
            }
            catch(error){
                console.log("No user is logged in ");
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }
        checkUserStatus();
    } , []);

    const signUp = useCallback( async (name ,email, password) => {
        await api.auth.register({name , email ,password});
    } , [] );

    const signIn = useCallback( async (email ,password) => {
            const {data} = await api.auth.login({email , password});
            setUser(data.data.user);
    }, [] );

    const signOut = useCallback ( async() => {
        await api.auth.logout();
        setUser(null);
    } ,[] );

    const value  = {user , loading, signUp ,signIn , signOut};

  return (
     <AuthContext.Provider value = {value} >
        {!loading && children}
     </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

