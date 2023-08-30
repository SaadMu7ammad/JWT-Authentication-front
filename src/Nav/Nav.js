import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import './Nav.css';
import { clearLogOut } from '../Redux/Slices/UpdateSlice';
import { useDispatch } from 'react-redux';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call clearLogOut to reset user-specific data
    dispatch(clearLogOut());
    console.log('llloo');
    navigate('/')
    // Perform other logout actions if needed
  };
  return (
    <div className="NavBar">
      <ul className="UL">
        <NavLink className="all" to="all">
          All tasks
        </NavLink>
        {/* <NavLink className="all"> */}
          {/* <button onClick={handleLogout}>LogOut</button> */}
        {/* </NavLink> */}
      </ul>
    </div>
  );
}

export default Nav;
