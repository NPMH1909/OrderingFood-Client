import { ListItem, ListItemPrefix } from "@material-tailwind/react";

const CustomListItem = ({ isActive, onClick, children }) => {
    return (
        <ListItem
            onClick={onClick}
            className={`cursor-pointer transition-colors duration-200 ${
                isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'
            }`}
        >
            <ListItemPrefix>{children}</ListItemPrefix>
        </ListItem>
    );
};

export default CustomListItem;
