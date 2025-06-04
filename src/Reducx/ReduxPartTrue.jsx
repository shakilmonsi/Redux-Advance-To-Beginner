// ReduxPartTrue.jsx
import React from "react"; // React ইম্পোর্ট করা হয়েছে
import { Provider, useDispatch, useSelector } from "react-redux"; // Redux স্টোর সরবরাহ করার জন্য Provider, useDispatch, useSelector ইম্পোর্ট করা হয়েছে
import { createStore } from "redux"; // Redux থেকে createStore ইম্পোর্ট করা হয়েছে

// Action Types
const ADD_TO_CART = "ADD_TO_CART"; // কার্টে পণ্য যোগ করার অ্যাকশন টাইপ
const REMOVE_FROM_CART = "REMOVE_FROM_CART"; // কার্ট থেকে পণ্য সরানোর অ্যাকশন টাইপ

// Initial State for the Shopping Cart
const initialCartState = {
  products: [], // কার্টে থাকা পণ্যের তালিকা
  totalItems: 0, // কার্টে মোট পণ্যের সংখ্যা
};

// Action Creators
// addToCart অ্যাকশন ক্রিয়েটর (কার্টে পণ্য যোগ করার জন্য)
const addToCart = (product) => {
  return {
    type: ADD_TO_CART, // অ্যাকশন টাইপ
    payload: product, // যে পণ্যটি কার্টে যোগ হবে
  };
};

// removeFromCart অ্যাকশন ক্রিয়েটর (কার্ট থেকে পণ্য সরানোর জন্য)
const removeFromCart = (productId) => {



  return {
    type: REMOVE_FROM_CART, // অ্যাকশন টাইপ
    payload: productId, // যে পণ্যের ID কার্ট থেকে সরাতে হবে
  };
};

// Reducer to handle the actions
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // ✅ Added block scope
      // পণ্যটি যদি ইতিমধ্যেই কার্টে থাকে, তাহলে শুধু তার quantity বাড়ান
      const existingProductIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        const updatedProducts = [...state.products];
        const existingProduct = updatedProducts[existingProductIndex];
        const updatedItem = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        updatedProducts[existingProductIndex] = updatedItem;

        return {
          ...state,
          products: updatedProducts,
          totalItems: state.totalItems + 1,
        };
      } else {
        // পণ্যটি যদি কার্টে না থাকে, তাহলে নতুন করে যোগ করুন
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          products: [...state.products, newItem],
          totalItems: state.totalItems + 1,
        };
      }
    } // ✅ Closed block scope

    case REMOVE_FROM_CART: {
      // ✅ Added block scope
      const productToRemoveIndex = state.products.findIndex(
        (item) => item.id === action.payload
      );

      if (productToRemoveIndex < 0) {
        return state; // যদি পণ্য না থাকে, স্টেট অপরিবর্তিত রাখুন
      }

      const productToRemove = state.products[productToRemoveIndex];
      let updatedProducts; // ✅ Changed to let as it's reassigned

      if (productToRemove.quantity > 1) {
        // যদি quantity 1 এর বেশি হয়, quantity কমান
        updatedProducts = [...state.products];
        const updatedItem = {
          ...productToRemove,
          quantity: productToRemove.quantity - 1,
        };
        updatedProducts[productToRemoveIndex] = updatedItem;
      } else {
        // যদি quantity 1 হয়, পণ্যটি কার্ট থেকে সরান
        updatedProducts = state.products.filter(
          (item) => item.id !== action.payload
        );
      }

      return {
        ...state,
        products: updatedProducts,
        totalItems: state.totalItems - 1,
      };
    } // ✅ Closed block scope

    default:
      return state; // যদি কোনো অ্যাকশন মিলে না যায়, তবে বর্তমান স্টেট ফিরিয়ে দিন
  }
};

// Store creation
const store = createStore(cartReducer); // cartReducer ব্যবহার করে store তৈরি করা হয়েছে

// ProductList Component
const productsData = [
  {
    id: 1,
    name: "Apple",
    price: 1.0,
    image: "https://placehold.co/100x100/FF0000/FFFFFF?text=Apple",
  },
  {
    id: 2,
    name: "Banana",
    price: 0.5,
    image: "https://placehold.co/100x100/FFFF00/000000?text=Banana",
  },
  {
    id: 3,
    name: "Orange",
    price: 0.75,
    image: "https://placehold.co/100x100/FFA500/FFFFFF?text=Orange",
  },
  {
    id: 4,
    name: "Milk",
    price: 2.5,
    image: "https://placehold.co/100x100/ADD8E6/000000?text=Milk",
  },
  {
    id: 5,
    name: "Bread",
    price: 2.0,
    image: "https://placehold.co/100x100/D2B48C/000000?text=Bread",
  },
];

const ProductList = () => {
  const dispatch = useDispatch(); // অ্যাকশন ডিসপ্যাচ করার জন্য useDispatch Hook ব্যবহার করা হয়েছে

  return (
    <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-md m-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Available Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-md mb-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/CCCCCC/000000?text=Image+Error";
              }}
            />
            <h3 className="text-lg font-semibold text-gray-700">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-3">${product.price.toFixed(2)}</p>
            <button
              onClick={() => dispatch(addToCart(product))} // ক্লিক করলে addToCart অ্যাকশন ডিসপ্যাচ হবে
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ShoppingCart Component
const ShoppingCart = () => {
  // useSelector Hook ব্যবহার করে Redux স্টোর থেকে 'products' এবং 'totalItems' স্টেট আনা হয়েছে
  const cartProducts = useSelector((state) => state.products);
  const totalItems = useSelector((state) => state.totalItems);
  const dispatch = useDispatch(); // অ্যাকশন ডিসপ্যাচ করার জন্য useDispatch Hook ব্যবহার করা হয়েছে

  const calculateTotalPrice = () => {
    return cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      
      0
    );
  
  };




  return (
    <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md ml-0 md:ml-6 mt-6 md:mt-0">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Shopping Cart ({totalItems})
      </h2>
      {cartProducts.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {cartProducts.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/50x50/CCCCCC/000000?text=Img";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))} // ক্লিক করলে removeFromCart অ্যাকশন ডিসপ্যাচ হবে
                  className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded-md transition-colors duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right text-xl font-bold text-gray-800">
            Total: ${calculateTotalPrice().toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    // Provider ব্যবহার করে Redux স্টোরটি পুরো অ্যাপ্লিকেশনে উপলব্ধ করা হয়েছে
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center font-sans">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8">
          My Redux Shopping App
        </h1>
        <div className="flex flex-col md:flex-row w-full max-w-6xl">
          <ProductList /> {/* পণ্যের তালিকা কম্পোনেন্ট */}
          <ShoppingCart /> {/* শপিং কার্ট কম্পোনেন্ট */}
        </div>
      </div>
    </Provider>
  );
};

export default App;
