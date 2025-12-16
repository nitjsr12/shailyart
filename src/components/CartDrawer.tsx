"use client";

import { useCart, AnyCartItem } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Play, Package } from "lucide-react";
import Link from "next/link";

const CartDrawer = () => {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeItem, 
    updateQuantity, 
    totalItems, 
    totalPrice,
    clearCart,
    hasPhysicalItems,
    hasDigitalItems
  } = useCart();

  const getItemImage = (item: AnyCartItem) => {
    if (item.type === "painting") {
      return item.painting.image;
    }
    return item.course.image;
  };

  const getItemTitle = (item: AnyCartItem) => {
    if (item.type === "painting") {
      return item.painting.title;
    }
    return item.course.title;
  };

  const getItemPrice = (item: AnyCartItem) => {
    if (item.type === "painting") {
      return item.size.price;
    }
    return item.course.price;
  };

  const getItemLink = (item: AnyCartItem) => {
    if (item.type === "painting") {
      return `/painting/${item.painting.slug}`;
    }
    return `/course/${item.course.slug}`;
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">Your cart is empty</h3>
            <p className="font-body text-muted-foreground mb-6">
              Discover beautiful paintings and courses
            </p>
            <Button variant="elegant" onClick={() => setIsCartOpen(false)} asChild>
              <Link href="/gallery">Browse Gallery</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.type === "painting" ? `${item.painting.id}-${item.size.name}` : item.course.id}
                  className="flex gap-4 bg-secondary/30 rounded-lg p-3"
                >
                  {/* Image */}
                  <Link 
                    href={getItemLink(item)}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 relative"
                  >
                    <img
                      src={getItemImage(item)}
                      alt={getItemTitle(item)}
                      className="w-full h-full object-cover"
                    />
                    {item.type === "course" && (
                      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                        <Play className="h-6 w-6 text-background" />
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      {item.type === "course" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                          <Play className="h-3 w-3" /> Course
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          <Package className="h-3 w-3" /> Painting
                        </span>
                      )}
                    </div>
                    <Link 
                      href={getItemLink(item)}
                      onClick={() => setIsCartOpen(false)}
                    >
                      <h4 className="font-display font-medium text-foreground truncate hover:text-primary transition-colors mt-1">
                        {getItemTitle(item)}
                      </h4>
                    </Link>
                    {item.type === "painting" && (
                      <p className="font-body text-sm text-muted-foreground">
                        Size: {item.size.name} ({item.size.dimensions})
                      </p>
                    )}
                    {item.type === "course" && (
                      <p className="font-body text-sm text-muted-foreground">
                        {item.course.lessonsCount} lessons · {item.course.totalDuration}
                      </p>
                    )}
                    <p className="font-body font-semibold text-primary mt-1">
                      ₹{getItemPrice(item).toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      {item.type === "painting" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.painting.id, item.size.name, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-body text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.painting.id, item.size.name, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="font-body text-xs text-muted-foreground">
                          Digital Product
                        </span>
                      )}
                      <button
                        onClick={() => removeItem(
                          item.type === "painting" ? item.painting.id : item.course.id,
                          item.type === "painting" ? item.size.name : undefined
                        )}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Cart Footer */}
            <SheetFooter className="flex-col gap-4 pt-4 sm:flex-col">
              {/* Order type indicators */}
              <div className="w-full flex gap-2 flex-wrap">
                {hasPhysicalItems && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <Package className="h-4 w-4" /> Physical items (shipping required)
                  </span>
                )}
                {hasDigitalItems && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                    <Play className="h-4 w-4" /> Digital items (instant access)
                  </span>
                )}
              </div>

              {/* Subtotal */}
              <div className="w-full space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                {hasPhysicalItems && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-display text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-2">
                <Button variant="hero" className="w-full" asChild>
                  <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
