interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "10,000+", label: "Links Organized" },
  { value: "2,500+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" }
];

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sky-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
