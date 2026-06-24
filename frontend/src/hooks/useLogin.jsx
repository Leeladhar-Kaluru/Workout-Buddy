import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch} = useAuthContext();

    const login = async (email,password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})
            })

            const responseText = await response.text();
            const data = responseText ? JSON.parse(responseText) : {};

            if(!response.ok){
                setError(data.error || 'Login failed');
                return;
            }

            localStorage.setItem('user', JSON.stringify(data));
            dispatch({type: 'LOGIN', payload: data});
            setError(null);
        } catch (error) {
            setError(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }
    return { login, error, isLoading };
}