import { Link } from "react-router-dom";

export const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products?.slice(0, 10).map((product) => {
        const formatedPrice =
          product.price - (product.price * product.discountPercentage) / 100;

        return (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className=" lg:hover:scale-105 duration-150 overflow-hidden relative text-center bg-white rounded-xl w-full shadow-lg"
          >
            <img
              src={product?.thumbnail}
              className=" aspect-video md:aspect-square object-cover"
              alt=""
            />
            <div className=" p-2 flex flex-col gap-2">
              <p className="absolute uppercase font-bold text-lg lg:text-sm top-4 left-0 text-white hidden lg:block bg-[#39B54A] p-2">
                {product.category}
              </p>
              <p className="text-gray-400 flex gap-2 text-center">
                Brand:{" "}
                <span className="text-black font-semibold truncate">
                  {product.brand}
                </span>
              </p>
              <div className="w-full h-[2px] bg-[#eee]"></div>
              <p className="text-lg font-bold capitalize truncate">{product.title}</p>
              <div className="flex gap-2 justify-center">
                <p className="line-through text-gray-500">${product.price}</p>
                <p className="text-lg font-semibold border-b-2 border-[#39B54A]">
                  ${formatedPrice.toFixed(2)}
                </p>
                <p className="text-white bg-red-500 p-1 font-bold truncate">
                  -{Math.floor(product.discountPercentage)}%
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
