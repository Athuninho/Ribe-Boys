import Hero from "@/components/Hero";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      
      {/* CBC Pathways Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">CBC Career Pathways</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Preparing Grade 10-12 learners for the future with specialized tracks tailored to their strengths and interests.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {['STEM', 'Arts & Sports Science', 'Social Sciences'].map((pathway) => (
              <div key={pathway} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-t-4 border-secondary">
                <h3 className="text-2xl font-bold text-primary mb-4">{pathway}</h3>
                <p className="text-gray-500 mb-6">Comprehensive curriculum focusing on core competencies and practical skills.</p>
                <button className="text-primary font-bold hover:underline">Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08759df9a0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="School Campus" 
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">A Legacy of Excellence Since 1940</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Founded by Methodist missionaries, Ribe Boys has evolved through decades to become a national beacon of academic and moral integrity in Kilifi County.
            </p>
            <button className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all">
              Discover Our History
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
