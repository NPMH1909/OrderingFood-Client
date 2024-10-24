import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';

const SearchComponent = ({ setSearchTerm }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        setSearchTerm(inputValue); // Cập nhật searchTerm khi nhấn tìm kiếm
    };

    return (
        <div className="relative flex w-full gap-2 md:w-max">
            <Input
                type="search"
                color="black"
                label="Type here..."
                className="pr-20"
                containerProps={{
                    className: "min-w-[288px]",
                }}
                onChange={(e) => setInputValue(e.target.value)} // Cập nhật giá trị input
            />
            <Button
                size="sm"
                color="white"
                className="!absolute right-1 top-1 rounded"
                onClick={handleSearch} // Gọi hàm tìm kiếm khi nhấn
            >
                Search
            </Button>
        </div>
    );
}

export default SearchComponent;
