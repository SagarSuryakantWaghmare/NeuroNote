interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast Capture",
    description: "Save content from any platform in seconds. Our smart detection automatically extracts titles, thumbnails, and metadata so you don't have to.",
    gradientFrom: "from-sky-500",
    gradientTo: "to-cyan-500"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Smart Organization",
    description: "AI-powered categorization and tagging means your content organizes itself. Find anything instantly with intelligent search and filters.",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-blue-500"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
      </svg>
    ),
    title: "Share Your Brain",
    description: "Create beautiful, shareable collections of your best finds. Collaborate with others or showcase your curated knowledge to the world.",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-500"
  }
];

export function FeaturesSection() {
  return (
    <section className=" bg-gradient-to-r from-sky-50 to-cyan-50 py-24">
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
        <div className="max-w-7xl mx-auto">

        <div className="grid  grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} rounded-xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
