import React, { useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BannerComponent from '../components/BannerComponent';
import FooterComponent from '../components/FooterComponent';
import CardComponent from '../components/CardComponent';
import { useGetNewProductQuery, useGetTopSellerQuery } from '../apis/menuItemApi';
import { useGetUserByIdQuery } from '../apis/userApi';
import { setUserInfo } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
const HomePage = () => {
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetTopSellerQuery();
  const { data: newProductData, error: newProductError, isLoading: newProductLoading } = useGetNewProductQuery();
  const { data: userData, isLoading: userLoading, error: userError } = useGetUserByIdQuery();

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData.data));
      dispatch(setUserInfo(userData.data));
    }
  }, [userData, dispatch]);

  console.log('userr', userData)
  if (isLoading && newProductLoading) return <p>Loading...</p>;
  if (error || newProductError) return <p>Error loading top sellers!</p>;

  const products = data?.data;
  const newProducts = newProductData?.data;


  return (
    <div>
      <div className="h-[80%] sm:h-[60%] md:h-full lg:w-full mx-auto">
        <BannerComponent />
      </div>

      {/* Top Seller Section */}
      <div>
        <div className="ml-[6%]">
          <p className="text-2xl font-bold">Sản phẩm nổi bật</p>
        </div>
        <div className="w-[90%] mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {products?.map((item) => (
              <div key={item._id} className="w-[80%] sm:w-[60%] md:w-full lg:w-full mx-auto">
                <CardComponent
                  id={item._id}
                  name={item.name}
                  image={item.image.url}
                  price={item.price}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Product Section */}
      <div className='mt-8'>
        <div className="ml-[6%]">
          <p className="text-2xl font-bold">Sản phẩm mới</p>
        </div>
        <div className="w-[90%] mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {newProducts?.map((item) => (
              <div key={item._id} className="w-[80%] sm:w-[60%] md:w-full lg:w-full mx-auto">
                <CardComponent
                id={item._id}
                  name={item.name}
                  image={item.image.url}
                  price={item.price}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
