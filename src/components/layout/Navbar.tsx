import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IMenuListItem } from "../../models/menu-list-item.model";

export const Navbar = (props: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="text-black border shadow-md">
      <nav className="relative container mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="pt-2">
            <Link to="/">
              <h1
                id="navHeader"
                data-testid="navHeader"
                className="font-extrabold text-2xl"
              >
                React Firebase Products
              </h1>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden text-[#1B1C23]">
          <div
            className={
              toggleMenu
                ? "absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
                : "absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
            }
          >
            <ul>
              {props.menuItems.map((menuItem: IMenuListItem) => (
                <li key={menuItem.name} id="menuItem" data-testid={"menuItem"}>
                  <Link to={menuItem.linkTo} className="hover:text-orange-600">
                    {menuItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
