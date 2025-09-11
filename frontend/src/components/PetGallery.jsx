import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const PetGallery = ({ images, petName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fallback images if none provided
  const galleryImages = images && images.length > 0 ? images : [
    {
      url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
      alt: `${petName} - Main Photo`,
      caption: "Main Photo"
    },
    {
      url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
      alt: `${petName} - Playing`,
      caption: "Playing Time"
    },
    {
      url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop",
      alt: `${petName} - Portrait`,
      caption: "Portrait"
    }
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setLightboxIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full">
      {/* Main Image Carousel */}
      <div className="relative mb-4 group">
        <Swiper
          modules={[Navigation, Pagination, Thumbs, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => openLightbox(index)}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <button
                    onClick={() => openLightbox(index)}
                    className="p-3 bg-white/90 rounded-full text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200"
                  >
                    <Expand className="h-6 w-6" />
                  </button>
                </div>

                {/* Image caption */}
                {image.caption && (
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                    {image.caption}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {activeIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        className="thumbnail-swiper"
      >
        {galleryImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div 
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                index === activeIndex 
                  ? 'ring-3 ring-pink-500 ring-offset-2' 
                  : 'hover:ring-2 hover:ring-pink-300 hover:ring-offset-1'
              }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === activeIndex && (
                <div className="absolute inset-0 bg-pink-500/20"></div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex].url}
                alt={galleryImages[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors duration-200"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navigation buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-300 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-200"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-300 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-200"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {galleryImages[lightboxIndex].caption || `Photo ${lightboxIndex + 1}`}
                </h3>
                <p className="text-gray-300 text-sm">
                  {lightboxIndex + 1} of {galleryImages.length} photos
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .thumbnail-swiper .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        
        .thumbnail-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
        
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          width: 12px;
          height: 12px;
          margin: 0 4px;
          transition: all 0.3s;
        }
        
        .swiper-pagination-bullet-active {
          background: #ec4899;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default PetGallery;
