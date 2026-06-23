import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password) => {
        setIsLoading(true);
        setError(null);

            const response = await fetch('api/users/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })
            if(!response.ok){
                const errorData = await response.json();
                setError(errorData.error);
                setIsLoading(false);
            }
            else{
                const data = await response.json();
                //save to the Local Storage
                localStorage.setItem('user', JSON.stringify(data));

                //as we got the user data and token , we can dispatch the login action to update the context
                dispatch({type: 'LOGIN', payload: data});
                setIsLoading(false);
                setError(null);
            }
    }
    return { signUp, error, isLoading };
}