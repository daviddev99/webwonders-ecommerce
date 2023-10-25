import { useDispatch, useSelector } from "react-redux";
import { ProductList } from "../components/ProductList";
import { getAllProducts, getAllProductsStatus } from "../redux/productsSlice";
import { fetchAsyncProducts } from "../redux/productsSlice";
import { useEffect } from "react";
import { getAllCategories } from "../redux/categorySlice";
import { STATUS } from "../utils/status";

export const HomePage = () => {
  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getAllProductsStatus);
  const dispatch = useDispatch();

  const categories = useSelector(getAllCategories);

  let productsCatOne = products.filter(
    (product) => product.category === categories[0]
  );
  let productsCatTwo = products.filter(
    (product) => product.category === categories[1]
  );
  let productsCatThree = products.filter(
    (product) => product.category === categories[2]
  );
  let productsCatFour = products.filter(
    (product) => product.category === categories[3]
  );

  useEffect(() => {
    dispatch(fetchAsyncProducts(20));
  }, [dispatch]);

  const tempProducts = [];

  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);
      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  return (
    <main className=" w-full flex flex-col bg-[#ededed]">
      <div className="flex flex-col gap-4 my-4 w-5/6 max-w-7xl mx-auto">
        <div className="bg-white shadow-lg text-2xl w-full uppercase font-semibold p-3 truncate border-l-4 border-[#3483fa] text-gray-500">
          <h1>See our last products</h1>
        </div>
        {productsStatus === STATUS.LOADING ? (
          "Loading"
        ) : (
          <ProductList products={tempProducts} />
        )}

        <div className="bg-white shadow-lg text-2xl uppercase font-semibold p-3 border-l-4 border-[#3483fa] text-gray-500">
          <h1>{categories[0]}</h1>
        </div>
        <ProductList products={productsCatOne} />

        <div className="bg-white shadow-lg text-2xl uppercase font-semibold p-3 border-l-4 border-[#3483fa] text-gray-500">
          <h1>{categories[1]}</h1>
        </div>
        <ProductList products={productsCatTwo} />

        <div className="bg-white shadow-lg text-2xl uppercase font-semibold p-3 border-l-4 border-[#3483fa] text-gray-500">
          <h1>{categories[2]}</h1>
        </div>
        <ProductList products={productsCatThree} />

        <div className="bg-white shadow-lg text-2xl uppercase font-semibold p-3 border-l-4 border-[#3483fa] text-gray-500">
          <h1>{categories[3]}</h1>
        </div>
        <ProductList products={productsCatFour} />
      </div>
    </main>
  );
};
