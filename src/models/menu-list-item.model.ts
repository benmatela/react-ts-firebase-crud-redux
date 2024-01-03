/**
 * Menu List Item model
 */
export interface IMenuListItem {
  /**
   * Unique ID
   */
  id: number;
  /**
   * Name/label of the menu item
   */
  name: string;
  /**
   * Is the menu item selected?
   */
  selected: boolean;
  /**
   * Icon showed next to the menu item name
   */
  icon: any;
  /**
   * Path for this menu item
   */
  linkTo: string;
}
