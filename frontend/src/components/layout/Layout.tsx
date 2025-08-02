import { useState } from "react"
import { motion } from "framer-motion"
import Sidebar from "./Sidebar"
import type { PageProps } from "../../types"

interface LayoutProps extends PageProps {
  children: React.ReactNode
}

export default function Layout({ children, className }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navigation={[]}
      />
      
      <motion.main
        animate={{
          marginLeft: sidebarOpen ? 256 : 80,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        className={`min-h-screen lg:ml-0 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  )
}