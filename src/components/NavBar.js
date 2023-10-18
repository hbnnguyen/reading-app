
import { Link } from 'react-router-dom';

const NavBar = () => {
 return (
 <nav>
       <ul>
          <li>
             <Link to="/">Home</Link>
          </li>
          <li>
             <Link to="/Login">Login</Link>
          </li>
          <li>
             <Link to="/read">Read</Link>
          </li>
          <li>
             <Link to="/profile">Profile</Link>
          </li>
       </ul>
 </nav>
 );
};

export default NavBar;