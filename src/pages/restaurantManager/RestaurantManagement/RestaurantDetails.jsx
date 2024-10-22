import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import RestaurantHeader from "../../../components/RestaurantDetails/RestaurantHeader";
import MenuSection from "../../../components/RestaurantDetails/MenuSection";
import RestaurantInfoSection from "../../../components/RestaurantDetails/RestaurantInfoSection";
import { toast, Toaster } from "sonner";

const RestaurantManagerDashboard = () => {
    const { t } = useTranslation();
    const [restaurantData, setRestaurantData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    const fetchRestaurantData = async () => {
        try {

            const mockData = {
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
                    // Add more menu items as needed
                ],
            };

            setRestaurantData(mockData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
            toast.error(t("Failed to load restaurant data"));
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">{t("Loading...")}</div>;
    }

    if (!restaurantData) {
        return <div className="flex justify-center items-center h-screen">{t("No restaurant data available")}</div>;
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
            <Toaster richColors />
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

export default RestaurantManagerDashboard;