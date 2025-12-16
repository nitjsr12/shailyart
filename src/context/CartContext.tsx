import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Painting, PaintingSize } from "@/data/paintings";
import { Course } from "@/data/courses";

export interface CartItem {
  type: "painting";
  painting: Painting;
  size: PaintingSize;
  quantity: number;
}

export interface DigitalCartItem {
  type: "course";
  course: Course;
  quantity: 1; // Digital products always have quantity 1
}

export type AnyCartItem = CartItem | DigitalCartItem;

interface CartContextType {
  items: AnyCartItem[];
  addItem: (painting: Painting, size: PaintingSize) => void;
  addCourse: (course: Course) => void;
  removeItem: (id: string | number, sizeOrType?: string) => void;
  updateQuantity: (id: string | number, sizeOrType: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  hasPhysicalItems: boolean;
  hasDigitalItems: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  purchasedCourses: string[];
  addPurchasedCourse: (courseId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "shaily-verma-cart";
const PURCHASED_COURSES_KEY = "shaily-verma-purchased-courses";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<AnyCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage");
      }
    }
    
    const savedPurchases = localStorage.getItem(PURCHASED_COURSES_KEY);
    if (savedPurchases) {
      try {
        setPurchasedCourses(JSON.parse(savedPurchases));
      } catch (e) {
        console.error("Failed to parse purchased courses from localStorage");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(PURCHASED_COURSES_KEY, JSON.stringify(purchasedCourses));
  }, [purchasedCourses]);

  const addItem = (painting: Painting, size: PaintingSize) => {
    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (item) => item.type === "painting" && item.painting.id === painting.id && item.size.name === size.name
      );

      if (existingIndex >= 0) {
        const updated = [...currentItems];
        (updated[existingIndex] as CartItem).quantity += 1;
        return updated;
      }

      return [...currentItems, { type: "painting", painting, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const addCourse = (course: Course) => {
    // Check if already purchased
    if (purchasedCourses.includes(course.id)) {
      return;
    }
    
    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (item) => item.type === "course" && item.course.id === course.id
      );

      if (existingIndex >= 0) {
        // Already in cart
        return currentItems;
      }

      return [...currentItems, { type: "course", course, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string | number, sizeOrType?: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => {
        if (item.type === "painting") {
          return !(item.painting.id === id && item.size.name === sizeOrType);
        } else {
          return item.course.id !== id;
        }
      })
    );
  };

  const updateQuantity = (id: string | number, sizeOrType: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, sizeOrType);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.type === "painting" && item.painting.id === id && item.size.name === sizeOrType) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const addPurchasedCourse = (courseId: string) => {
    setPurchasedCourses((prev) => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    if (item.type === "painting") {
      return sum + item.size.price * item.quantity;
    } else {
      return sum + item.course.price * item.quantity;
    }
  }, 0);

  const hasPhysicalItems = items.some((item) => item.type === "painting");
  const hasDigitalItems = items.some((item) => item.type === "course");

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addCourse,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        hasPhysicalItems,
        hasDigitalItems,
        isCartOpen,
        setIsCartOpen,
        purchasedCourses,
        addPurchasedCourse,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
