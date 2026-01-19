import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    id: 1,
    type: 'image',
    category: 'cricket',
    src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
    title: 'Cricket Net Practice',
  },
  {
    id: 2,
    type: 'image',
    category: 'cricket',
    src: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&h=600&fit=crop',
    title: 'Match Day',
  },
  {
    id: 3,
    type: 'image',
    category: 'yoga',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
    title: 'Morning Yoga Session',
  },
  {
    id: 4,
    type: 'image',
    category: 'baseball',
    src: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&h=600&fit=crop',
    title: 'Baseball Practice',
  },
  {
    id: 5,
    type: 'image',
    category: 'cricket',
    src: 'https://images.unsplash.com/photo-1593766788306-28561086694e?w=800&h=600&fit=crop',
    title: 'Junior Training',
  },
  {
    id: 6,
    type: 'image',
    category: 'yoga',
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    title: 'Meditation Class',
  },
  {
    id: 7,
    type: 'image',
    category: 'cricket',
    src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
    title: 'Bowling Practice',
  },
  {
    id: 8,
    type: 'image',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
    title: 'Annual Sports Day',
  },
  {
    id: 9,
    type: 'image',
    category: 'baseball',
    src: 'https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=800&h=600&fit=crop',
    title: 'Pitching Training',
  },
  {
    id: 10,
    type: 'image',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1461896836934- voices.jpg?w=800&h=600&fit=crop',
    title: 'Award Ceremony',
  },
  {
    id: 11,
    type: 'image',
    category: 'yoga',
    src: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=600&fit=crop',
    title: 'Group Session',
  },
  {
    id: 12,
    type: 'image',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    title: 'Summer Camp 2024',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'baseball', label: 'Baseball' },
  { id: 'events', label: 'Events' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const currentIndex = selectedImage 
    ? filteredItems.findIndex(item => item.id === selectedImage.id)
    : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Our Moments
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Academy <span className="text-[#40916C]">Gallery</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore moments captured at our academy - from intense training 
              sessions to championship victories and memorable events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-[#0A1F0A]">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-[#1A4D2E]/50 p-1 rounded-full flex-wrap justify-center">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="px-6 py-3 rounded-full data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A] text-gray-300"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A4D2E]">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-semibold">{item.title}</p>
                      <span className="text-[#D4AF37] text-sm capitalize">{item.category}</span>
                    </div>

                    {/* Play button for videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-[#0A1F0A] ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/10 rounded-full w-12 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            )}

            {currentIndex < filteredItems.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/10 rounded-full w-12 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            )}

            {/* Image */}
            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
                <span className="text-[#D4AF37] capitalize">{selectedImage.category}</span>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}