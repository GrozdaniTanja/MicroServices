import React, { useState, useEffect } from 'react';

const Order = ({ isLoggedIn, user }) => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        orderNumber: '',
        productId: '',
        totalCost: '',
        userId: ''
    });
    const [editOrder, setEditOrder] = useState(null);

    useEffect(() => {
        if (editOrder === null) {
            fetchOrders();
        }
    }, [editOrder]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/order');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...newOrder, userId: user.id })
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            setNewOrder({
                orderNumber: '',
                productId: '',
                totalCost: '',
                userId: ''
            });
            fetchOrders();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/order/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleEditOrder = (order) => {
        setEditOrder(order);
    };

    const handleUpdateOrder = async (id, updatedOrder) => {
        try {
            const response = await fetch(`http://localhost:3000/order/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedOrder)
            });
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
            setEditOrder(null);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editOrder) {
            setEditOrder({ ...editOrder, [name]: value });
        } else {
            setNewOrder({ ...newOrder, [name]: value });
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1>Orders</h1>
                    <form onSubmit={handleCreateOrder}>
                        <input
                            type="text"
                            name="orderNumber"
                            value={newOrder.orderNumber}
                            onChange={handleInputChange}
                            placeholder="Order Number"
                        />
                        <input
                            type="text"
                            name="productId"
                            value={newOrder.productId}
                            onChange={handleInputChange}
                            placeholder="Product ID"
                        />
                        <input
                            type="number"
                            name="totalCost"
                            value={newOrder.totalCost}
                            onChange={handleInputChange}
                            placeholder="Total Cost"
                            step="0.01"
                        />
                        <input
                            type="hidden"
                            name="userId"
                            value={user.id}
                        />
                        <button type="submit">Create Order</button>
                    </form>
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                <div>
                                    <strong>{order.orderNumber}</strong> - {order.productId} - ${order.totalCost} - {order.userId}
                                    <button onClick={() => handleEditOrder(order)}>Edit</button>
                                    <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {editOrder && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateOrder(editOrder.id, editOrder);
                        }}>
                            <input
                                type="text"
                                name="orderNumber"
                                value={editOrder.orderNumber}
                                onChange={handleInputChange}
                                placeholder="Order Number"
                            />
                            <input
                                type="text"
                                name="productId"
                                value={editOrder.productId}
                                onChange={handleInputChange}
                                placeholder="Product ID"
                            />
                            <input
                                type="number"
                                name="totalCost"
                                value={editOrder.totalCost}
                                onChange={handleInputChange}
                                placeholder="Total Cost"
                                step="0.01"
                            />
                            <input
                                type="text"
                                name="userId"
                                value={editOrder.userId}
                                onChange={handleInputChange}
                                placeholder="User ID"
                            />
                            <button type="submit">Update Order</button>
                        </form>
                    )}
                </>
            ) : (
                <h2>Please log in to view orders</h2>
            )}
        </div>
    );
};

export default Order;
