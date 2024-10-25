import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BannerComponent from '../components/BannerComponent';
import FooterComponent from '../components/FooterComponent';
import CardComponent from '../components/CardComponent';
import { useGetNewProductQuery, useGetTopSellerQuery } from '../apis/menuItemApi';

const HomePage = () => {
  const { data, error, isLoading } = useGetTopSellerQuery();
  const { data: newProductData, error: newProductError, isLoading: newProductLoading } = useGetNewProductQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading top sellers!</p>;

  const products = data?.data;
  const newProducts = newProductData?.data;

  return (
    <div>
      <NavbarComponent />
      <div className="h-[80%] sm:h-[60%] md:h-full lg:w-full mx-auto">
        <BannerComponent />
      </div>

      {/* Top Seller Section */}
      <div>
        <div className="ml-[6%]">
          <p className="text-2xl font-bold">Top Seller</p>
        </div>
        <div className="w-[90%] mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {products?.map((item) => (
              <div key={item.id} className="w-[80%] sm:w-[60%] md:w-full lg:w-full mx-auto">
                <CardComponent
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
          <p className="text-2xl font-bold">New Product</p>
        </div>
        <div className="w-[90%] mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {newProducts?.map((item) => (
              <div key={item.id} className="w-[80%] sm:w-[60%] md:w-full lg:w-full mx-auto">
                <CardComponent
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

      <FooterComponent />
    </div>
  );
};

export default HomePage;
