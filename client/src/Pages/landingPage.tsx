import { Link } from "react-router-dom";
import { NeuroIcon } from "../icons/NeuroIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-gray-800 h-10 w-10">
              <NeuroIcon />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800">NeuroNote</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/signin" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
              One Place. <span className="text-blue-600">Every Link.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              NeuroNote lets you save and organize links to your most important content — videos, tweets, profiles, and posts — all in one simple dashboard.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 text-center"
              >
                Save Your First Link
              </Link>
              <Link 
                to="/signin"
                className="px-8 py-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-200 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-16 md:mt-0">
            <div className="relative shadow-2xl rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-0"></div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 z-10 relative">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                    <div className="text-red-600 mr-3">
                      <YoutubeIcon />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">YouTube</div>
                      <div className="font-medium">How to Master Productivity</div>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                    <div className="text-blue-400 mr-3">
                      <TwitterIcon />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Twitter</div>
                      <div className="font-medium">Thread: Web Dev Trends 2025</div>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                    <div className="text-purple-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="3" />
                        <circle cx="17.5" cy="6.5" r="1.5" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Instagram</div>
                      <div className="font-medium">Design Inspiration Collection</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              NeuroNote brings all your important links together so you never lose track of valuable content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Save Links from Anywhere</h3>
              <p className="text-gray-600">
                Quickly save videos, tweets, posts, and articles with a simple workflow. Works with all major platforms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Categorize & Organize</h3>
              <p className="text-gray-600">
                Organize content by platform, topic, or custom categories. Create a system that works for your needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Access Anywhere</h3>
              <p className="text-gray-600">
                Your links are securely stored in the cloud. Access them from any device, whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Start Organizing Your Digital Library Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who use NeuroNote to keep track of their important content.
          </p>
          <Link 
            to="/signup" 
            className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-200"
          >
            Get Started — It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="text-gray-800 h-8 w-8">
                <NeuroIcon />
              </div>
              <span className="ml-2 text-lg font-bold text-gray-800">NeuroNote</span>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NeuroNote. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}