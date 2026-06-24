import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            const responseText = await response.text();
            const data = responseText ? JSON.parse(responseText) : {};

            if(!response.ok){
                setError(data.error || 'Sign up failed');
                return;
            }

            localStorage.setItem('user', JSON.stringify(data));

            dispatch({type: 'LOGIN', payload: data});
            setError(null);
        } catch (error) {
            setError(error.message || 'Sign up failed');
        } finally {
            setIsLoading(false);
        }
    }
    return { signUp, error, isLoading };
}