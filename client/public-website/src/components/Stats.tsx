export default function Stats() {
  const stats = [
    { label: "Mean Score (2024)", value: "6.951" },
    { label: "A- / B+ Students", value: "25" },
    { label: "Student Population", value: "800+" },
    { label: "Annual Admissions", value: "300+" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl border border-accent hover:shadow-xl transition-shadow">
              <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
