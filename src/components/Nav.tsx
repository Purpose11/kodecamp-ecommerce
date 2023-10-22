import { BsCart3 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useCartContext } from "../hooks/UseCartContext";

interface NavBarProps {
  openSideBar: () => void;
}

const Nav: React.FC<NavBarProps> = ({ openSideBar }) => {
  const { cartArray } = useCartContext();

  const cartItemCount = cartArray ? cartArray.length : 0;
  return (
    <div className="w-full lg:h-[60px] h-fit border-b border-gray-300 flex  flex-col lg:flex-row items-center lg:justify-between justify-center gap-[10px] lg:px-[60px] px-[10px] py-2">
      <h1 className="font-bold lg:text-2xl text-xl">Kodecamp-ecommerce</h1>
      <div className=" flex items-center justify-between lg:w-[25%] w-full h-fit ">
        <div className="flex items-center justify-between h-[38px] w-[243px] lg:px-2 px-3 bg-[#F5F5F5] rounded-md">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="border-none outline-none text-sm bg-transparent"
          />
          <FiSearch className="w-[24px] h-[24px]" />
        </div>
        <div className="relative">
          <BsCart3
            className="w-[32px] h-[32px] cursor-pointer"
            onClick={openSideBar}
          />
          {cartItemCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
