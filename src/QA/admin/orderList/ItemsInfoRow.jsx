import React from "react";

const ItemsInfoRow = ({ items, totalSize }) => {
  const totalItems = items.reduce((acc, item) => acc + item.pieces, 0);
  const materials = [...new Set(items.map(item => item.material))].join(", ");

  return (
    <>
      {totalItems} pcs. | {totalSize} m<sup>2</sup> | {materials}
    </>
  );
};

export default ItemsInfoRow;
