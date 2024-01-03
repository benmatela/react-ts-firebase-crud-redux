import React from "react";
import { IProduct } from "../../models/product.model";
import { ProductItem } from "./ProductItem";

type ProductListProps = {
  products: IProduct[];
  productFilterValue: string;
  getEditProduct: (editProduct: IProduct) => void;
  setEditProduct: (editProduct: IProduct) => void;
  editProduct: IProduct | null;
};

/**
 * A list of PRODUCTS
 *
 * @param {ProductListProps} props
 *
 * @returns {React.JSX.Element} component
 */
export const ProductList = ({
  products,
  productFilterValue,
  editProduct,
  getEditProduct,
  setEditProduct,
}: ProductListProps) => {
  return (
    <div className="device-list">
      <table className="min-w-full leading-normal">
        <thead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-black uppercase tracking-wider">
          <tr>
            <th className="p-3">ID:</th>
            <th className="p-3">Name:</th>
            <th className="p-3">Is Available:</th>
            <th className="p-3">Edit:</th>
            <th className="p-3">Delete:</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              productFilterValue === "all" ? true : product.isAvailable
            )
            .map((product: IProduct, index: number) => (
              <ProductItem
                key={product.id}
                product={product}
                editProduct={editProduct}
                getEditProduct={getEditProduct}
                setEditProduct={setEditProduct}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
