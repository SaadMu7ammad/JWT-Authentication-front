import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div className="NavBar">
      <ul className="UL">
        <NavLink className="all" to="all">All tasks</NavLink>
      </ul>
    </div>
  );
}

export default Nav;
