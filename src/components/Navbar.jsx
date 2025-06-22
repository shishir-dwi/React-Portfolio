import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import SDLogo from './SDLogo'

const Nav = styled.nav`
  background-color: rgba(15, 23, 42, 0.95);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`

const NavLogo = styled(Link)`
  color: var(--text);
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
`

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: var(--text);
  }
`

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: ${({ isOpen }) => (isOpen ? '80px' : '-100%')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    transition: all 0.5s ease;
    background: var(--background);
    left: 0;
    padding-top: 2rem;
  }
`

const NavItem = styled.li`
  height: 80px;
  
  @media screen and (max-width: 768px) {
    height: auto;
    margin: 1.5rem 0;
  }
`

const NavLink = styled(Link)`
  color: ${({ active }) => (active ? 'var(--primary)' : 'var(--text)')};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: 500;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => (active ? '20px' : '0')};
    height: 2px;
    background: var(--primary);
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 20px;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
    padding: 1rem;
    width: 100%;
    display: block;
    
    &::after {
      bottom: 0;
    }
  }
`

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrollNav, setScrollNav] = useState(false)
    const location = useLocation()

    const toggle = () => setIsOpen(!isOpen)

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
        return () => {
            window.removeEventListener('scroll', changeNav)
        }
    }, [])

    return (
        <Nav scrollNav={scrollNav}>
            <NavContainer>
                <NavLogo to="/">
                    <SDLogo size={32} />
                    <span>&nbsp;Shishir Dwivedi</span>
                </NavLogo>
                <MobileIcon onClick={toggle}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </MobileIcon>
                <NavMenu isOpen={isOpen}>
                    <NavItem>
                        <NavLink
                            to="/"
                            active={location.pathname === '/' ? 1 : 0}
                            onClick={toggle}
                        >
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/about"
                            active={location.pathname === '/about' ? 1 : 0}
                            onClick={toggle}
                        >
                            About
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/projects"
                            active={location.pathname === '/projects' ? 1 : 0}
                            onClick={toggle}
                        >
                            Projects
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/experience"
                            active={location.pathname === '/experience' ? 1 : 0}
                            onClick={toggle}
                        >
                            Experience
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/publications"
                            active={location.pathname === '/publications' ? 1 : 0}
                            onClick={toggle}
                        >
                            Publications
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/contact"
                            active={location.pathname === '/contact' ? 1 : 0}
                            onClick={toggle}
                        >
                            Contact
                        </NavLink>
                    </NavItem>
                </NavMenu>
            </NavContainer>
        </Nav>
    )
}

export default Navbar