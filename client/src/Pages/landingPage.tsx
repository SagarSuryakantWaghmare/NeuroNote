import { Link } from "react-router-dom";
import { NeuroIcon } from "../icons/NeuroIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-sky-600 h-10 w-10">
              <NeuroIcon />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">NeuroNote</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg hover:bg-sky-100 text-sky-700 font-medium transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-lg hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-10">
            <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sky-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Your Second Brain, Organized
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-sky-800 to-cyan-800 bg-clip-text text-transparent leading-tight mb-6">
              Capture. <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">Organize.</span> <br />Remember.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              NeuroNote transforms scattered links into organized knowledge. Save videos, tweets, articles, and posts in one beautiful dashboard that thinks like you do.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Building Your Brain
              </Link>
              <Link
                to="/signin"
                className="px-8 py-4 bg-white text-sky-700 font-semibold rounded-xl hover:bg-sky-50 transition-all duration-200 text-center border-2 border-sky-200 hover:border-sky-300"
              >
                See How It Works
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-16 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-cyan-400/20 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-sky-100">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                  <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                  <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-sky-50 rounded-full h-8 flex items-center px-4">
                    <span className="text-sky-600 text-sm font-medium">neuronote.app/dashboard</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-4 rounded-xl flex items-center border border-sky-100">
                    <div className="text-red-500 mr-4 bg-red-50 p-2 rounded-lg">
                      <YoutubeIcon />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-sky-600 font-medium mb-1">YouTube</div>
                      <div className="font-semibold text-slate-800">AI Revolution: What's Next?</div>
                      <div className="text-xs text-slate-500 mt-1">Saved 2 hours ago</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-4 rounded-xl flex items-center border border-sky-100">
                    <div className="text-blue-400 mr-4 bg-blue-50 p-2 rounded-lg">
                      <TwitterIcon />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-sky-600 font-medium mb-1">Twitter</div>
                      <div className="font-semibold text-slate-800">Thread: Future of Web Development</div>
                      <div className="text-xs text-slate-500 mt-1">Saved yesterday</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-4 rounded-xl flex items-center border border-sky-100">
                    <div className="text-sky-600 mr-4 bg-sky-50 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="3" />
                        <circle cx="17.5" cy="6.5" r="1.5" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-sky-600 font-medium mb-1">Instagram</div>
                      <div className="font-semibold text-slate-800">Design Inspiration Gallery</div>
                      <div className="text-xs text-slate-500 mt-1">Saved 3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-sky-50 to-cyan-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sky-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Everything You Need
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-sky-800 bg-clip-text text-transparent mb-6">
              Your Digital Memory, Supercharged
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              NeuroNote doesn't just store your links—it creates connections, surfaces insights, and turns information overload into organized knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Lightning Fast Capture</h3>
              <p className="text-slate-600 leading-relaxed">
                Save content from any platform in seconds. Our smart detection automatically extracts titles, thumbnails, and metadata so you don't have to.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Smart Organization</h3>
              <p className="text-slate-600 leading-relaxed">
                AI-powered categorization and tagging means your content organizes itself. Find anything instantly with intelligent search and filters.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Share Your Brain</h3>
              <p className="text-slate-600 leading-relaxed">
                Create beautiful, shareable collections of your best finds. Collaborate with others or showcase your curated knowledge to the world.
              </p>
            </div>
          </div>
        </div>
      </section>      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 rounded-3xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-sky-100">Links Organized</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2,500+</div>
                <div className="text-sky-100">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-sky-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sky-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              How It Works
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-sky-800 bg-clip-text text-transparent mb-6">
              Three Steps to Your Perfect Second Brain
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Building your knowledge hub has never been easier. Get started in minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Save Content</h3>
              <p className="text-slate-600 leading-relaxed">
                Simply paste any URL - YouTube videos, tweets, articles, posts. NeuroNote automatically extracts all the important details for you.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Auto-Organize</h3>
              <p className="text-slate-600 leading-relaxed">
                Watch as your content gets intelligently categorized and tagged. Our AI understands context and creates meaningful connections.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Share & Discover</h3>
              <p className="text-slate-600 leading-relaxed">
                Create beautiful collections to share with friends, colleagues, or the world. Turn your personal brain into a collaborative knowledge base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-sky-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sky-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Loved by Creators
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-sky-800 bg-clip-text text-transparent mb-6">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-slate-800">Alex Chen</div>
                  <div className="text-sm text-slate-500">Content Creator</div>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "NeuroNote transformed how I research. Instead of losing great content in browser bookmarks, I now have a searchable knowledge base that grows with me."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-slate-800">Maria Rodriguez</div>
                  <div className="text-sm text-slate-500">Designer</div>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "The sharing feature is incredible. I create mood boards and inspiration collections that my team can access instantly. It's like Pinterest but smarter."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-slate-800">David Park</div>
                  <div className="text-sm text-slate-500">Developer</div>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "Finally, a tool that understands how my brain works. The AI categorization is spot-on, and finding old resources is now effortless."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-sky-800 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about NeuroNote
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Is NeuroNote free to use?</h3>
              <p className="text-slate-600">
                Yes! NeuroNote offers a generous free tier that includes up to 1,000 saved links, basic organization features, and sharing capabilities. Premium plans unlock unlimited storage and advanced AI features.
              </p>
            </div>

            <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">What platforms are supported?</h3>
              <p className="text-slate-600">
                NeuroNote works with any URL - YouTube, Twitter, Medium, Instagram, TikTok, LinkedIn, and thousands more. If it's on the web, we can save it.
              </p>
            </div>

            <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">How does the AI organization work?</h3>
              <p className="text-slate-600">
                Our AI analyzes the content, title, and context of your saved links to automatically suggest tags and categories. You can always customize these or create your own organizational system.
              </p>
            </div>

            <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Can I export my data?</h3>
              <p className="text-slate-600">
                Absolutely! Your data belongs to you. Export your entire library as JSON, CSV, or HTML at any time. No vendor lock-in, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
      </section>      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* GitHub Icon */}
            <a
              href="https://github.com/sagar-dev/NeuroNote"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200"
              title="View Source Code"
            >
              <svg className="w-5 h-5 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* Made by Sagar */}
            <div className="flex items-center text-slate-400 text-sm">
              <span>Made by</span>
              <span className="ml-1 font-semibold text-sky-400">Sagar</span>
            </div>

            {/* Source Code Link */}
            <a
              href="https://github.com/sagar-dev/NeuroNote"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm font-medium"
            >
              Source Code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}