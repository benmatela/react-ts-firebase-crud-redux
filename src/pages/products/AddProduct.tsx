import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as productReducers from "../../redux/products/products";
import { useForm } from "react-hook-form";
import { CircleLoader } from "react-spinners";
import { TOAST_TYPE } from "../../models/toast.model";
import { IProduct } from "../../models/product.model";

type AddProductProps = {
  userId: string;
};

/**
 * Add PRODUCT page
 *
 * @param {AddProductProps} props
 *
 * @returns {React.JSX.Element} component
 */
export const AddProduct = ({ userId }: AddProductProps) => {
  const dispatch = useDispatch();
  const form = useForm<IProduct>({});
  const { register, control, handleSubmit, formState, watch } = form;
  const { isSubmitting, isDirty, isValid, errors } = formState;

  /**
   * Dispatches action to the reducer to add new "product" with unique id.
   *
   * We save the product info into Firestore and to Redux.
   *
   * It also resets input to empty "".
   *
   * @param {IProduct} product
   */
  const onSubmit = async (product: IProduct) => {
    try {
      product.id = uuidv4();
      product.isAvailable = true;

      // Add a new PRODUCT to the state and `🗂️ FIRESTORE`
      dispatch(productReducers.addProduct(product));

      // Add a new `ℹ️ TOAST` to the state
      dispatch(
        productReducers.addToast({
          id: product.id,
          message: "Product added successfully...",
          toastType: TOAST_TYPE.SUCCESS,
          payload: product,
          isActive: true,
          headerText: product.name,
          timestamp: new Date().toString(),
          toastOwner: product.name,
        })
      );

      form.reset();
    } catch (error: any) {
      console.error(error);
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
          htmlFor="name"
          data-testid={"nameLabel"}
        >
          Name:
        </label>
        <input
          data-testid={"name"}
          id="name"
          autoComplete="false"
          type="text"
          className="w-[250px] rounded-lg border border-stroke py-2 pl-6 pr-10 outline-none focus:border-orange-500 focus-visible:shadow-none"
          placeholder="Name"
          {...register("name", {
            required: "Name  is required",
          })}
        />
        <p className="text-sm text-red-500">{errors.name?.message}</p>
      </div>
      <button
        disabled={isSubmitting}
        className="w-[150px] mt-5 rounded-lg md:mt-3 border border-green-700 bg-green-600 font-medium p-2 text-white transition hover:bg-opacity-90"
      >
        {isSubmitting ? (
          <div className="flex justify-center">
            <CircleLoader size={20} color="white" />
          </div>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};
