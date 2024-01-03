import React from "react";
import * as productReducers from "../../../src/redux/products/products";
import { useDispatch } from "react-redux";
import { IToast } from "../../models/toast.model";
import TimeAgo from "timeago-react";

/**
 * This toast is shown when a successful ACTION is triggered and only if you trigger
 * "addToast" reducer.
 *
 * @param {IToast} props
 *
 * @returns {React.JSX.Element} component
 */
export const ErrorToast = ({ message, id, timestamp }: IToast): React.JSX.Element => {
  const dispatch = useDispatch();

  /**
   * Hides the toast
   */
  const toggleToast = () => {
    try {
      // Delete toast from state
      dispatch(productReducers.deleteToast({ toastId: id }));

      // Remove toast UI
      const toast = document.getElementById("dangerToast");
      if (toast) {
        toast.classList.toggle("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="dangerToast"
      className="flex items-center max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
        <span className="sr-only">Error icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>&nbsp;
      <span className="text-xs font-medium text-orange-600">
        <TimeAgo datetime={timestamp} />
      </span>
      <button
        type="button"
        onClick={toggleToast}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-danger"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};
