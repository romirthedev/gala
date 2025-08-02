import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCode(code: string): string {
  // Basic Lean code formatting - can be enhanced with proper parsing
  return code
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
}

export function validateLeanStatement(statement: string): boolean {
  // Basic validation - in a real app, this would use Lean's parser
  if (!statement.trim()) return false
  
  // Check for basic Lean syntax patterns
  const leanKeywords = ['theorem', 'lemma', 'def', 'inductive', 'structure', 'class', 'instance']
  const hasKeyword = leanKeywords.some(keyword => statement.includes(keyword))
  
  return hasKeyword || statement.includes(':') || statement.includes('→')
}