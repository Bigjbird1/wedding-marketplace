import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Lock } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { Truck } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MarketplaceCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vintage Wedding Dress",
      price: 899,
      originalPrice: 2200,
      size: "6",
      color: "Ivory",
      quantity: 1,
      image: "/api/placeholder/200/200?text=Wedding-Dress",
      seller: "Emma's Boutique",
      shipping: 25,
      condition: "Like New"
    },
    {
      id: 2,
      name: "Crystal Table Centerpieces (Set of 10)",
      price: 299,
      originalPrice: 450,
      quantity: 2,
      image: "/api/placeholder/200/200?text=Centerpieces",
      seller: "Wedding Decor Co",
      shipping: 35,
      condition: "New"
    }
  ]);

  const [shippingOption, setShippingOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const baseShipping = cartItems.reduce((sum, item) => sum + (item.shipping * item.quantity), 0);
    return shippingOption === 'express' ? baseShipping * 1.5 : baseShipping;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'WEDDING10') {
      setPromoError('');
      // Apply discount logic
    } else {
      setPromoError('Invalid promo code');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border p-6">
            <h1 className="text-xl font-semibold mb-6">Shopping Cart ({cartItems.length} items)</h1>

            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 py-6 border-t">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">Sold by {item.seller}</p>
                          {item.size && (
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          )}
                          <p className="text-sm text-gray-600">Condition: {item.condition}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${item.price}</div>
                          <div className="text-sm text-gray-500 line-through">
                            ${item.originalPrice}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-lg hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-lg hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            {/* Shipping Options */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Shipping</h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingOption === 'standard'}
                      onChange={() => setShippingOption('standard')}
                      className="text-gray-900"
                    />
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-gray-600">5-7 business days</p>
                    </div>
                  </div>
                  <span>${calculateShipping().toFixed(2)}</span>
                </label>

                <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingOption === 'express'}
                      onChange={() => setShippingOption('express')}
                      className="text-gray-900"
                    />
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-gray-600">2-3 business days</p>
                    </div>
                  </div>
                  <span>${(calculateShipping() * 1.5).toFixed(2)}</span>
                </label>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Promo Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg"
                  placeholder="Enter code"
                />
                <button
                  onClick={handlePromoCode}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-red-600 text-sm mt-1">{promoError}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>${calculateShipping().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Checkout
            </button>

            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                All marketplace purchases are protected by our buyer guarantee.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCart;
