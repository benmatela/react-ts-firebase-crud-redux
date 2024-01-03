import React from "react";

/**
 * https://codepen.io/f7deat/pen/JjROpPv
 *
 * @param props
 * @returns
 */
export const MessageModal = (props: any) => {
  const toggleModal = () => {
    const modal = document.getElementById("messageModal");
    if (modal) {
      modal.classList.toggle("hidden");
    }
  };

  return (
    <div
      className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
      id="messageModal"
      data-testid="messageModal"
    >
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="font-bold text-center text-2xl text-black"  id="modalHeader"
          data-testid="modalHeader">
              {props.header}
            </h2>
          </div>
          <hr></hr>
          <div className="bg-white text-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <p  id="modalMessage"
          data-testid="modalMessage">{props.message}</p>
          </div>
          <div className="px-4 py-3 text-right">
            <hr></hr>
            {props.showOkBtn ? (
              <button
                type="button"
                className="py-2 px-4 mt-4 hover:bg-black hover:text-white text-black border-black border-2 rounded bg-white mr-2"
                onClick={toggleModal}
                disabled={props.isLoading}
              >
                <i className="fas fa-times"></i> Ok
              </button>
            ) : null}

            {/* {dataUri.length > 0 ? (
                <button
                  type="button"
                  className="py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-700 mr-2"
                >
                  <i className="fas fa-plus"></i> Search
                </button>
              ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};
