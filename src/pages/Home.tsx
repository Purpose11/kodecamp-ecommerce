import { Link } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { useEffect, useState } from "react";

type products = {
  id: number;
  description: string;
  price: number;
  title: string;
  images: string[];
};
const Home = () => {
  const [products, setProducts] = useState<products[]>([]);
  const { isLoading, data, isError } = useFetch(
    ["products"],
    "https://api.escuelajs.co/api/v1/products"
  );

  useEffect(() => {
    if (Array.isArray(data)) {
      setProducts(data);
    }
    console.log(products);
  }, [data, products]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error Fetching data</h1>;
  }
  return (
    <div className="w-[80%] mx-auto h-fit lg:grid lg:grid-cols-4 md:grid md:grid-cols-3 flex flex-col lg:gap-[30px] gap-[10px] mt-[50px]">
      {products &&
        products.map((product) => {
          return (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className=" h-[350px] cursor-pointer"
            >
              <div className="w-full h-[250px] bg-[#F5F5F5]">
                <img
                  src={product.images[0]}
                  className="product-image"
                  alt="Product-image"
                />
              </div>
              <div className="w-full h-[64px] mt-[20px]">
                <h1 className="text-[16px] font-poppins font-medium">
                  {product.title}
                </h1>
                <p className="text-[16px] text-[#DB4444] font-poppins flex gap-[12px]">
                  ${product.price}{" "}
                  <span className="text-black line-through">
                    ${product.price + 50}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Home;
