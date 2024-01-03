import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import * as productReducers from "../../redux/products/products";
import { TOAST_TYPE } from "../../models/toast.model";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";
import { IProduct } from "../../models/product.model";
import { ConfirmationModal } from "../../components/modals/ConfirmationModal";

type ProductItemProps = {
  product: IProduct;
  editProduct: IProduct | null;
  getEditProduct: (editProduct: IProduct) => void;
  setEditProduct: (editProduct: IProduct) => void;
};

/**
 * A single PRODUCT item
 *
 * @param {ProductItemProps} props
 *
 * @returns {React.JSX.Element} component
 */
export const ProductItem = ({
  product,
  editProduct,
  getEditProduct,
  setEditProduct,
}: ProductItemProps) => {
  const dispatch = useDispatch();

  /**
   * Handle PRODUCT filter change
   */
  const handleToggleProductChange = () => {
    dispatch(productReducers.toggleProduct({ id: product.id, userId: "test" }));
  };

  /**
   * Handle the clicking of the edit PRODUCT button
   */
  const handleGetEditProductClick = () => {
    getEditProduct(product);
  };

  /**
   * Deletes a PRODUCT
   */
  const handleDeleteProductClick = (): void => {
    // Deletes a PRODUCT from the state and `🗂️ FIRESTORE`
    dispatch(productReducers.deleteProduct({ productId: product.id }));

    // Add a new `ℹ️ TOAST` to the state
    dispatch(
      productReducers.addToast({
        id: uuidv4(),
        message: "Product deleted successfully...",
        toastType: TOAST_TYPE.SUCCESS,
        payload: product,
        isActive: true,
        headerText: product.name,
        timestamp: new Date().toString(),
        toastOwner: product.name,
      })
    );

    // Reset device being edited
    if (product.id === editProduct?.id) {
      setEditProduct({
        id: "",
        name: "",
        isAvailable: false,
      });
    }
  };

  /**
   * Shows a delete PRODUCT confirmation modal
   */
  const onShowDeleteModal = (): void => {
    try {
      const modal = document.getElementById("confirmationModal");
      if (modal) {
        modal.classList.toggle("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr
      style={
        !product.isAvailable
          ? { textDecoration: "line-through" }
          : { textDecoration: "none" }
      }
      key={product.id}
      className="cursor-pointer"
    >
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        {product.id}
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        {product.name}
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        <input
          onChange={handleToggleProductChange}
          checked={product.isAvailable ? true : false}
          type="checkbox"
          id={product.id + "_device"}
          className="accent-orange-600"
        />
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={handleGetEditProductClick}
          className="device-list__btn device-list__edit-btn"
        >
          <MdModeEditOutline size={30} className="text-green-600" />
        </button>
      </td>
      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={onShowDeleteModal}
          className="device-list__btn device-list__delete-btn"
        >
          <FaTrashAlt size={30} className="text-red-600" />
        </button>
        <ConfirmationModal
          header="Delete Product Confirmation"
          message="Are you sure you want to delete this product?"
          isLoading={false}
          onClickOk={handleDeleteProductClick}
        />
      </td>
    </tr>
  );
};
