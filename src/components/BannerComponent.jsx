import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../configs/swiper.css";

const BannerComponent = () => {
    return (
        <div className="w-full h-[700px] mb-5">
         <Swiper
            spaceBetween={50}
            slidesPerView={1}
        >
            <SwiperSlide>
                <img
                    src="/img/1.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/img/1.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/img/1.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/img/1.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            ...
        </Swiper>
       </div>
    );
}

export default BannerComponent