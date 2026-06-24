import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logOut } =  useLogOut();
    const { user } = useAuthContext();

    return ( 

        <nav>
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            <div className="links">
                {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={logOut}>Log Out</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login"><h2>Login</h2></Link>
                        <Link to="/signup"><h2>Sign Up</h2></Link>
                    </div>
                )}
                
            </div>
        </nav>
     );
}
 
export default Navbar;