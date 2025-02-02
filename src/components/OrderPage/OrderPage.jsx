import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import '../OrderPage/OrderPage.css';

function OrderPage() {
    const { cart, setCart } = useContext(CartContext);  // Use setCart to update the cart
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.phone) {
            setError('Please provide your name and phone number.');
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty. Add some items first.');
            return;
        }

        try {
            const orderData = {
                customer_name: formData.name,
                phone: formData.phone,
                food_items: cart.map((item) => item.id),
                total_price: totalPrice,
            };

            const response = await fetch('http://13.61.212.40:8000/confirm_order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                //const result = await response.json();
                await response.json(); // Just to consume the response
                alert('Order submitted successfully! Thank you for choose Nyam Tam. prepare our cash when you receive package.');
                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to submit order. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            setError('An error occurred while submitting your order. Please try again.');
        }
    };

    // Remove one instance of an item from the cart
    const handleRemoveItem = (itemIndex) => {
        const updatedCart = [...cart];
        updatedCart.splice(itemIndex, 1); // Remove only the item at the specified index
        setCart(updatedCart);
    };

    return (
        <div className="order-page">
            <h1>Your Order</h1>
            {cart.length > 0 ? (
                <form onSubmit={handleSubmitOrder} className="order-form">
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - Tzs {item.price} 
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveItem(index)} // Pass the item's index
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: Tzs {totalPrice.toFixed(2)}</p>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    {error && <p className="error">{error}</p>}

                    <button type="submit" className="submit-order-btn">
                        Submit Order
                    </button>
                </form>
            ) : (
                <p>Your cart is empty. Add some items first!</p>
            )}
        </div>
    );
}

export default OrderPage;
