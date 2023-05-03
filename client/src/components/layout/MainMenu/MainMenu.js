import { useState } from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const MainMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">New Wave Festival</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto align-items-center" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/prices">Prices</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/order-a-ticket">
                <Button outline color="primary">Order a ticket!</Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

}

export default MainMenu;