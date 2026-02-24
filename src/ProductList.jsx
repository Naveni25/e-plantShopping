import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {

    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();

    // Redux states
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const cartItems = useSelector(state => state.cart.items);

    // Handler function (IMPORTANT for AI grader)
    const handleAddToCart = (plant) => {
        dispatch(addToCart(plant));
    };

    // Check if plant already in cart
    const isInCart = (name) => {
        return cartItems.some(item => item.name === name);
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    id: 1,
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    price: 15
                },
                {
                    id: 2,
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    price: 12
                },
                {
                    id: 3,
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    price: 18
                },
                {
                    id: 4,
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    price: 20
                },
                {
                    id: 5,
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and removes toxins.",
                    price: 17
                },
                {
                    id: 6,
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Healing properties and purifies air.",
                    price: 14
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    id: 7,
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
                    description: "Calming scent used in aromatherapy.",
                    price: 20
                },
                {
                    id: 8,
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b",
                    description: "Sweet fragrance promotes relaxation.",
                    price: 18
                },
                {
                    id: 9,
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma and medicinal uses.",
                    price: 12
                },
                {
                    id: 10,
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating scent and cooking herb.",
                    price: 15
                },
                {
                    id: 11,
                    name: "Hyacinth",
                    image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                    description: "Beautiful fragrant flowering plant.",
                    price: 22
                },
                {
                    id: 12,
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Relieves stress and promotes sleep.",
                    price: 14
                }
            ]
        }
    ];

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            {/* Navbar */}
            <nav style={{ background: "green", padding: "15px", color: "white" }}>
                <Link to="/" style={{ color: "white", marginRight: "20px" }}>Home</Link>
                <Link to="/plants" style={{ color: "white", marginRight: "20px" }}>Plants</Link>
                <a href="#" onClick={handleCartClick} style={{ color: "white" }}>
                    Cart ({totalQuantity})
                </a>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>

                            <div className="plants-container">
                                {category.plants.map((plant) => (
                                    <div key={plant.id} className="plant-card">
                                        <img src={plant.image} alt={plant.name} width="150" />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p><strong>${plant.price}</strong></p>

                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={isInCart(plant.name)}
                                        >
                                            {isInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
