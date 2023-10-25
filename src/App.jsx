import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { Header } from "./components/Header";
import { ProductPage } from "./pages/ProductPage";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/category/:category"} element={<CategoryPage />} />
        <Route path={"/product/:productId"} element={<ProductPage />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
};
