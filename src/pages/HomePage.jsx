import React, { useEffect } from 'react';
import BannerComponent from '../components/BannerComponent';
import CardComponent from '../components/CardComponent';
import { useGetNewProductQuery, useGetTopSellerQuery } from '../apis/menuItemApi';
import { useGetUserByIdQuery } from '../apis/userApi';
import { setUserInfo } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './css.css'
const HomePage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetTopSellerQuery();
  const { data: newProductData, error: newProductError, isLoading: newProductLoading } = useGetNewProductQuery();
  const { data: userData, isLoading: userLoading, error: userError } = useGetUserByIdQuery();

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData.data));
      dispatch(setUserInfo(userData.data));
    }
  }, [userData, dispatch]);

  if (isLoading || newProductLoading) return <p>Loading...</p>;
  if (error || newProductError) return <p>Error loading top sellers!</p>;

  const products = data?.data;
  const newProducts = newProductData?.data;

  return (
    <div>
      <div className="h-[80%] sm:h-[60%] md:h-full lg:w-full mx-auto">
        <BannerComponent />
      </div>

      {/* Top Seller Section */}
      <div className="mt-8">
        <div className="ml-[6%]">
          <p className="text-2xl font-bold">Sản phẩm nổi bật</p>
        </div>
        <div className="w-[90%] mx-auto">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Pagination, Navigation]}
          >
            {products?.map((item) => (
              <SwiperSlide key={item._id}>
                <div className='w-[100%]'>

                  <CardComponent
                    id={item._id}
                    name={item.name}
                    image={item.image.url}
                    price={item.price}
                    description={item.description}
                    isAvailable={item.isAvailable}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* New Product Section */}
      <div className="mt-8">
        <div className="ml-[6%]">
          <p className="text-2xl font-bold">Sản phẩm mới</p>
        </div>
        <div className="w-[90%] mx-auto">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Pagination, Navigation]}
          >
            {newProducts?.map((item) => (
              <SwiperSlide key={item._id}>

                <div className='w-[100%] mx-auto'>
                  <CardComponent
                    id={item._id}
                    name={item.name}
                    image={item.image.url}
                    price={item.price}
                    description={item.description}
                    isAvailable={item.isAvailable}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
