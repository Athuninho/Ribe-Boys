"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const galleryItems = [
  { id: 1, title: "Main Campus Entrance", category: "Campus", url: "https://images.unsplash.com/photo-1541339907198-e08759df9a0a?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Modern Science Lab", category: "Facilities", url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Inter-School Sports Day", category: "Sports", url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Drama Club Performance", category: "Events", url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Computer Lab", category: "Facilities", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Graduation Ceremony", category: "Events", url: "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&w=800&q=80" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Campus", "Facilities", "Sports", "Events"];

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">Life at Ribe Boys</h1>
          <p className="text-gray-600 text-lg">Capturing the moments that define our legacy.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === cat 
                ? 'bg-secondary text-primary shadow-lg' 
                : 'bg-accent/50 text-slate-500 hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={item.id}
              className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">{item.category}</p>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
