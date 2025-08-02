import { motion } from "framer-motion"
import { ArrowRight, Zap, Users, Code, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import LeanCodeBlock from "../components/ui/LeanCodeBlock"

const features = [
  {
    icon: Zap,
    title: "AI-Powered Formalization",
    description: "Convert informal mathematical statements into precise Lean code using advanced language models."
  },
  {
    icon: Users,
    title: "Community Evaluation",
    description: "Get feedback from experts and collaborate with the mathematics community on formalizations."
  },
  {
    icon: Code,
    title: "Beautiful Rendering",
    description: "Enjoy syntax-highlighted Lean code with proper mathematical symbol rendering."
  },
  {
    icon: Star,
    title: "Quality Assurance",
    description: "Community voting and peer review ensure high-quality mathematical formalizations."
  }
]

const exampleCode = `theorem pythagorean_theorem (a b c : ℝ) (h : a > 0 ∧ b > 0 ∧ c > 0) :
  (∃ (triangle : RightTriangle), triangle.sides = (a, b, c)) →
  a^2 + b^2 = c^2 := by
  intro h_triangle
  cases h_triangle with
  | intro triangle h_sides =>
    exact triangle.pythagorean_property h_sides`

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-primary-50 to-blue-100 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Formalize Mathematics with{" "}
              <span className="text-primary-600">AI & Community</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Transform informal mathematical statements into precise Lean formalizations 
              using cutting-edge AI, with community collaboration and expert review.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/input">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" size="lg">
                  View Examples
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Mathematical Formalization
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to bridge the gap between informal mathematics and formal verification.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:scale-105 transition-transform"
                >
                  <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                See It In Action
              </h2>
              <p className="text-lg text-gray-600">
                Watch how informal statements transform into beautiful, verified Lean code.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <motion.div 
                className="card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informal Statement
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 italic">
                    "In a right triangle, the square of the hypotenuse equals 
                    the sum of squares of the other two sides."
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Formalized Lean Code
                </h3>
                <LeanCodeBlock 
                  code={exampleCode}
                  showCopyButton={true}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/input">
                <Button size="lg">
                  Try It Yourself
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Formalize Mathematics?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join our community of mathematicians, computer scientists, and AI researchers 
              working together to formalize mathematics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/input">
                <Button variant="secondary" size="lg">
                  Start Formalizing
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}