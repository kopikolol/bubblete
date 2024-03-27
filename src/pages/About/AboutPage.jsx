import Aboutbackground from "../../Aboutbackground/Aboutbackground"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.get('https://bubble-tea-cafe-api-production.up.railway.app/api/order', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message || 'An error occurred while fetching orders.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Menu Id</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.Id}>
              <td>{order.Id}</td>
              <td>{order.user_id}</td>
              <td>{order.menu_id}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;