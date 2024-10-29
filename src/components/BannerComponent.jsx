import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../configs/swiper.css";
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper'

SwiperCore.use([Autoplay]);

const BannerComponent = () => {
    return (
        <div className="w-full h-[400px] mb-5">
         <Swiper
            className="swiper"
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true} 
        >
            <SwiperSlide>
                <img
                    src="https://cdn.bannerbuzz.com/media/wysiwyg/new-description/Restaurant_Banners.png"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://social-template.com/wp-content/uploads/2020/09/0160-scaled.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://thumbs.dreamstime.com/b/bubble-tea-glass-yellow-taiwan-milk-bubbles-324982547.jpg?w=768"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            
            ...
        </Swiper>
       </div>
    );
}

export default BannerComponent