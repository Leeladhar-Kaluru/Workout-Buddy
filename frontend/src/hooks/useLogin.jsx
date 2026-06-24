import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch} = useAuthContext();

    const login = async (email,password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('api/users/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        const data = await response.json();
        if(!response.ok){
            setIsLoading(false);
            setError(data.error);
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({type: 'LOGIN', payload: data});
            setIsLoading(false);
            setError(null);
        }
    }
    return { login, error, isLoading };
}