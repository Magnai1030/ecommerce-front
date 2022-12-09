import React, { FC } from "react";
import { ChildProps } from "@types";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<ChildProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
