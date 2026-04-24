import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../store/CartSlice';
import '../styles/CartItem.css';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const TAX_RATE = 0.08;
  const tax = totalPrice * TAX_RATE;
  const grandTotal = totalPrice + tax;

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Shopping Cart</h1>

      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🌿</div>
              <p className="empty-cart-text">
                Your cart is empty! Start shopping and add some beautiful plants to your collection.
              </p>
              <Link to="/plants" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)} per unit</p>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => handleDecrement(item.id)}
                      >
                        −
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    <p className="item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="delete-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <p className="tax-info">
              * Tax calculated at 8% of subtotal
            </p>

            <button className="checkout-coming-soon">
              🔄 Coming Soon
            </button>

            <Link to="/plants" className="back-to-products">
              ← Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
