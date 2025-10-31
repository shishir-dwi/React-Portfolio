import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import styled from 'styled-components'
import SDLogo from './SDLogo'

const Nav = styled.nav`
  background-color: var(--surface);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--surface-light);
`

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
  column-gap: 24px; /* spacing between left, center, right groups */
`

const NavLogo = styled(Link)`
  color: var(--text);
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
`

const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 8px;
`

const ThemeToggle = styled.button`
  margin-left: 12px;
  background: transparent;
  border: 1px solid var(--surface-light);
  color: var(--text);
  border-radius: var(--radius-full);
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);

  &:hover { background: var(--surface); transform: translateY(-1px); }
  &:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
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
  gap: 24px; /* spacing between nav items */

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

const LeftSlot = styled.div`
  display: flex;
  align-items: center;
  justify-self: start;
  gap: 8px;
`

const CenterSlot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-self: center;
  position: relative;
  padding: 0 16px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 24px;
    background: var(--surface-light);
    opacity: .6;
  }
  &::before { margin-right: 16px; }
  &::after { margin-left: 16px; }
`

const RightSlot = styled.div`
  display: flex;
  align-items: end;
  justify-self: end;
  justify-content: end;
  gap: 8px;
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
  padding: 0 .5rem;
  height: 100%;
  cursor: pointer;
  font-weight: 500;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 22px;
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
    const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark')
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
        // Sync theme state with <html data-theme>
        const observer = new MutationObserver(() => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark'
            setTheme(current)
        })
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        return () => {
            window.removeEventListener('scroll', changeNav)
            observer.disconnect()
        }
    }, [])

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem('theme', next)
    }

    return (
        <Nav scrollNav={scrollNav}>
            <NavContainer>
                <LeftSlot>
                    <NavLogo to="/">
                        <LogoWrapper>
                            <SDLogo size={18} />
                        </LogoWrapper>
                        <span>Shishir Dwivedi</span>
                    </NavLogo>
                </LeftSlot>
                <MobileIcon
                    role="button"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls="primary-navigation"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggle()
                        }
                    }}
                    onClick={toggle}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </MobileIcon>
                <CenterSlot>
                    <ThemeToggle
                        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                        title={theme === 'dark' ? 'Light' : 'Dark'}
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </ThemeToggle>
                </CenterSlot>
                <RightSlot>
                    <NavMenu id="primary-navigation" isOpen={isOpen}>
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
                </RightSlot>
            </NavContainer>
        </Nav>
    )
}

export default Navbar