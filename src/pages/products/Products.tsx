import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IProduct } from "../../models/product.model";
import { ToastManager } from "../../components/toasts/ToastManager";
import { FilterProduct } from "./FilterProduct";
import { EditProduct } from "./EditProduct";
import { ProductList } from "./ProductList";
import { AddProduct } from "./AddProduct";

/**
 * Products page
 *
 * @returns {React.JSX.Element} component
 */
export const Products = () => {
  const [isInitLoad, setIsInitLoad] = useState(true);
  const navigate = useNavigate();
  // here we are subsribed to product state and read it on each time it changes
  const Products = useSelector(
    (state: RootState) => state.productsPersistedReducer.products
  );
  const toast = useSelector(
    (state: RootState) => state.productsPersistedReducer.toast
  );
  // editProduct used to get product to be edited
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  // productFilterValue is used to filter out product on select
  const [productFilterValue, setProductFilterValue] = useState("all");

  useEffect(() => {
    if (isInitLoad) {
      setIsInitLoad(false);
    }
  }, []);

  /**
   * Get value to filter PRODUCTS by
   *
   * @param {string} filterValue
   *
   * @returns {void} void
   */
  const getProductFilterValue = (filterValue: string) => {
    setProductFilterValue(filterValue);
  };

  /**
   * Get the PRODUCTS to edit
   *
   * @param {IProduct} editProduct
   *
   * @returns {void} void
   */
  const getEditProduct = (editProduct: IProduct) => {
    setEditProduct(editProduct);
  };

  return (
    <div className="p-2 min-h-[79vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90px]">
        <h3
          className="text-left mt-6 md:text-2xl text-1xl text-black font-bold"
          id="pageHeader"
          data-testid="pageHeader"
        >
          Products:
        </h3>
        <ToastManager
          toastType={toast.toastType}
          id={toast.id}
          message={toast.message}
          payload={toast.payload}
          isActive={toast.isActive}
          toastOwner={toast.toastOwner}
          headerText={toast.headerText}
          timestamp={toast.timestamp}
        />
      </div>

      <div>
        {/* display edit product when product is being edited or else display add product form */}
        {editProduct?.id ? (
          <EditProduct
            userId={"test"}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
          />
        ) : (
          <AddProduct userId={"test"} />
        )}
        <FilterProduct getProductFilterValue={getProductFilterValue} />
      </div>
      <ProductList
        products={Products}
        productFilterValue={productFilterValue}
        getEditProduct={getEditProduct}
        setEditProduct={setEditProduct}
        editProduct={editProduct}
      />
    </div>
  );
};
