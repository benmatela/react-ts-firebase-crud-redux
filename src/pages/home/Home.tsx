import React from "react";
import { Navbar } from "../../components/layout/Navbar";
import { IMenuListItem } from "../../models/menu-list-item.model";
import { Footer } from "../../components/layout/Footer";
import { Products } from "../products/Products";

export const Home = () => {
  const menuItems: IMenuListItem[] = [
    { id: 0, name: "Home", selected: false, icon: {}, linkTo: "/" },
    { id: 1, name: "Menu 2", selected: false, icon: {}, linkTo: "/" },
    { id: 2, name: "Menu 3", selected: false, icon: {}, linkTo: "/" },
  ];

  return (
    <>
      <Navbar menuItems={menuItems} />
      <Products />
      <Footer />
    </>
  );
};
