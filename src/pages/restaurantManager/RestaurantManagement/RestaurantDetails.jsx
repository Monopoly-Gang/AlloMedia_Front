import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import RestaurantHeader from "../../../components/RestaurantDetails/RestaurantHeader";
import MenuSection from "../../../components/RestaurantDetails/MenuSection";
import RestaurantInfoSection from "../../../components/RestaurantDetails/RestaurantInfoSection";
import { toast, Toaster } from "sonner";
import axiosInstance from '../../../config/axiosService';

const RestaurantManagerDashboard = () => {
    const { t } = useTranslation();
    const [restaurantData, setRestaurantData] = useState({banner: '', logo: '', name: '', cuisineType: ''});
    const [loading, setLoading] = useState(false);

   

    if (loading) {
        return <div className="flex justify-center items-center h-screen">{t("Loading...")}</div>;
    }

    // if (!restaurantData) {
    //     return <div className="flex justify-center items-center h-screen">{t("No restaurant data available")}</div>;
    // }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
            <Toaster richColors />
            <RestaurantHeader restaurantData={restaurantData} />
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MenuSection userRole="restaurantManager" />
                    <RestaurantInfoSection restaurantData={restaurantData} />
                </div>
            </div>
        </div>
    );
};

export default RestaurantManagerDashboard;