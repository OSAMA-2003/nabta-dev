import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Navigation / View State
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Notification Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Cart State with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nabta_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { product: products[0], quantity: 1 },
      { product: products[1], quantity: 1 },
      { product: products[2], quantity: 1 },
    ];
  });

  // Wishlist State with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nabta_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['prod-2', 'prod-4'];
  });

  // Discount / Coupon Code
  const [coupon, setCoupon] = useState({ code: '', discountPercent: 0 });

  // User State with localStorage persistence
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nabta_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      id: 'usr-1',
      name: 'المهندس أسامة أحمد',
      email: 'osama.ahmed@example.com',
      phone: '01029317818',
      farmName: 'مزرعة الخير الحديثة',
      region: 'البحيرة والنوبارية',
      city: 'النوبارية',
      areaFeddan: '50',
      isLoggedIn: true
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nabta_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('nabta_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const loginUser = (userData) => {
    const fullUser = {
      ...userData,
      id: userData.id || `usr-${Date.now()}`,
      isLoggedIn: true
    };
    setUser(fullUser);
    try {
      localStorage.setItem('nabta_user', JSON.stringify(fullUser));
    } catch {
      // ignore
    }
    showToast(`مرحباً بك م. ${fullUser.name}! تم تسجيل الدخول وحفظ البيانات بنجاح`);
  };

  const logoutUser = () => {
    const guestUser = {
      id: '',
      name: 'زائر',
      email: '',
      phone: '',
      farmName: '',
      region: '',
      city: '',
      areaFeddan: '',
      isLoggedIn: false
    };
    setUser(guestUser);
    try {
      localStorage.removeItem('nabta_user');
    } catch {
      // ignore
    }
    showToast('تم تسجيل الخروج بنجاح', 'info');
  };

  // Orders State (Initial past order)
  const [orders, setOrders] = useState([
    {
      id: 'NABTA-2026-8192',
      date: '2026-11-12',
      status: 'delivered', // 'processing' | 'shipped' | 'delivered'
      statusLabel: 'تم التوصيل للمزرعة',
      items: [
        { product: products[0], quantity: 2, price: 285 },
        { product: products[3], quantity: 1, price: 360 }
      ],
      subtotal: 930,
      shipping: 50,
      discount: 0,
      total: 980,
      paymentMethod: 'إنستاباي / فودافون كاش (InstaPay)',
      shippingAddress: 'محافظة البحيرة، النوبارية، طريق مصر إسكندرية الصحراوي، مزرعة الخير',
      customerName: 'المهندس أسامة أحمد',
      customerPhone: '01029317818',
      estimatedDelivery: '2026-11-14'
    }
  ]);
  const [latestOrder, setLatestOrder] = useState(null);

  // Navigation Helper
  const navigate = (view, payload = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'product-details' && payload) {
      setSelectedProduct(payload);
    }
    if (view === 'catalog') {
      if (typeof payload === 'string') {
        setSelectedCategoryFilter(payload);
      }
    }
    setCurrentView(view);
  };

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`تمت إضافة "${product.name.slice(0, 30)}..." إلى سلة التسوق`);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('تم حذف المنتج من السلة', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'NABTA10') {
      setCoupon({ code: 'NABTA10', discountPercent: 10 });
      showToast('تم تطبيق كود الخصم (10% خصم على الطلب)!');
      return true;
    } else if (code.trim().toUpperCase() === 'VIP50') {
      setCoupon({ code: 'VIP50', discountPercent: 15 });
      showToast('تم تطبيق كود المزارع المعتمدة (15% خصم)!');
      return true;
    } else {
      showToast('كود الخصم غير صحيح أو منتهي الصلاحية', 'error');
      return false;
    }
  };

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('تمت إزالة المنتج من قائمة المفضلة', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('تمت إضافة المنتج إلى قائمة المفضلة');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const freeShippingThreshold = 1500;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 50;

  const discountAmount = useMemo(() => {
    if (coupon.discountPercent > 0) {
      return Math.round((subtotal * coupon.discountPercent) / 100);
    }
    return 0;
  }, [subtotal, coupon]);

  const total = useMemo(() => {
    const calc = subtotal - discountAmount + shippingFee;
    return calc > 0 ? calc : 0;
  }, [subtotal, discountAmount, shippingFee]);

  // Order Placement
  const placeOrder = (orderFormData) => {
    const newOrderId = `NABTA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      statusLabel: 'قيد التجهيز بمستودعات نبتة',
      items: [...cartItems],
      subtotal,
      shipping: shippingFee,
      discount: discountAmount,
      total,
      paymentMethod: orderFormData.paymentMethod || 'فودافون كاش / إنستاباي (InstaPay)',
      shippingAddress: `${orderFormData.region || ''}، ${orderFormData.city || ''}، ${orderFormData.farmName || ''} - ${orderFormData.addressDetails || ''}`,
      customerName: orderFormData.fullName || user.name,
      customerPhone: orderFormData.phone || user.phone,
      estimatedDelivery: 'خلال 48 ساعة'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    navigate('order-confirmation');
    showToast('تم تأكيد طلبك بنجاح!');
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigate,
        selectedProduct,
        setSelectedProduct,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        shippingFee,
        isFreeShipping,
        freeShippingThreshold,
        discountAmount,
        coupon,
        applyCoupon,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        latestOrder,
        setLatestOrder,
        placeOrder,
        user,
        setUser,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
