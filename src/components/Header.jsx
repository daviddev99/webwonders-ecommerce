import { FaBars, FaShoppingBag } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import { clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getAllCategories } from "../redux/categorySlice";
import {
  deleteFromCart,
  getAllCart,
  getCartTotal,
  getTotalAmount,
} from "../redux/cartSlice";
import toast from "react-hot-toast";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector(getAllCategories);
  const cartProducts = useSelector(getAllCart);

  const { totalAmount, totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartProducts, dispatch]);

  const handleMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  const handleCart = (e) => {
    e.preventDefault();
    setOpenCart(!openCart);
  };

  const handleDelete = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("1 product deleted from the cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <header className=" h-20 w-full flex items-center  relative  bg-[#35A7FF] text-[#FFFFFF]">
      <div className="w-5/6 flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <FaBars onClick={handleMenu} className="cursor-pointer" />
          <h1 className="font-semibold flex gap-1 items-center text-slate-200 text-2xl">
          <FaShoppingBag/>
            <Link to={"/"}>
              Web<span className="font-extralight text-white">Wonders</span>
            </Link>
          </h1>
        </div>
        <div className="flex flex-col lg:gap-2 justify-center items-center">
          <div className="hidden sm:flex  relative items-center">
            <input
              type="text"
              className="outline-none text-orange-500 p-1 rounded-lg  w-[300px]"
            />
            <BiSearchAlt
              size={20}
              className="text-orange-500 cursor-pointer absolute right-2"
            />
          </div>
          <div className="flex gap-2 whitespace-nowrap text-ellipsis overflow-hidden">
            {categories.slice(0, 8).map((category, idx) => (
              <Link
                to={`category/${category}`}
                key={idx}
                className="hidden lg:block  text-xs uppercase border-b-2 border-gray-500  "
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative">
          <BsFillCartFill
            size={20}
            onClick={handleCart}
            className="cursor-pointer"
          />
          <p className="absolute -top-4 text-sm -right-3 px-1 text-[] bg-[#38618C] text-[#ffffff] rounded-full">
            {totalItems}
          </p>
        </div>

        {menu || openCart ? (
          <nav className="fixed w-full z-10 h-screen bg-black/80 top-0 left-0"></nav>
        ) : (
          ""
        )}

        <aside
          className={
            menu
              ? "fixed flex flex-col bg-white h-screen w-[300px] duration-300 top-0 left-0 z-10"
              : "fixed flex flex-col bg-white h-screen w-[300px] duration-300 top-0 left-[-100%] z-10"
          }
        >
          <div className="p-2 text-black flex justify-between items-center">
            <h3 className=" text-2xl">Categories</h3>
            <AiFillCloseCircle
              onClick={handleMenu}
              className="cursor-pointer text-red-600"
              size={20}
            />
          </div>
          <div className="flex flex-col gap-2 capitalize px-4">
            {categories.map((category, idx) => {
              return (
                <Link
                  to={`/category/${category}`}
                  key={idx}
                  className="text-black"
                >
                  <p>{category}</p>
                </Link>
              );
            })}
          </div>
        </aside>

        <aside
          className={
            openCart
              ? "fixed flex flex-col bg-white h-screen w-[350px] duration-300 top-0 right-0 z-10"
              : "fixed flex flex-col bg-white h-screen w-[350px] duration-300 top-0 right-[-100%] z-10"
          }
        >
          <div className="flex h-full flex-col  shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  Shopping Cart
                </h2>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={handleCart}
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8 rounded-lg">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200 ">
                    {cartProducts.length === 0 ? (
                      <div className="text-black">Any products here...</div>
                    ) : (
                      cartProducts.map((product) => {
                        return (
                          <li className="flex py-6" key={product.id}>
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.thumbnail}
                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">{product.title}</a>
                                  </h3>
                                  <p className="ml-4">
                                    ${product.totalPrice.toFixed(2)}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-black">
                                  Qty: {product.quantity}
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium p-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
                                    onClick={() => handleDelete(product)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#"
                className={
                  cartProducts.length > 0
                    ? "flex mx-auto items-center justify-center rounded-md border border-transparent w-[200px] bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm mb-4 hover:bg-red-500"
                    : "hidden"
                }
                onClick={handleClearCart}
              >
                Clear Cart
              </a>
            </div>

            <div
              className={
                cartProducts.length > 0
                  ? "border-t border-gray-200 px-4 py-6 sm:px-6"
                  : "hidden"
              }
            >
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>
                  {totalItems === 1
                    ? `${totalItems} item`
                    : `${totalItems} items`}
                </p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-[#3483fa] duration-150 hover:bg-[#1362d8] px-6 py-3 text-base font-medium text-white shadow-sm "
                >
                  Checkout
                </a>
              </div>

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  <Link
                    className="font-medium text-[#3483fa]"
                    to={"/"}
                    onClick={handleCart}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
};
