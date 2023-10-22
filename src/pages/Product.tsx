import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowsRotate } from "react-icons/fa6";
import { useCartContext } from "../hooks/UseCartContext";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";

type product = {
  id: number;
  description: string;
  price: number;
  title: string;
  images: string[];
};

interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Product = () => {
  const { addItem } = useCartContext();

  const [product, setProduct] = useState<product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [likeProduct, setLikeProduct] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const { id } = useParams();

  const { isLoading, data, isError } = useFetch(
    ["products"],
    `https://api.escuelajs.co/api/v1/products/${id}`
  );

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
    console.log(product);
  }, [data, product]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error Fetching data</h1>;
  }

  const handleAddITem = ({
    id,
    title,
    price,
    quantity,
    image,
  }: CartItemType) => {
    if (addItem) {
      addItem({ id, title, price, quantity, image });
      toast.success("Item added to cart successfully");
    }
  };

  return (
    <>
      <Link
        to="/"
        className=" ml-[20px] flex items-center gap-1 mt-[10px] text-blue-600"
      >
        <BiArrowBack /> <span> Back to home</span>
      </Link>
      <div className="w-[90%] lg:h-[600px] h-fit  mx-auto lg:mt-[50px] mt-[20px] flex  flex-col lg:flex-row lg:justify-between">
        <div className="lg:h-full h-fit lg:w-[700px] w-full flex lg:flex-row flex-col gap-3 justify-between">
          <div className="lg:h-full h-fit lg:w-[170px]  w-full flex lg:flex-col justify-center lg:justify-normal flex-row gap-[10px]">
            {product &&
              product.images &&
              product.images.map((image, index) => {
                return (
                  <img
                    src={image}
                    className="lg:w-[170px] lg:h-[138px] w-[100px] h-[100px] cursor-pointer"
                    alt="product image"
                    onClick={() => handleImageClick(index)}
                  />
                );
              })}
          </div>
          <div className="lg:w-[500px] w-full h-full  ">
            {product && product.images && product.images[selectedImage] && (
              <img
                src={product.images[selectedImage]}
                className="product-image"
                alt="product image"
              />
            )}
          </div>
        </div>
        <div className=" lg:w-[399px] w-full h-full">
          {product && (
            <div className="h-full flex flex-col">
              <h1 className="font-semibold lg:text-2xl text-xl mt-[10px] lg:mt-0">
                {product.title}
              </h1>
              <p className="lg:text-2xl text-xl lg:mt-[20px] mt-[10px]">
                ${product.price}
              </p>
              <p className="w-full text-[14px] lg:mt-[20px] mt-[10px]">
                {product.description}
              </p>
              <hr className="mt-[20px] border-t border-solid border-gray-500" />
              <div className="w-full h-[44px] flex items-center lg:justify-between gap-2 justify-center mt-[30px]">
                <div className="lg:w-[165px] w-[140px] h-full rounded-md border border-black flex items-center justify-between">
                  <button
                    className="w-[40px] h-full flex items-center justify-center border-r border-black"
                    onClick={decreaseQuantity}
                  >
                    <p className="text-[24px]">-</p>
                  </button>
                  <div className="w-[80px] flex items-center justify-center">
                    {quantity}
                  </div>
                  <button
                    className="w-[45px] h-full flex items-center justify-center bg-[#DB4444] rounded-r-md"
                    onClick={increaseQuantity}
                  >
                    <p className="text-[24px] text-white">+</p>
                  </button>
                </div>
                <div
                  className="lg:w-[165px] w-[100px] h-full rounded-md flex items-center justify-center bg-[#DB4444] cursor-pointer"
                  onClick={() =>
                    handleAddITem({
                      id: product.id,
                      title: product.title,
                      price: product.price * quantity,
                      quantity: quantity,
                      image: product.images[0],
                    })
                  }
                >
                  <p className="text-white lg:text-[16px] text-sm">
                    Add To Cart
                  </p>
                </div>
                <div className="lg:w-[40px] w-[30px] h-full rounded-sm border border-black flex items-center justify-center">
                  <AiFillHeart
                    className={`lg:w-[32px] lg:h-[32px] w-[25px] h-[25px] cursor-pointer ${
                      likeProduct ? "text-[#DB4444] " : "text-[#CBCDD4]"
                    }`}
                    onClick={() => setLikeProduct(!likeProduct)}
                  />
                </div>
              </div>
              <div className="w-full h-[180px] mt-[40px] border border-black flex flex-col">
                <div className="flex-grow border-b border-black flex items-center">
                  <div className="flex  gap-[10px] items-center justify-between ml-[20px]">
                    <TbTruckDelivery className="lg:w-[40px]  w-[35px] lg:h-[40px] h-[35px] shrink-0" />
                    <div>
                      <h1 className="lg:text-[16px] text-[15px] font-medium">
                        Free Delivery
                      </h1>
                      <p className="text-[12px] font-medium">
                        Enter your postal code for Delivery Availability.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-grow flex items-center">
                  <div className="flex  gap-[10px] items-center justify-between ml-[20px]">
                    <FaArrowsRotate className="lg:w-[40px]  w-[35px] lg:h-[40px] h-[35px] shrink-0" />
                    <div>
                      <h1 className="lg:text-[16px] text-[15px] font-medium">
                        Return Delivery
                      </h1>
                      <p className="text-[12px] font-medium">
                        Free 30 Days Delivery Returns. Details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
