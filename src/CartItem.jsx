import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 1️⃣ Calculate total amount for all products in the cart (SUB Q1)
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.cost * item.quantity;
    });
    return total.toFixed(2);
  };

  // 2️⃣ Continue Shopping button navigation (SUB Q8)
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // 3️⃣ Increment quantity using Redux (SUB Q4)
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // 4️⃣ Decrement quantity (SUB Q5)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // 5️⃣ Remove item from cart (SUB Q6)
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 6️⃣ Calculate total cost per item (SUB Q2)
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  // 7️⃣ Checkout alert (SUB Q7)
  const handleCheckout = () => {
    alert("Checkout Coming Soon!");
  };

  return (
    <div className="cart-container">
      {/* SUB Q1: Total Cart Amount */}
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {/* SUB Q3: Display image, name, unit price */}
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>

              {/* Quantity Controls (SUB Q4 & Q5) */}
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* SUB Q2: Total cost per item */}
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              {/* SUB Q6: Delete button */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

      <div className="continue_shopping_btn">
        {/* SUB Q8 */}
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />

        {/* SUB Q7 */}
        <button
          className="get-started-button1"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
