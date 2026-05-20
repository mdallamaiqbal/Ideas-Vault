"use client"; 

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";
const Banner = () => {
    const banners = [
    {
      id: 1,
      title: "Startup Innovation Hub",
      image: "/assets/slide1.jpg",
      link: "/ideas",
    },
    {
      id: 2,
      title: "Discover Creative Ideas",
      image: "/assets/slide2.jpg",
      link: "/ideas",
    },
    
    {
      id: 3,
      title: "Turn Ideas Into Reality",
      image: "/assets/slide4.jpg",
      link: "/ideas",
    },
  ];
    return (
        <div className="max-w-7xl mx-auto">
     <div className="w-full h-[50vh] md:h-[65vh] relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        loop={true} 
        speed={1000} 
        autoplay={{
          delay: 4000, 
          disableOnInteraction: false, 
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            
         
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority 
                className="object-cover"
              />
           
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
              <h1 className="text-white text-3xl md:text-4xl mt-20 font-bold tracking-wide max-w-3xl mb-6 drop-shadow-lg leading-tight">
                {banner.title}
              </h1>
              
              <Link
                href={banner.link} 
                className="bg-white text-black text-sm md:text-base font-semibold px-8 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore More
              </Link>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
        </div>
    );
};

export default Banner;