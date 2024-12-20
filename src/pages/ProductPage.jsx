import React, { useState, useEffect } from 'react';
import { useGetMenuQuery, useGetItemByCategoryQuery } from '../apis/menuItemApi';
import SelectBoxComponent from '../components/SelectBoxComponent';
import CardComponent from '../components/CardComponent';
import PaginationComponent from '../components/PaginationComponent';
import NotFoundProduct from '../components/NotFoundProduct';
import { useSelector } from 'react-redux';

const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const searchTerm = useSelector((state) => state.search.term);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, category]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage, searchTerm]);
    const { data, error, isLoading } = category === 'all'
        ? useGetMenuQuery({ searchTerm, page: currentPage, limit: 8 })
        : useGetItemByCategoryQuery({ category, searchTerm, page: currentPage, limit: 8 });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const totalPages = data.data.totalPages;
    const menuItems = data.data.menuItems;
    const totalItems = data.data.totalItems
    return (
        <div className="flex flex-col min-h-screen">
            <hr className="border border-black" />
            <div className="flex-grow">
                <div
                    variant="gradient"
                    color="blue-gray"
                    className="mx-auto w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3"
                >
                    <div className="flex flex-wrap items-center justify-end gap-y-4 gap-4 text-black">
                        <SelectBoxComponent setCategory={setCategory} />
                    </div>
                </div>
                {searchTerm && menuItems?.length > 0 && (
                    <div className="mt-4 text-left text-sm text-gray-700 pl-24">
                        <p>Đã tìm thấy {totalItems} sản phẩm</p>
                    </div>
                )}
                <div className="mt-4 text-right text-sm text-gray-700 pr-24">
                    {totalPages > 0  && (
                        <p>Trang {currentPage} / {totalPages}</p>
                    )}
                </div>
                <div className="w-[90%] mx-auto">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {menuItems?.length > 0 ? (
                            menuItems.map((item) => (
                                <div key={item._id} className="w-[80%] sm:w-[60%] md:w-full lg:w-full mx-auto">
                                    <CardComponent
                                        id={item._id}
                                        name={item.name}
                                        image={item.image.url}
                                        price={item.price}
                                        description={item.description}
                                        isAvailable={item.isAvailable}
                                    // addToCart={addToCart} // Truyền hàm thêm mặt hàng vào giỏ hàng
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex items-center justify-center w-full h-full">
                                <NotFoundProduct />
                            </div>
                        )}
                    </div>
                </div>
                {menuItems?.length > 0 && (
                    <div className='flex justify-center m-4'>
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
