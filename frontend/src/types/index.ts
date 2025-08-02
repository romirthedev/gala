export interface LeanStatement {
  id: string
  informalStatement: string
  formalStatement: string
  author: string
  createdAt: Date
  updatedAt: Date
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  votes: number
  comments: Comment[]
}

export interface Comment {
  id: string
  author: string
  content: string
  createdAt: Date
  votes: number
  parentId?: string
  replies?: Comment[]
}

export interface User {
  id: string
  username: string
  email: string
  reputation: number
  avatar?: string
}

export interface LLMResponse {
  formalStatement: string
  confidence: number
  explanation: string
  alternatives?: string[]
}

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
}

export interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  navigation: NavigationItem[]
}

export interface PageProps {
  className?: string
  children?: React.ReactNode
}