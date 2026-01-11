"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

interface Cart {
  [key: string]: CartItem;
}

interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  getCart: () => Cart;
  getCartCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "dk_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart:", e);
    }
  }, []);

  const saveCart = (newCart: Cart) => {
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  const addToCart = (item: CartItem) => {
    const newCart = { ...cart };
    const id = item.id;

    if (newCart[id]) {
      newCart[id].qty = (newCart[id].qty || 0) + (item.qty || 1);
    } else {
      newCart[id] = {
        id,
        name: item.name,
        price: item.price || 0,
        qty: item.qty || 1,
      };
    }

    saveCart(newCart);
  };

  const removeFromCart = (id: string) => {
    const newCart = { ...cart };
    if (newCart[id]) {
      delete newCart[id];
      saveCart(newCart);
    }
  };

  const getCart = () => cart;

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, item) => sum + (item.qty || 0), 0);
  };

  const clearCart = () => {
    saveCart({});
    localStorage.removeItem(CART_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getCart,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
