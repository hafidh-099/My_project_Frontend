import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/Admin.css';

function AdminPage() {
  const [foodItems, setFoodItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [foodForm, setFoodForm] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    img_url: '',
  });
  const [customerForm, setCustomerForm] = useState({
    id: null,
    name: '',
    phone: '',
    address: '',
    password: '',
  });
  const [orderForm, setOrderForm] = useState({
    id: null,
    customer: '',
    food_items: [],
    total_price: '',
  });
  const [isEditingFood, setIsEditingFood] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [activeTab, setActiveTab] = useState('food'); // Controls which section is active

  // Fetch data
  useEffect(() => {
    fetchFoodItems();
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://13.61.212.40:8000/home/');
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://13.61.212.40:8000/order/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://13.61.212.40:8000/cust/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Handle form submissions
  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingFood) {
        await axios.put(`http://13.61.212.40:8000/home/${foodForm.id}/`, foodForm);
      } else {
        await axios.post('http://13.61.212.40:8000/home/', foodForm);
      }
      setFoodForm({ id: null, name: '', description: '', price: '', img_url: '' });
      setIsEditingFood(false);
      fetchFoodItems();
    } catch (error) {
      console.error('Error saving food item:', error);
    }
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingCustomer) {
        await axios.put(`http://13.61.212.40:8000/cust/${customerForm.id}/`, customerForm);
      } else {
        await axios.post('http://13.61.212.40:8000/cust/', customerForm);
      }
      setCustomerForm({ id: null, name: '', phone: '', address: '', password: '' });
      setIsEditingCustomer(false);
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingOrder) {
        await axios.put(`http://13.61.212.40:8000/order/${orderForm.id}/`, orderForm);
      } else {
        await axios.post('http://13.61.212.40:8000/order/', orderForm);
      }
      setOrderForm({ id: null, customer: '', food_items: [], total_price: '' });
      setIsEditingOrder(false);
      fetchOrders();
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  // Edit and delete handlers
  const handleEditFood = (item) => {
    setFoodForm(item);
    setIsEditingFood(true);
  };

  const handleDeleteFood = async (id) => {
    try {
      await axios.delete(`http://13.61.212.40:8000/home/${id}/`);
      fetchFoodItems();
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setCustomerForm(customer);
    setIsEditingCustomer(true);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://13.61.212.40:8000/cust/${id}/`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditOrder = (order) => {
    setOrderForm(order);
    setIsEditingOrder(true);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://13.61.212.40:8000/order/${id}/`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="admin-page">
      {/* Header with sidebar options */}
      <div className="header">
        <ul>
          <li onClick={() => setActiveTab('food')}>Manage Food Items</li>
          <li onClick={() => setActiveTab('customers')}>Manage Customers</li>
          <li onClick={() => setActiveTab('orders')}>Manage Orders</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        {activeTab === 'food' && (
          <section className="food-management active">
            <h2>Manage Food Items</h2>
            <form onSubmit={handleFoodSubmit} className="food-form">
              <input
                type="text"
                placeholder="Name"
                value={foodForm.name}
                onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={foodForm.description}
                onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                value={foodForm.price}
                onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={foodForm.img_url}
                onChange={(e) => setFoodForm({ ...foodForm, img_url: e.target.value })}
              />
              <button type="submit">{isEditingFood ? 'Update' : 'Add'} Food Item</button>
            </form>
            <table className="food-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foodItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => handleEditFood(item)}>Edit</button>
                      <button onClick={() => handleDeleteFood(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'customers' && (
          <section className="customer-management active">
            <h2>Manage Customers</h2>
            <form onSubmit={handleCustomerSubmit} className="customer-form">
              <input
                type="text"
                placeholder="Name"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={customerForm.address}
                onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={customerForm.password}
                onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                required
              />
              <button type="submit">{isEditingCustomer ? 'Update' : 'Add'} Customer</button>
            </form>
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                      <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'orders' && (
          <section className="order-management active">
            <h2>Manage Orders</h2>
            <form onSubmit={handleOrderSubmit} className="order-form">
              <select
                value={orderForm.customer}
                onChange={(e) => setOrderForm({ ...orderForm, customer: e.target.value })}
                required
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Food Items (comma separated IDs)"
                value={orderForm.food_items}
                onChange={(e) => setOrderForm({ ...orderForm, food_items: e.target.value.split(',') })}
                required
              />
              <input
                type="number"
                placeholder="Total Price"
                value={orderForm.total_price}
                onChange={(e) => setOrderForm({ ...orderForm, total_price: e.target.value })}
                required
              />
              <button type="submit">{isEditingOrder ? 'Update' : 'Add'} Order</button>
            </form>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Food Items</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  // Map food item IDs to food names
                  const foodNames = order.food_items
                    .map((foodId) => {
                      const foodItem = foodItems.find((item) => item.id === parseInt(foodId));
                      return foodItem ? foodItem.name : '';
                    })
                    .join(', ');
                  return (
                    <tr key={order.id}>
                      <td>{order.customer}</td>
                      <td>{foodNames}</td>
                      <td>{order.total_price}</td>
                      <td>
                        <button onClick={() => handleEditOrder(order)}>Edit</button>
                        <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
