import { useState } from "react"
import { motion } from "framer-motion"
import { ThumbsUp, ThumbsDown, MessageCircle, Calendar, User, Filter, Search } from "lucide-react"
import { Button } from "../components/ui/Button"
import LeanCodeBlock from "../components/ui/LeanCodeBlock"
import type { LeanStatement } from "../types"

// Mock data for community statements
const mockStatements: LeanStatement[] = [
  {
    id: "1",
    informalStatement: "The square root of 2 is irrational",
    formalStatement: `theorem sqrt_two_irrational : Irrational (Real.sqrt 2) := by
  intro h
  obtain ⟨p, q, hq, hpq, heq⟩ := h
  have h2 : 2 * q ^ 2 = p ^ 2 := by
    rw [← heq]
    ring
  sorry`,
    author: "alice_math",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    status: "submitted",
    votes: 15,
    comments: []
  },
  {
    id: "2",
    informalStatement: "Every finite group of prime order is cyclic",
    formalStatement: `theorem finite_group_prime_order_cyclic {G : Type*} [Group G] [Fintype G] 
  (h : Nat.Prime (Fintype.card G)) : IsCyclic G := by
  obtain ⟨g, hg⟩ := exists_element_order_eq_card_of_prime h
  exact ⟨g, hg⟩`,
    author: "group_theory_expert",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    status: "approved",
    votes: 23,
    comments: []
  },
  {
    id: "3",
    informalStatement: "The derivative of x^n is n*x^(n-1)",
    formalStatement: `theorem deriv_pow (n : ℕ) : deriv (fun x : ℝ => x ^ n) = fun x => n * x ^ (n - 1) := by
  ext x
  rw [deriv_pow']
  simp`,
    author: "calculus_student",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    status: "submitted",
    votes: 8,
    comments: []
  }
]

export default function CommunityEvaluationPage() {
  const [statements] = useState<LeanStatement[]>(mockStatements)
  const [filter, setFilter] = useState<'all' | 'submitted' | 'approved' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<'votes' | 'date'>('votes')

  const filteredStatements = statements
    .filter(stmt => filter === 'all' || stmt.status === filter)
    .filter(stmt => 
      stmt.informalStatement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stmt.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

  const handleVote = (statementId: string, voteType: 'up' | 'down') => {
    // In a real app, this would make an API call
    console.log(`Voted ${voteType} on statement ${statementId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'submitted': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Evaluation
          </h1>
          <p className="text-lg text-gray-600">
            Review, discuss, and vote on mathematical formalizations submitted by the community.
          </p>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search statements or authors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="votes">Sort by Votes</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </motion.div>

        {/* Statements List */}
        <div className="space-y-6">
          {filteredStatements.map((statement, index) => (
            <motion.div
              key={statement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(statement.status)}`}>
                      {statement.status}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {statement.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {statement.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {statement.informalStatement}
                  </h3>
                </div>
                
                {/* Voting */}
                <div className="flex flex-col items-center space-y-1 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVote(statement.id, 'up')}
                    className="p-2 rounded-full hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </motion.button>
                  <span className="font-semibold text-lg">{statement.votes}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVote(statement.id, 'down')}
                    className="p-2 rounded-full hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Lean Code */}
              <div className="mb-4">
                <LeanCodeBlock 
                  code={statement.formalStatement}
                  title="Lean Formalization"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment ({statement.comments.length})
                  </Button>
                  {statement.status === 'submitted' && (
                    <>
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        Request Changes
                      </Button>
                    </>
                  )}
                </div>
                
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStatements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <MessageCircle className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No statements found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        )}

        {/* Pagination would go here in a real app */}
      </motion.div>
    </div>
  )
}