import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { CircleLoader } from "react-spinners";
import * as productReducers from "../../redux/products/products";
import { TOAST_TYPE } from "../../models/toast.model";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../../models/product.model";

type EditProductProps = {
  editProduct: IProduct;
  setEditProduct: Function;
  userId: string;
};

/**
 * Edits a PRODUCTS in "/products" page
 *
 * @param {EditProductProps} props
 *
 * @returns {React.JSX.Element} component
 */
export const EditProduct = ({
  editProduct,
  setEditProduct,
  userId,
}: EditProductProps) => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const form = useForm<IProduct>({});
  const { register, control, handleSubmit, formState, watch } = form;
  const { isSubmitting, isDirty, isValid, errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  // Effect hook is going to set new product each time user clicks product edit button
  useEffect(() => {
    setProductName(editProduct.name);
  }, [editProduct]);

  /**
   * This event handler dispatches action to update edited PRODUCTS and
   * resets `editProduct` state so that the form switches from `"edit product"` to `"add product"`
   *
   * @param {IProduct} product
   */
  const onSubmit = async (product: IProduct) => {
    setIsLoading(true);
    try {
      // Edits a PRODUCTS on the state and `🗂️ FIRESTORE`
      dispatch(
        productReducers.editProduct({
          editedProduct: {
            ...editProduct,
            name: product.name,
            isAvailable: product.isAvailable,
          },
        })
      );

      // Add a new `ℹ️ TOAST` to the state
      dispatch(
        productReducers.addToast({
          id: uuidv4(),
          message: "Product updated successfully...",
          toastType: TOAST_TYPE.SUCCESS,
          payload: editProduct,
          isActive: true,
          headerText: editProduct.name,
          timestamp: new Date().toString(),
          toastOwner: editProduct.name,
        })
      );

      setEditProduct({} as IProduct);
      setProductName("");

      form.reset();
    } catch (error: any) {
      console.error(error);
      setIsLoading(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-3 p-5 bg-orange-100 border shadow-md rounded-md"
    >
      <div id="productName" className="">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="productName"
          data-testid={"productNameLabel"}
        >
          Name:
        </label>
        <input
          data-testid={"productName"}
          id="productName"
          autoComplete="false"
          type="text"
          defaultValue={editProduct.name}
          className="w-[250px] rounded-lg border border-stroke py-2 pl-6 pr-10 outline-none focus:border-orange-500 focus-visible:shadow-none"
          placeholder="Name"
          {...register("name", {
            required: "Name  is required",
          })}
        />
        <p className="text-sm text-red-500">{errors.name?.message}</p>
      </div>
      <div id="isAvailableContainer" className="">
        <label
          htmlFor="isAvailable"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Is Available:
        </label>
        <input
          type="checkbox"
          defaultChecked={editProduct.isAvailable}
          id="isAvailable"
          className="accent-orange-600"
          {...register("isAvailable", {})}
        />
        <p className="text-sm text-red-500">{errors.isAvailable?.message}</p>
      </div>
      <button className="w-[150px] rounded-lg mt-5 md:mt-3 border border-green-700 bg-green-600 p-2 font-medium text-white transition hover:bg-opacity-90">
        {isSubmitting || isLoading ? (
          <div className="flex justify-center">
            <CircleLoader size={20} color="white" />
          </div>
        ) : (
          "Edit Product"
        )}
      </button>
    </form>
  );
};
