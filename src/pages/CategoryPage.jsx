import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryProducts,
  getCategoryProducts,
  getCategoryProductsStatus,
} from "../redux/categorySlice";
import { useParams } from "react-router-dom";
import { ProductList } from "../components/ProductList";
import { STATUS } from "../utils/status";

export const CategoryPage = () => {
  const dispatch = useDispatch();
  const categoryProducts = useSelector(getCategoryProducts);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchCategoryProducts(category));
  }, [dispatch, category]);

  return (
    <main className=" w-full h-[80vh] flex bg-[#ededed] ">
      <div className="flex-col flex gap-4 mt-4 w-5/6 max-w-7xl mx-auto">
        <div className="bg-white text-2xl uppercase font-semibold p-3 border-l-4 border-green-600 text-gray-500">
          <h1>{category}</h1>
        </div>
        {categoryProductsStatus === STATUS.LOADING ? (
          "Loading"
        ) : (
          <ProductList products={categoryProducts} />
        )}
      </div>
    </main>
  );
};
