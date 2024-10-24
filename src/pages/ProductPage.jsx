import React, { useState, useEffect } from 'react';
import { useGetMenuQuery, useGetItemByCategoryQuery } from '../apis/menuItemApi';
import SelectBoxComponent from '../components/SelectBoxComponent';
import SearchComponent from '../components/SearchComponent';
import NavbarComponent from '../components/NavbarComponent';
import CardComponent from '../components/CardComponent';
import PaginationComponent from '../components/PaginationComponent';
import FooterComponent from '../components/FooterComponent';

const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all'); 

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, category]);

    const { data, error, isLoading } = category === 'all' 
        ? useGetMenuQuery({ searchTerm, page: currentPage, limit: 8 })
        : useGetItemByCategoryQuery({ category, searchTerm, page: currentPage, limit: 8 });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const totalPages = data.data.totalPages; 
    const menuItems = data.data.menuItems; 

    const isLastRowFull = menuItems.length % 4 === 0;

    return (
        <div>
            <NavbarComponent />
            <hr className="border border-black" />
            <div>
                <div
                    variant="gradient"
                    color="blue-gray"
                    className="mx-auto w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3"
                >
                    <div className="flex flex-wrap items-center justify-end gap-y-4 gap-4 text-black">
                        <SelectBoxComponent 
                            setCategory={setCategory} 
                        />
                        <SearchComponent setSearchTerm={setSearchTerm} />
                    </div>
                </div>
            </div>

            <div className='w-[81%] mx-auto flex justify-center '>
                <div className={`flex flex-wrap justify-start`}>
                    {menuItems.map(item => (
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
            <div className='flex justify-center m-4'>
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            <FooterComponent />
        </div>
    );
}

export default ProductPage;
