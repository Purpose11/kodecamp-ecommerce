import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SideBar from "./components/SideBar";
import { useState } from "react";
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Nav openSideBar={openSidebar} />
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
