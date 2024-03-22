import Background3 from "../../background3/background3"
import Products from "../../products/products"
import Banner from "../../Banner/Banner"
import axios from 'axios';
import { useState, useEffect } from 'react';
import './NewsPage.css';



export default function NewsPage() {
    const [menus, setMenus] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const fetcProduct = async () => {
            const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/menu'
            );
            const menus_data = response.data;
            setMenus(menus_data.data);
        };

        useEffect(() => {
            fetcProduct();
        }, []);
        const getToken = () => {
            return window.localStorage.getItem("token");
          };

    const postProductToCart = async (menuId) => {
        const token = getToken();
          
        if (!token) {
              console.error("Token not found in localStorage");
              return null;
            }
          
            try {
              const response = await axios.post(
                "https://bubble-tea-cafe-api-production.up.railway.app/api/auth/add-to-cart",
                {
                  menuId: menuId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data;
            } catch (error) {
              console.error("Error adding product to cart: ", error.message);
              return null;
            }
          };

          useEffect(() => {
            const menuIds = ["65cca65f4ad6e5fefb43a05b", "65cde64a3f59a6cf284a04dc"];
            const token = localStorage.getItem("token");
        
            if (menuIds && token) {
                postProductToCart(menuIds);
            }
          }, []);
    return (
        <div className="bgimg3">
            <div className="bar"></div>
            <div className='grid'>
            {menus.map((menu) => (
                <article key={menu.Id}>
                <img src={menu.image} alt='Sample photo' />
                <div className='text'>
                    <h3>{menu.name}</h3>
                    <p>
                    {menu.category}, {menu.price} Bath
                    </p>
                    <button onClick={() => {const menuId = menu.Id;const token = localStorage.getItem("token");postProductToCart(menuId, token);}}>Add Product to Cart</button>
                </div>
                </article>
            ))}
            </div>
            {/* <Products /> */}
            
        </div>
    )
}