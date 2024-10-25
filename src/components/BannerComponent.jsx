import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../configs/swiper.css";

const BannerComponent = () => {
    return (
        <div className="w-full h-[400px] mb-5">
         <Swiper
            spaceBetween={50}
            slidesPerView={1}
        >
            <SwiperSlide>
                <img
                    src="https://d3design.vn/uploads/Summer%20drink%20menu%20promotion%20banner%20template.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://tainguyenaz.com/wp-content/uploads/2024/05/thum1.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://givralbakery.com.vn/vnt_upload/product/10_2019/hinh_danh_muc_banh_kem_1.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://d3design.vn/uploads/Summer%20drink%20menu%20promotion%20banner%20template4.jpg"
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </SwiperSlide>
            ...
        </Swiper>
       </div>
    );
}

export default BannerComponent