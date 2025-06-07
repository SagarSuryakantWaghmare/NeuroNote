import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Build Your Second Brain?
        </h2>
        <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
          Join thousands of creators, researchers, and curious minds who've transformed how they organize knowledge.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-white text-sky-700 font-semibold rounded-xl hover:bg-sky-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Free Today
          </Link>
          <Link
            to="/signin"
            className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-sky-700 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
