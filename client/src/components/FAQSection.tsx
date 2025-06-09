import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is NeuroNote and how does it work?",
    answer: "NeuroNote is your digital second brain that helps you save, organize, and share content from across the web. Simply paste any URL from YouTube, Twitter, articles, or posts, and our AI automatically extracts and categorizes the content for easy retrieval."
  },
  {
    question: "Is NeuroNote free to use?",
    answer: "Yes! NeuroNote offers a generous free plan that includes unlimited content storage, smart organization features, and basic sharing capabilities. We also offer premium plans with advanced AI features and collaboration tools."
  },
  {
    question: "How does the AI organization work?",
    answer: "Our AI analyzes your saved content to understand context, themes, and relationships. It automatically creates tags, suggests categories, and helps you find related content. The more you use NeuroNote, the smarter it becomes at organizing your personal knowledge base."
  },
  {
    question: "Can I share my collections with others?",
    answer: "Absolutely! You can create beautiful, shareable collections of your curated content. Share individual collections or your entire brain with friends, colleagues, or make them public. Perfect for research collaboration or showcasing your expertise."
  },
  {
    question: "What platforms does NeuroNote support?",
    answer: "Currently, NeuroNote supports YouTube videos, Twitter posts, and web articles. We're constantly expanding to support more platforms including Instagram, TikTok, LinkedIn, and more. If there's a platform you'd like to see supported, let us know!"
  },
  {
    question: "Is my data secure and private?",
    answer: "Your privacy is our top priority. All your data is encrypted and stored securely. You have complete control over what you share and what remains private. We never sell your data or use it for advertising purposes."
  }
];

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sky-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            FAQ
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-sky-800 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about NeuroNote and building your second brain.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-sky-50/50 to-cyan-50/50 rounded-2xl border border-sky-100 overflow-hidden transition-all duration-200 hover:shadow-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-sky-50/50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-slate-800 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-sky-600 transform transition-transform duration-200 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFAQ === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-gradient-to-r from-sky-200 to-cyan-200 mb-4"></div>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-8 border border-sky-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <a
              href="mailto:support@neuronote.com"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}