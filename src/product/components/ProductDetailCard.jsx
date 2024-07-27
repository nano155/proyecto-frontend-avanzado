import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link} from 'react-router-dom';
import { useCartStore } from '../../hooks/useCartStore';
import { HashLoader } from 'react-spinners';

export const ProductDetailCard = ({ product, addProduct }) => {
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [updateCart, setUpdateCart] = useState(true)
    const { cart, isLoadingCart } = useCartStore()

    useEffect(() => {
        setPrice(product.price * quantity);
        setStock(product.stock - quantity)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity, product.price]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };

    const handleAddToCartClick = async (cid, pid, quantity) => {
        await addProduct(cid, pid, quantity)
        setUpdateCart(false)  
    };

    // Initialize initial stock on component mount


    if (!product || !product.thumbnails || product.thumbnails.length === 0) {
        return <div className="flex flex-col w-full items-center h-screen justify-center">
            <HashLoader
                color="#ef01ff"
                size={30}
            />
        </div>;
    }
    return (
        <>
            {
                isLoadingCart && updateCart ?
                    <div className="flex flex-col w-full items-center h-screen justify-center">
                        <HashLoader
                            color="#ef01ff"
                            size={30}
                        />
                    </div>

                    : <div className="flex bg-white shadow-lg rounded-lg overflow-hidden p-6 max-w-4xl mx-auto my-8">
                        <div className="flex-shrink-0 w-1/3 h-full flex items-center justify-center">
                            {product && product.thumbnails && product.thumbnails.length > 1 ? (
                                <Carousel
                                    showArrows
                                    showThumbs
                                    infiniteLoop
                                    autoPlay
                                    interval={3000}
                                    className="h-full"

                                >
                                    {product.thumbnails.map((url, index) => (
                                        <div key={index} className="h-full flex items-center justify-center">
                                            <img src={url} alt={`Thumbnail ${index + 1}`} className="w-full h-full rounded-l-lg" />
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <img
                                    src={product.thumbnails[0]}
                                    alt={product.title}
                                    className="object-cover w-full h-full rounded-l-lg"
                                />
                            )}
                        </div>
                        <div className="flex-grow flex flex-col items-center justify-between p-6">
                            <div className="text-center mb-4">
                                <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                                <p className="text-gray-700 mb-2">Category: {product.category}</p>
                                <p className="text-gray-700 mb-4">{product.description}</p>
                                <p className="text-xl font-bold mb-4">${price}</p>
                                <p className="text-gray-700 mb-4">Stock: {stock}</p>
                                <p className="text-gray-700 mb-4">Code: {product.code}</p>
                            </div>
                            <div className="flex items-center space-x-4 mb-4">
                                <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={quantity}
                                    min="0"
                                    max={product.stock}
                                    onChange={handleQuantityChange}
                                    className="w-16 text-center border border-gray-300 rounded-md"
                                />
                            </div>
                            <button
                                onClick={() => handleAddToCartClick(cart.id, product.id, quantity)}
                                disabled={quantity === 0}
                                className={`bg-purple-600 w-full text-white py-2 px-4 rounded hover:bg-purple-800 transition-colors ${quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Add to cart
                            </button>
                            <Link to={'/products'} className='w-full'>
                                <button className={`bg-red-500 text-white mt-2 py-2 px-4 rounded hover:bg-red-700 transition-colors w-full`}>
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </div>

            }
        </>
    );
};
