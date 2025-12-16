"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart, AnyCartItem } from "@/context/CartContext";
import { toast } from "sonner";
import { 
  ChevronRight, 
  CreditCard, 
  Truck, 
  Shield, 
  Lock,
  ArrowLeft,
  Loader2,
  Play,
  Package,
  Zap
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, hasPhysicalItems, hasDigitalItems, addPurchasedCourse } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Always required
    const required = ["firstName", "lastName", "email", "phone"];
    
    // Only require address for physical items
    if (hasPhysicalItems) {
      required.push("address", "city", "state", "pincode");
    }
    
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (hasPhysicalItems && !/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }
    return true;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = () => {
    // Mark digital courses as purchased
    items.forEach((item) => {
      if (item.type === "course") {
        addPurchasedCourse(item.course.id);
      }
    });
    
    clearCart();
    
    // Navigate based on what was purchased
    if (hasDigitalItems && !hasPhysicalItems) {
      router.push("/order-success?type=digital");
    } else {
      router.push("/order-success?type=mixed");
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        setIsProcessing(false);
        return;
      }

      const digitalCount = items.filter(i => i.type === "course").length;
      const physicalCount = items.filter(i => i.type === "painting").length;
      
      let description = "";
      if (digitalCount > 0 && physicalCount > 0) {
        description = `${digitalCount} course(s) + ${physicalCount} painting(s)`;
      } else if (digitalCount > 0) {
        description = `${digitalCount} digital course(s)`;
      } else {
        description = `${physicalCount} painting(s)`;
      }

      const options = {
        key: "rzp_test_demo",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Shaily Verma Art Studio",
        description: description,
        image: "/favicon.ico",
        handler: function (response: any) {
          console.log("Payment successful:", response);
          toast.success("Payment successful!");
          handlePaymentSuccess();
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: hasPhysicalItems 
            ? `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
            : "Digital product - no shipping",
        },
        theme: {
          color: "#9B6B4A",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const getItemImage = (item: AnyCartItem) => {
    return item.type === "painting" ? item.painting.image : item.course.image;
  };

  const getItemTitle = (item: AnyCartItem) => {
    return item.type === "painting" ? item.painting.title : item.course.title;
  };

  const getItemPrice = (item: AnyCartItem) => {
    return item.type === "painting" ? item.size.price : item.course.price;
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl text-foreground mb-4">Your cart is empty</h1>
            <p className="font-body text-muted-foreground mb-8">
              Add some beautiful paintings or courses before checking out.
            </p>
            <Button variant="hero" asChild>
              <Link href="/gallery">Browse Gallery</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Checkout</span>
          </nav>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Checkout
          </h1>

          {/* Order type notice */}
          {hasDigitalItems && !hasPhysicalItems && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8 flex items-center gap-3">
              <Zap className="h-6 w-6 text-accent" />
              <div>
                <p className="font-body font-medium text-foreground">Digital Products Only</p>
                <p className="font-body text-sm text-muted-foreground">
                  No shipping required! You'll get instant access after payment.
                </p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-card p-6 rounded-xl shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address - Only for physical items */}
              {hasPhysicalItems && (
                <div className="bg-card p-6 rounded-xl shadow-soft">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street, Apartment 4B"
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Mumbai"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Maharashtra"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 py-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-5 w-5" />
                  <span className="font-body text-sm">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-5 w-5" />
                  <span className="font-body text-sm">Buyer Protection</span>
                </div>
                {hasPhysicalItems && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="h-5 w-5" />
                    <span className="font-body text-sm">Free Shipping</span>
                  </div>
                )}
                {hasDigitalItems && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="h-5 w-5" />
                    <span className="font-body text-sm">Instant Access</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-xl shadow-soft sticky top-28">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div
                      key={item.type === "painting" ? `${item.painting.id}-${item.size.name}` : item.course.id}
                      className="flex gap-3"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 relative">
                        <img
                          src={getItemImage(item)}
                          alt={getItemTitle(item)}
                          className="w-full h-full object-cover"
                        />
                        {item.type === "course" && (
                          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                            <Play className="h-4 w-4 text-background" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          {item.type === "course" ? (
                            <Play className="h-3 w-3 text-accent" />
                          ) : (
                            <Package className="h-3 w-3 text-primary" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {item.type === "course" ? "Course" : "Painting"}
                          </span>
                        </div>
                        <p className="font-body font-medium text-foreground text-sm truncate">
                          {getItemTitle(item)}
                        </p>
                        {item.type === "painting" && (
                          <p className="font-body text-xs text-muted-foreground">
                            {item.size.name} × {item.quantity}
                          </p>
                        )}
                        <p className="font-body text-sm text-primary font-medium">
                          ₹{(getItemPrice(item) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-2">
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
                  <Separator className="my-2" />
                  <div className="flex justify-between font-display text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <Button
                  variant="hero"
                  className="w-full mt-6"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Pay ₹{totalPrice.toLocaleString()}
                    </>
                  )}
                </Button>

                <p className="font-body text-xs text-muted-foreground text-center mt-4">
                  Powered by Razorpay · 100% Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

