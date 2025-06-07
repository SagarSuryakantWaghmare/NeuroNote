interface Testimonial {
  name: string;
  role: string;
  content: string;
  initial: string;
  gradientFrom: string;
  gradientTo: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajat",
    role: "Content Creator",
    content: "NeuroNote transformed how I research. Instead of losing great content in browser bookmarks, I now have a searchable knowledge base that grows with me.",
    initial: "R",
    gradientFrom: "from-sky-400",
    gradientTo: "to-cyan-400"
  },
  {
    name: "Ranvir",
    role: "Designer",
    content: "The sharing feature is incredible. I create mood boards and inspiration collections that my team can access instantly. It's like Pinterest but smarter.",
    initial: "R",
    gradientFrom: "from-cyan-400",
    gradientTo: "to-blue-400"
  },
  {
    name: "Atharva Wandare",
    role: "Developer",
    content: "Finally, a tool that understands how my brain works. The AI categorization is spot-on, and finding old resources is now effortless.",
    initial: "A",
    gradientFrom: "from-blue-400",
    gradientTo: "to-indigo-400"
  },
  {
    name: "Aniket Pawar",
    role: "Student",
    content: "NeuroNote revolutionized my study process. I can now organize all my research materials in one place and find them instantly when needed.",
    initial: "A",
    gradientFrom: "from-indigo-400",
    gradientTo: "to-purple-400"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-sky-50 to-cyan-50">
      <div className="container mx-auto px-6 max-w-7xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradientFrom} ${testimonial.gradientTo} rounded-full flex items-center justify-center text-white font-bold`}>
                  {testimonial.initial}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-slate-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
