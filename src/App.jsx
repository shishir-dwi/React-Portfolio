import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Publications = lazy(() => import('./pages/Publications'))
const Experience = lazy(() => import('./pages/Experience'))

function App() {
    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'light' || saved === 'dark') {
            document.documentElement.setAttribute('data-theme', saved)
            return
        }
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        document.documentElement.setAttribute('data-theme', prefersLight ? 'light' : 'dark')
    }, [])
    return (
        <Router>
            <Navbar />
            <Suspense fallback={<div className="container" style={{ padding: '2rem' }}>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/publications" element={<Publications />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    )
}

export default App