import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Avatar } from 'rsuite';


function MainMenu() {
  return (

    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">IPS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"> Home</Nav.Link>
            <Nav.Link href="/Video">Video</Nav.Link>
            <Nav.Link href="/Maps">Maps</Nav.Link>
            <NavDropdown title="Management" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/Video history">Video meetings history</NavDropdown.Item>
              <NavDropdown.Item href="/UserList">
                Users
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>

            <Nav.Link>
              <Avatar circle src="https://avatars.githubusercontent.com/u/12592949" alt="@superman66" />
            </Nav.Link>

        
              <NavDropdown align="end" title="" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/Profile"><i className="bi bi-person-circle"></i> Profile</NavDropdown.Item>
                <NavDropdown.Item href="/Settings">
                  <i className="bi bi-gear"></i> Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/SignOut">
                  <i className="bi bi-box-arrow-right"></i> Sign Out
                </NavDropdown.Item>
              </NavDropdown>
           

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainMenu;