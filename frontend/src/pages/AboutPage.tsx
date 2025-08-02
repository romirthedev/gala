import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { BookOpen, Users, Zap, Target, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/Button"

const teamMembers = [
  {
    name: "Dr. Alice Mathematics",
    role: "Lead Mathematician",
    bio: "Expert in formal verification and mathematical logic with 15+ years experience.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Bob AI Engineer",
    role: "AI/ML Architect", 
    bio: "Specializes in large language models and mathematical reasoning systems.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Carol Developer",
    role: "Frontend Lead",
    bio: "Passionate about creating intuitive interfaces for complex mathematical tools.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
]

const features = [
  {
    icon: Zap,
    title: "AI-Powered Translation",
    description: "Our advanced language models understand mathematical nuance and can translate informal statements into precise Lean code."
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "Built by mathematicians, for mathematicians. The community reviews, improves, and validates all formalizations."
  },
  {
    icon: Target,
    title: "Precision & Accuracy",
    description: "Every formalization is type-checked and verified, ensuring mathematical correctness and logical consistency."
  },
  {
    icon: BookOpen,
    title: "Educational Focus",
    description: "Learn Lean by example, with detailed explanations and step-by-step formalization guidance."
  }
]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            About Gala
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We're bridging the gap between informal mathematical discourse and formal verification, 
            making mathematical formalization accessible to everyone through AI and community collaboration.
          </motion.p>
        </div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          </div>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              Mathematical formalization is crucial for advancing computer-assisted proof verification, 
              but it remains challenging and time-consuming. Our platform democratizes this process by:
            </p>
            <ul className="space-y-2 mt-6">
              <li>• Leveraging cutting-edge AI to translate natural language into formal mathematics</li>
              <li>• Building a collaborative community of mathematicians and computer scientists</li>
              <li>• Providing educational resources to learn formal verification</li>
              <li>• Ensuring quality through peer review and community validation</li>
            </ul>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Gala?</h2>
            <p className="text-lg text-gray-600">
              Built with modern technology and mathematical rigor in mind.
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
                  className="card text-center group hover:scale-105 transition-transform"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Passionate experts working to make mathematical formalization accessible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group hover:scale-105 transition-transform"
              >
                <div className="mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100 group-hover:border-primary-200 transition-colors"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Built with Modern Technology
              </h2>
              <p className="text-gray-600 mb-6">
                Our platform leverages the latest advances in AI, web development, 
                and formal verification to provide a seamless experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Large Language Models for mathematical reasoning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">React + TypeScript for robust frontend development</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Lean 4 theorem prover integration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Real-time collaboration and review systems</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-blue-100 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Powered by AI
              </h3>
              <p className="text-gray-600">
                State-of-the-art language models trained on mathematical literature
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Formalizing?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of mathematicians, researchers, and students working 
            together to make mathematics more precise and accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/input">
              <Button variant="secondary" size="lg">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
              View Documentation
            </Button>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 card text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions, suggestions, or want to contribute? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              Contact Us
            </Button>
            <Button variant="outline">
              Join Discord
            </Button>
            <Button variant="outline">
              GitHub Repository
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}