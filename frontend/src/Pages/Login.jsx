import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="email">Email : </label>
            <input type="email" id="email" value={email}
                onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="password">Password : </label>
            <input type="password" id="password" value={password}
                onChange={(e)=> setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;