import React from "react";

import Footer from "../footer/Footer";
import Header from "../Header/Header";

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout(props: ILayoutProps) {
  return (
    <>
      <Header />
      <main>
        {props.children}
        <Footer />
      </main>
    </>
  );
}

export default Layout;
