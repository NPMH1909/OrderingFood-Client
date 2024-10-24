import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import PaginationComponent from '../components/PaginationComponent'
import BannerComponent from '../components/BannerComponent'
import FooterComponent from '../components/FooterComponent'
import CardComponent from '../components/CardComponent'
import { useGetNewProductQuery, useGetTopSellerQuery } from '../apis/menuItemApi'

const HomePage = () => {
  const { data, error, isLoading } = useGetTopSellerQuery();
  const { data: newProductData, error: newProductError, isLoading: newProductLoading } = useGetNewProductQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading top sellers!</p>;
  const products = data?.data
  const newProducts = newProductData?.data
  return (
    <div>
      <NavbarComponent />
      <div>
        <BannerComponent />
      </div>
      <div>
        <div className='ml-52'>
          <p className="text-2xl font-bold">Top Seller</p>
        </div>
        <div className='w-[81%] mx-auto flex justify-center '>
          <div className={`flex flex-wrap justify-start`}>
            {products?.map(item => (
              <div
                key={item.id} >
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
      <div>
        <div className='ml-52'>
          <p className="text-2xl font-bold">New Product </p>
        </div>
        <div className='w-[81%] mx-auto flex justify-center '>
          <div className={`flex flex-wrap justify-start`}>
            {newProducts?.map(item => (
              <div
                key={item.id} >
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
  )
}

export default HomePage
