import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "../../utils/helpers"

interface LeanCodeBlockProps {
  code: string
  title?: string
  className?: string
  showCopyButton?: boolean
}

export default function LeanCodeBlock({ 
  code, 
  title, 
  className, 
  showCopyButton = true 
}: LeanCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Basic syntax highlighting for Lean keywords
  const highlightLeanSyntax = (text: string) => {
    const keywords = [
      'theorem', 'lemma', 'def', 'inductive', 'structure', 'class', 'instance', 
      'variable', 'variables', 'universe', 'universes', 'axiom', 'constant',
      'section', 'namespace', 'end', 'open', 'export', 'import', 'include',
      'by', 'exact', 'apply', 'intro', 'intros', 'cases', 'induction',
      'simp', 'refl', 'sorry', 'admit'
    ]
    
    const symbols = ['→', '∀', '∃', '∧', '∨', '¬', '↔', '≠', '≤', '≥', 'ℕ', 'ℤ', 'ℝ']
    
    let highlighted = text
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g')
      highlighted = highlighted.replace(regex, `<span class="text-blue-600 font-semibold">${keyword}</span>`)
    })
    
    // Highlight symbols
    symbols.forEach(symbol => {
      const regex = new RegExp(`\\${symbol}`, 'g')
      highlighted = highlighted.replace(regex, `<span class="text-purple-600">${symbol}</span>`)
    })
    
    // Highlight strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-600">"$1"</span>')
    
    // Highlight comments
    highlighted = highlighted.replace(/--.*$/gm, '<span class="text-gray-500 italic">$&</span>')
    
    return highlighted
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("relative group", className)}
    >
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
      )}
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        {showCopyButton && (
          <motion.button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </motion.button>
        )}
        
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightLeanSyntax(code)
            }}
          />
        </pre>
      </div>
    </motion.div>
  )
}