import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles, RefreshCw, CheckCircle } from "lucide-react"
import { Button } from "../components/ui/Button"
import LeanCodeBlock from "../components/ui/LeanCodeBlock"
import { validateLeanStatement } from "../utils/helpers"
import type { LLMResponse } from "../types"

export default function StatementInputPage() {
  const [informalStatement, setInformalStatement] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [llmResponse, setLlmResponse] = useState<LLMResponse | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!informalStatement.trim()) {
      setError("Please enter an informal statement")
      return
    }

    setIsProcessing(true)
    
    // Simulate LLM API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock response - in real app, this would be an API call
      const mockResponse: LLMResponse = {
        formalStatement: `theorem statement_${Date.now()} (x y : ℝ) : 
  ${informalStatement.toLowerCase().includes('equal') ? 'x = y → y = x' : 
    informalStatement.toLowerCase().includes('greater') ? 'x > y → ¬(y > x)' :
    'P → Q'} := by
  intro h
  ${informalStatement.toLowerCase().includes('equal') ? 'exact h.symm' : 
    informalStatement.toLowerCase().includes('greater') ? 'exact not_lt_of_gt h' :
    'exact h'}`,
        confidence: 0.85,
        explanation: `This formalization captures the mathematical content of your statement: "${informalStatement}". The theorem states the logical relationship and includes a proof by introduction and application of relevant lemmas.`,
        alternatives: [
          `lemma alt_${Date.now()} : ∀ x y : ℝ, P x y := by sorry`,
          `def definition_${Date.now()} : Type := sorry`
        ]
      }
      
      setLlmResponse(mockResponse)
    } catch (err) {
      setError("Failed to process statement. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRegenerateAlternative = () => {
    if (llmResponse?.alternatives && llmResponse.alternatives.length > 0) {
      const randomAlt = llmResponse.alternatives[Math.floor(Math.random() * llmResponse.alternatives.length)]
      setLlmResponse({
        ...llmResponse,
        formalStatement: randomAlt,
        confidence: Math.random() * 0.3 + 0.7 // Random confidence between 0.7-1.0
      })
    }
  }

  const isValidLean = llmResponse ? validateLeanStatement(llmResponse.formalStatement) : false

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Statement Input
          </h1>
          <p className="text-lg text-gray-600">
            Enter an informal mathematical statement and our AI will help you formalize it in Lean.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 text-primary-600 mr-2" />
              Informal Statement
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="statement" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your mathematical statement in natural language
                </label>
                <textarea
                  id="statement"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="e.g., The square root of 2 is irrational..."
                  value={informalStatement}
                  onChange={(e) => setInformalStatement(e.target.value)}
                />
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  isLoading={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? 'Processing...' : 'Formalize Statement'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
                
                {llmResponse && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleRegenerateAlternative}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>

            {/* Tips */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Tips for better results:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about mathematical objects and relationships</li>
                <li>• Use clear, unambiguous language</li>
                <li>• Include necessary conditions and assumptions</li>
                <li>• Mention the domain of variables when relevant</li>
              </ul>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Formalized Lean Code
            </h2>
            
            {!llmResponse && !isProcessing && (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Your formalized statement will appear here
                  </p>
                </div>
              </div>
            )}
            
            {isProcessing && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Sparkles className="h-12 w-12 text-primary-600" />
                  </motion.div>
                  <p className="text-gray-600 mt-4">Processing your statement...</p>
                </div>
              </div>
            )}
            
            {llmResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <LeanCodeBlock 
                  code={llmResponse.formalStatement}
                  title="Generated Lean Code"
                />
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Confidence:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${llmResponse.confidence * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-primary-600 h-2 rounded-full"
                        />
                      </div>
                      <span className="font-medium">
                        {Math.round(llmResponse.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  {isValidLean && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Valid syntax</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Explanation:</h4>
                  <p className="text-gray-700 text-sm">
                    {llmResponse.explanation}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Submit for Review
                  </Button>
                  <Button variant="outline" size="sm">
                    Save Draft
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}