import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Home, FileText, Users, HelpCircle, Menu, X } from "lucide-react"
import { cn } from "../../utils/helpers"
import type { NavigationItem, SidebarProps } from "../../types"

const defaultNavigation: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home, current: true },
  { name: 'Statement Input', href: '/input', icon: FileText },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'About', href: '/about', icon: HelpCircle },
]

export default function Sidebar({ isOpen, onToggle, navigation = defaultNavigation }: SidebarProps) {
  const location = useLocation()
  
  // Update navigation items with current state
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: location.pathname === item.href
  }))

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isOpen ? 256 : 80,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        className="fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 z-50 lg:relative lg:z-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <motion.div
              animate={{
                opacity: isOpen ? 1 : 0,
                transition: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
              }}
              className="flex items-center"
            >
              {isOpen && (
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900">Gala</span>
                </Link>
              )}
            </motion.div>
            
            {/* Desktop toggle button */}
            <motion.button
              onClick={onToggle}
              className={cn(
                "hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors",
                !isOpen && "mx-auto"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {updatedNavigation.map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 animate-underline group",
                      item.current
                        ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <motion.span
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        x: isOpen ? 0 : -10,
                        transition: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
                      }}
                      className="ml-3 whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Footer */}
          <motion.div
            animate={{
              opacity: isOpen ? 1 : 0,
              transition: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
            }}
            className="p-4 border-t border-gray-200"
          >
            {isOpen && (
              <div className="text-xs text-gray-500 text-center">
                Lean Statement Formalization Platform
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}