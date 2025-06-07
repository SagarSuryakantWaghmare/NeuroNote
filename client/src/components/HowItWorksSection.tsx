interface Step {
  number: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const steps: Step[] = [
  {
    number: "1",
    title: "Save Content",
    description: "Simply paste any URL - YouTube videos, tweets, articles, posts. NeuroNote automatically extracts all the important details for you.",
    gradientFrom: "from-sky-500",
    gradientTo: "to-cyan-500"
  },
  {
    number: "2",
    title: "Auto-Organize",
    description: "Watch as your content gets intelligently categorized and tagged. Our AI understands context and creates meaningful connections.",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-blue-500"
  },
  {
    number: "3",
    title: "Share & Discover",
    description: "Create beautiful collections to share with friends, colleagues, or the world. Turn your personal brain into a collaborative knowledge base.",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-500"
  }
];

export function HowItWorksSection() {
  return (
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
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
