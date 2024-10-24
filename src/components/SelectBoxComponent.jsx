import React from 'react';
import { useGetCategoryQuery } from '../apis/menuItemApi';

const SelectBoxComponent = ({ setCategory }) => {
    const { data: categories, error, isLoading } = useGetCategoryQuery();

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    if (isLoading) return <select><option>Loading...</option></select>;
    if (error) return <select><option>Error: {error.message}</option></select>;

    return (
        <div className="w-72">
            <select defaultValue="all" onChange={handleCategoryChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="all">Tất cả</option> {/* Mặc định là Tất cả */}
                {categories.data.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectBoxComponent;
