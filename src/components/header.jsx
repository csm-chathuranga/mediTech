import { useSelector } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate  } from 'react-router-dom';

let Header = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate()

    const handleLogout = () => {
		navigate("/logout")
	}

    return (
        <>
        <header className="header-fixed">
            <div className="header-limiter">
                <h1><a href="#">ABC<span>COMPANY</span></a></h1>
              {user.name ? <nav>
                    <a href="/user/show"><h5>{user?.name}</h5></a>
                    <span>
                    <Dropdown style={{display: 'inline-block'}}>
                    <Dropdown.Toggle variant="default" id="dropdown-basic" >
                    <img src={user?.profile_image?.thumb} width="40" height='40'></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item href="/user/edit" >Edit Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item ><span onClick={handleLogout} style={{cursor: 'pointer'}}>Sign Out</span></Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </span>
                </nav>:
                <nav>
                        <a href="/">SIGN IN |</a>
                        <a href="/user/register">SIGN UP</a>
                    </nav>
                } 
            </div>

        </header>
        </>
    )
}

export default Header;