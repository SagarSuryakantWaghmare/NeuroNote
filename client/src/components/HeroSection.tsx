import { Link } from 'react-router-dom';
import { NeuroIcon } from '../icons/NeuroIcon';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { TwitterIcon } from '../icons/TwitterIcon';

export function HeroSection() {
  return (
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
  );
}
