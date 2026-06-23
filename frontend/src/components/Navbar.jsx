import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 

        <nav>
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            <div className="links">
                <Link to="/login"><h2>Login</h2></Link>
                <Link to="/signup"><h2>Sign Up</h2></Link>
            </div>
        </nav>
     );
}
 
export default Navbar;