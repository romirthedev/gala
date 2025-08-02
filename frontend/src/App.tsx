import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Home, FileText, Users, HelpCircle } from 'lucide-react'
import Sidebar from './components/layout/Sidebar'
import LandingPage from './pages/LandingPage'
import StatementInputPage from './pages/StatementInputPage'
import CommunityEvaluationPage from './pages/CommunityEvaluationPage'
import AboutPage from './pages/AboutPage'
import type { NavigationItem } from './types'
import './index.css'

function AppContent() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', icon: Home, current: location.pathname === '/' },
    { name: 'Statement Input', href: '/input', icon: FileText, current: location.pathname === '/input' },
    { name: 'Community', href: '/community', icon: Users, current: location.pathname === '/community' },
    { name: 'About', href: '/about', icon: HelpCircle, current: location.pathname === '/about' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navigation={navigation}
      />
      
      <main className={`transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/input" element={<StatementInputPage />} />
            <Route path="/community" element={<CommunityEvaluationPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
