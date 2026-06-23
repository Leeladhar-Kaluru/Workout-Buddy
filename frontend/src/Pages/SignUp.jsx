import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignUp } from "../hooks/useSignUp"; 

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, error, isLoading } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(email, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label htmlFor="email">Email : </label>
            <input type="email" id="email" value={email}
                onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="password">Password : </label>
            <input type="password" id="password" value={password}
                onChange={(e)=> setPassword(e.target.value)} />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp;