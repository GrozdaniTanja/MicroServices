import React, { useState, useEffect } from 'react';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        productionCompany: '',
        description: '',
        price: ''
    });
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        if (editProduct === null) {
            fetchProducts();
        }
    }, [editProduct]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/product');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            setNewProduct({
                name: '',
                productionCompany: '',
                description: '',
                price: ''
            });
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            setEditProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editProduct) {
            setEditProduct({ ...editProduct, [name]: value });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    return (
        <div>
            <h1>Products</h1>
            <form onSubmit={handleCreateProduct}>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    name="productionCompany"
                    value={newProduct.productionCompany}
                    onChange={handleInputChange}
                    placeholder="Production Company"
                />
                <input
                    type="text"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                />
                <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    step="0.01"
                />
                <button type="submit">Create Product</button>
            </form>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div>
                            <strong>{product.name}</strong> - {product.productionCompany} - {product.description} - ${product.price}
                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                        {/* Reviews Section */}
                        <div>
                            <h3>Reviews</h3>
                            {/* Display reviews here */}
                        </div>
                    </li>
                ))}
            </ul>
            {editProduct && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateProduct(editProduct.id, editProduct);
                }}>
                    <input
                        type="text"
                        name="name"
                        value={editProduct.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                    <input
                        type="text"
                        name="productionCompany"
                        value={editProduct.productionCompany}
                        onChange={handleInputChange}
                        placeholder="Production Company"
                    />
                    <input
                        type="text"
                        name="description"
                        value={editProduct.description}
                        onChange={handleInputChange}
                        placeholder="Product Description"
                    />
                    <input
                        type="number"
                        name="price"
                        value={editProduct.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        step="0.01"
                    />
                    <button type="submit">Update Product</button>
                </form>
            )}
        </div>
    );
};

export default Product;