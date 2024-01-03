/**
 * A toast is the notification shown on the screen after
 * a `REDUX ACTION` has been dispatched
 */
export interface IToast {
  /**
   * ID of the toast
   */
  id: string;
  /**
   * What triggered the toast?
   */
  toastOwner: string;
  /**
   * Message shown on toast
   */
  message: string;
  /**
   * The type of toast - danger, warning, success, none
   */
  toastType: TOAST_TYPE;
  /**
   * The body of the item that triggered the toast
   */
  payload: any;
  /**
   * Is the toast shown on the screen?
   */
  isActive: boolean;
  /**
   * Toast header
   */
  headerText: string;
  /**
   * The time the toast was triggered
   */
  timestamp: string;
}

/**
 * The type of toast to show on the screen
 */
export enum TOAST_TYPE {
  /**
   * Action is successful
   */
  SUCCESS = "success",
  /**
   * Action is successful with a warning message
   */
  WARNING = "warning",
  /**
   * Action is not successful
   */
  ERROR = "error",
  /**
   * Nothing happened
   */
  NONE = "none",
  /**
   * The App sent a status update
   */
  STATUS = "status",
}
