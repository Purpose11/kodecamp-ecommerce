import { ReactNode, createContext } from "react";
import { useState } from "react";

interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}
interface CartContextType {
  cartArray: CartItemType[];
  addItem?: (item: CartItemType) => void;
  deleteItem?: (itemIndex: number) => void;
}

type myProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: myProviderProps) {
  const [cartArray, setCartArray] = useState<CartItemType[] | []>([]);

  const addItem = (item: CartItemType) => {
    setCartArray([...cartArray, item]);
  };

  const deleteItem = (itemIndex: number) => {
    if (itemIndex >= 0 && itemIndex < cartArray.length) {
      const updatedCartArray = [...cartArray];
      updatedCartArray.splice(itemIndex, 1);
      setCartArray(updatedCartArray);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartArray,
        addItem,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
