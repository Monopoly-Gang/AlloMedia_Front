import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import RestaurantHeader from "../../../components/RestaurantDetails/RestaurantHeader";
import MenuSection from "../../../components/RestaurantDetails/MenuSection";
import RestaurantInfoSection from "../../../components/RestaurantDetails/RestaurantInfoSection";
import EditMenuItemModal from "../MenuManagement/EditMenuItem";
import { toast, Toaster } from "sonner";

const RestaurantDetails = () => {
    const { t } = useTranslation();
    const [restaurantData, setRestaurantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

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
                        description: "Lorem ipsum dolor sit amet consectetur adipiscing.",
                        price: 79,
                        image: "https://via.placeholder.com/100?text=Pizza",
                    },
                    {
                        id: "1002",
                        name: "Veg Burger",
                        description: "Lorem ipsum dolor sit amet consectetur adipiscing.",
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

    const handleEditMenuItem = (menuItem) => {
        setSelectedMenuItem(menuItem);
        setIsModalOpen(true);
    };

    const handleSaveMenuItem = (updatedItem) => {
        setRestaurantData((prevData) => ({
            ...prevData,
            menu: prevData.menu.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            ),
        }));
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
                    <MenuSection menu={restaurantData.menu} userRole="restaurantManager" onEdit={handleEditMenuItem} />
                    <RestaurantInfoSection restaurantData={restaurantData} />
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;