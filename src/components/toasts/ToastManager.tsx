import React from "react";
import { ErrorToast } from "./ErrorToast";
import { SuccessToast } from "./SuccessToast";
import { WarningToast } from "./WarningToast";
import { IToast, TOAST_TYPE } from "../../models/toast.model";

/**
 * This is used to display a toast on any action perfomed by a user for
 * example adding a new device
 *
 * @param {IToast} toast
 *
 * @returns {React.JSX.Element} component
 */
export const ToastManager = ({
  id,
  message,
  toastType,
  payload,
  isActive,
  headerText,
  timestamp,
  toastOwner,
}: IToast): React.JSX.Element => {
  return (
    <div className="w-full">
      {id && id.length > 0 ? (
        <>
          {toastType === TOAST_TYPE.SUCCESS && isActive ? (
            <SuccessToast
              message={message}
              id={id}
              toastType={toastType}
              payload={payload}
              isActive={isActive}
              headerText={headerText}
              timestamp={timestamp}
              toastOwner={toastOwner}
            />
          ) : null}
          {toastType === TOAST_TYPE.WARNING && isActive ? (
            <WarningToast
              message={message}
              id={id}
              toastType={toastType}
              payload={payload}
              isActive={isActive}
              headerText={headerText}
              timestamp={timestamp}
              toastOwner={toastOwner}
            />
          ) : null}
          {toastType === TOAST_TYPE.ERROR && isActive ? (
            <ErrorToast
              message={message}
              id={id}
              toastType={toastType}
              payload={payload}
              isActive={isActive}
              headerText={headerText}
              timestamp={timestamp}
              toastOwner={toastOwner}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};
