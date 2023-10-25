import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncSingleProduct,
  getSingleProduct,
} from "../redux/productsSlice";
import { useEffect, useState } from "react";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import toast from "react-hot-toast";


export const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(getSingleProduct);
  const [imgURL, setImgURL] = useState("");

  const formatedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) {
        tempQty = product?.stock;
      }
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };


  const addToCartHandler = (product) => {
    dispatch(
      addToCart({ ...product, quantity: qty, totalPrice: qty * formatedPrice })
    );
    toast.success(`${qty} items added to the cart`)
    setQty(1);
  };

  useEffect(() => {
    dispatch(fetchAsyncSingleProduct(productId));
  }, [dispatch, productId]);

  return (
    <div className="flex flex-col  h-[80vh] items-center gap-8 sm:flex-row sm:gap-6 sm:justify-center mx-auto w-full  p-10 bg-white rounded-lg">
      <div className=" flex p-4 rounded-xl flex-col bg-[#ededed] gap-6">
        <img
          src={imgURL ? imgURL : product.thumbnail}
          className="aspect-square object-cover w-[320px]"
          alt=""
        />
        <div className="flex gap-2">
          {product.images?.map((image, idx) => {
            return (
              <img
                src={image}
                onClick={() => setImgURL(image)}
                className="w-[55px] sm:hidden md:block aspect-square cursor-pointer hover:scale-95 hover:border-2 hover:border-[#3483FA] object-cover"
                alt=""
                key={idx}
              />
            );
          })}
        </div>
      </div>
      <div className=" flex flex-col justify-center max-w-[350px] p-4 rounded-xl bg-[#ededed]  gap-8 text-center">
        <h2 className="text-2xl font-bold">{`${product.brand} - ${product.title}`}</h2>
        <p className="break-words">{product.description}</p>
        <div className="flex gap-2 justify-center items-center">
          <p className="line-through text-gray-500">${product.price}</p>
          <p className="text-xl font-semibold border-b-2 border-[#3483FA]">
            ${formatedPrice.toFixed(2)}
          </p>
          <p className="bg-red-600 p-1 uppercase text-white font-bold">
            ({Math.floor(product.discountPercentage)}%Off)
          </p>
        </div>
        <div className="flex items-center  justify-center gap-2">
          <p>Quantity:</p>
          <div className="flex">
            <button
              onClick={() => decreaseQty()}
              className="px-4 bg-[#ddd] border-2 font-bold border-black"
            >
              -
            </button>
            <p className="border-y-2 border-black p-2">{qty}</p>
            <button
              onClick={() => increaseQty()}
              className="px-4 bg-[#ddd] border-2 font-bold border-black"
            >
              +
            </button>
          </div>
        </div>


          <button
            className="bg-[#3483FA] rounded w-[200px] mx-auto  py-2 px-4 text-white uppercase font-bold"
            onClick={() => addToCartHandler(product)}
          >
            Add To Cart
          </button>
      </div>
    </div>
  );
};
