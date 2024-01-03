import { createSlice } from "@reduxjs/toolkit";
import { IToast } from "../../models/toast.model";
import * as firebaseService from "../../services/firebase.service";
import { IProduct } from "../../models/product.model";

// Shape of products array
interface IProductInterface {
  products: IProduct[];
  toast: IToast;
}

// Initial products state
const initialState: IProductInterface = {
  products: [],
  toast: {} as IToast,
};

// Constants
const collectionName: string = "products";

// UNCOMMENT TO USE FIRESTORE
// ENABLE OFFLINE CRUD OPERATIONS WHEN CONNECTION IS LOST
// firebaseService.getCollectionFromServerOrOfflineCache(
//   collectionName,
//   "name",
//   "!=",
//   ""
// );

/**
 * Redux-Toolkit uses `Immutable.js` which allows us to mutate(change) `🍽️ STATE` but
 * on the background everything works as immutated state.
 */
export const productslice = createSlice({
  /**
   * 🍰  SLICE NAME
   *
   */
  name: "product",
  /**
   * 🍽️ STATE
   *
   * Initial state
   *
   */
  initialState,
  /**
   *  👨🏿‍🍳 REDUCER
   *
   *  Response from a called `🍴 ACTION`.
   *  Performs actions to our immutable `🍽️ STATE` and returns the new state.
   *
   */
  reducers: {
    /**
     *
     * Adds a new PRODUCT to `🗂️ FIRESTORE` and saves a copy to the `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {IProduct} product
     */
    addProduct: (state, { payload: { id, name, isAvailable } }) => {
      try {
        let newproduct: IProduct = {
          id,
          name,
          isAvailable,
        };
        console.log("newproduct: ", newproduct);

        // UNCOMMENT TO USE FIRESTORE
        // firebaseService.addNewDocumentToCollection(
        //   collectionName,
        //   String(newproduct.id),
        //   newproduct
        // );

        state.products.push(newproduct);

        console.log("[ADDED NEW product]: ", newproduct);
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *
     * Deletes a PRODUCT from `🗂️ FIRESTORE` and the `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {string} productId
     *
     */
    deleteProduct: (state, { payload: { productId } }) => {
      try {
        console.log("productId:", productId);

        // UNCOMMENT TO USE FIRESTORE
        // firebaseService.deleteDocumentFromCollection(collectionName, productId);

        state.products = state.products.filter(
          (product) => product.id !== productId
        );

        console.log("[DELETED product]");
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *
     * Edits/Updates a PRODUCT on `🗂️ FIRESTORE` and the `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {IProduct} editedProduct
     *
     */
    editProduct: (state, { payload: { editedProduct } }) => {
      try {
        console.log("editedProduct: ", editedProduct);

        // UNCOMMENT TO USE FIRESTORE
        // firebaseService.updateDocumentInCollection(
        //   collectionName,
        //   editedProduct.id,
        //   editedProduct
        // );

        state.products = state.products.map((product) =>
          product.id === editedProduct.id ? editedProduct : product
        );

        console.log("[UPDATED product]: ", editedProduct);
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *
     * Toggles the PRODUCTS by a filter value.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {string} productId
     *
     */
    toggleProduct: (state, { payload: { productId, userId } }) => {
      state.products = state.products.map((product) =>
        product.id === productId
          ? { ...product, isAvailable: !product.name }
          : product
      );
    },
    /**
     *
     * Adds a new `ℹ️ TOAST` to the `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {IToast} newToast
     *
     */
    addToast: (
      state,
      {
        payload: {
          id,
          message,
          toastType,
          payload,
          isActive,
          headerText,
          timestamp,
          toastOwner,
        },
      }
    ) => {
      try {
        let newToast: IToast = {
          id,
          message,
          toastType,
          payload,
          isActive,
          headerText,
          timestamp,
          toastOwner,
        };
        console.log("newToast: ", newToast);

        // Current active toast
        state.toast = newToast;

        console.log("[ADDED NEW TOAST]: ", newToast);
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *
     * Deletes a `ℹ️ TOAST` from the `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {IToast} newToast
     *
     */
    deleteToast: (state, { payload: { toastId } }) => {
      try {
        console.log("delete toast: ", toastId);

        // Delete current toast
        state.toast = initialState.toast;

        console.log("[DELETED TOAST]: ", toastId);
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *
     * Edits a `ℹ️ TOAST` in a `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {string} productId
     *
     */
    editToast: (state, { payload: { editedToast } }) => {
      try {
        console.log("editedToast: ", editedToast);

        // Edit current toast
        state.toast = editedToast;

        console.log("[UPDATED TOAST]: ", editedToast);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

// `🍴 ACTIONS` for telling the `👨🏿‍🍳 REDUCER` what to do with `🍽️ STATE`, they can also include
// payload for changing state
export const {
  addProduct,
  deleteProduct,
  editProduct,
  toggleProduct,
  addToast,
  deleteToast,
  editToast,
} = productslice.actions;

// `👨🏿‍🍳 REDUCER` to change the `🍽️ STATE`
export default productslice.reducer;
