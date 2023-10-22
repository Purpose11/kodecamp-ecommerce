import { MdClose } from "react-icons/md";
import { useCartContext } from "../hooks/UseCartContext";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const { cartArray, deleteItem } = useCartContext();

  const calculateSubtotal = () => {
    let subtotal = 0;

    if (cartArray) {
      cartArray.forEach((cartItem) => {
        subtotal += cartItem.price;
      });
    }

    return subtotal;
  };

  const handleDelete = (index: number) => {
    if (deleteItem) {
      deleteItem(index);
      toast.success("Item deleted to cart successfully");
    }
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="flex items-center justify-between border-b border-black px-2 py-2">
        <h1 className="lg:text-2xl text-xl font-bold">Cart Review</h1>
        <MdClose
          className="text-2xl cursor-pointer hover:bg-red-500 hover:text-white"
          onClick={onClose}
        />
      </div>

      {cartArray && cartArray.length > 0 ? (
        <>
          {" "}
          <div className="w-full h-[70vh]  mt-[20px] overflow-auto flex flex-col gap-2">
            {cartArray.map((cartItem, index) => {
              return (
                <div
                  className="w-full h-fit  flex items-center gap-[10px] px-2 pb-2"
                  key={cartItem.id}
                >
                  <img src={cartItem.image} className="h-[100px] w-[100px]" />
                  <div className="flex flex-col gap-1 flex-grow">
                    <h1 className="lg:text-xl text-lg font-semibold">
                      {cartItem.title}
                    </h1>
                    <p>${cartItem.price}</p>
                    <button
                      className="h-[40px] w-fit px-2 bg-[#DB4444] text-white rounded-md"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <p>{cartItem.quantity} QTY</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between p-2 border-y border-black">
            <h1 className="lg:text-2xl text-xl font-bold">Subtotal:</h1>
            <h1 className="lg:text-2xl text-xl font-bold">
              ${calculateSubtotal()}
            </h1>
          </div>
          <button className="h-[40px] rounded-md w-[100px] bg-[#7F1D1D] text-white mt-[20px] ml-2 cursor-pointer">
            Checkout
          </button>
        </>
      ) : (
        <div className="w-full h-fit flex flex-col items-center justify-center mt-[50px]">
          <BsCart3 className="text-[50px]" />
          <h1 className="mt-[20px] text-xl">Oops! Your cart is empty!</h1>
        </div>
      )}
    </div>
  );
};

export default SideBar;
