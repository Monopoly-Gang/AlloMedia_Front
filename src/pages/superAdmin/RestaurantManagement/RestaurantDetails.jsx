import React from "react";
import { useTranslation } from "react-i18next";
import RestaurantHeader from "../../../components/RestaurantDetails/RestaurantHeader";
import MenuSection from "../../../components/RestaurantDetails/MenuSection";
import RestaurantInfoSection from "../../../components/RestaurantDetails/RestaurantInfoSection";  

const RestaurantDetails = () => {
  const { t } = useTranslation();

  // Mock data - replace with actual data fetching logic
  const restaurantData = {
    name: "Healthy Feast Corner",
    cuisineType: "Healthy",
    address: "123 Main St, City, Country",
    banner: "https://via.placeholder.com/1200x400?text=Restaurant+Banner",
    logo: "https://via.placeholder.com/150?text=HFC",
    manager: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
    menu: [
      {
        id: "1001",
        name: "Italian Pizza",
        category: "Pizza",
        price: 79,
        image: "https://via.placeholder.com/100?text=Pizza",
      },
      {
        id: "1002",
        name: "Veg Burger",
        category: "Burger",
        price: 488,
        image: "https://via.placeholder.com/100?text=Burger",
      },
      {
        id: "1003",
        name: "Spaghetti",
        category: "Noodles",
        price: 23,
        image: "https://via.placeholder.com/100?text=Spaghetti",
      },
      {
        id: "1004",
        name: "Red Velvet Cake",
        category: "Dessert",
        price: 350,
        image: "https://via.placeholder.com/100?text=Cake",
      },
      {
        id: "1005",
        name: "Mix Salad",
        category: "Appetizers",
        price: 645.2,
        image: "https://via.placeholder.com/100?text=Salad",
      },
      {
        id: "1006",
        name: "Spaghetti",
        category: "Noodles",
        price: 23,
        image: "https://via.placeholder.com/100?text=Spaghetti",
      },
      {
        id: "1007",
        name: "Red Velvet Cake",
        category: "Dessert",
        price: 350,
        image: "https://via.placeholder.com/100?text=Cake",
      },
      {
        id: "1008",
        name: "Mix Salad",
        category: "Appetizers",
        price: 645.2,
        image: "https://via.placeholder.com/100?text=Salad",
      },
      // Add more items as needed, ensuring each has a unique id
    ],
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
      <RestaurantHeader restaurantData={restaurantData} />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MenuSection menu={restaurantData.menu} />
          <RestaurantInfoSection restaurantData={restaurantData} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
