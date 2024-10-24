import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantHeader from "../../../components/RestaurantDetails/RestaurantHeader";
import MenuSection from "../../../components/RestaurantDetails/MenuSection";
import RestaurantInfoSection from "../../../components/RestaurantDetails/RestaurantInfoSection";

const RestaurantDetails = () => {
  const { id } = useParams(); 
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      // Simulate fetching data by ID
      const mockData = {
        id: "123", 
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
          // Add more items as needed
        ],
      };

      // Check if the fetched data matches the ID from the URL
      if (mockData.id === id) {
        setRestaurantData(mockData);
      } else {
        console.error("Restaurant not found");
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (!restaurantData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
      <RestaurantHeader restaurantData={restaurantData} />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MenuSection menu={restaurantData.menu} userRole="superAdmin" />
          <RestaurantInfoSection restaurantData={restaurantData} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;