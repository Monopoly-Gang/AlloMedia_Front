import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, User, Mail, Phone, Edit, Trash2, Plus } from "lucide-react";
import SpinnerIcon from "../../../components/SpinnerIcon";

const RestaurantDetailsPage = () => {
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
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden ">
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

const RestaurantHeader = ({ restaurantData }) => (
  <div className="relative h-64">
    <img
      src={restaurantData.banner}
      alt={restaurantData.name}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6 flex items-end">
      <img
        src={restaurantData.logo}
        alt={restaurantData.name}
        className="w-24 h-24 rounded-full border-4 border-white mr-4"
      />
      <div className="text-white">
        <h1 className="text-3xl font-bold">{restaurantData.name}</h1>
        <p className="text-sm">{restaurantData.cuisineType}</p>
      </div>
    </div>
  </div>
);

const MenuSection = ({ menu }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredMenu.slice(0, indexOfLastItem);

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="md:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold dark:text-white">{t("Menu")}</h2>
        <button className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300">
          <Plus size={16} className="mr-2" />
          {t("Add Menu")}
        </button>
      </div>
      <input
        type="text"
        placeholder={t("Search menu...")}
        className="w-full mb-4 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
      {indexOfLastItem < filteredMenu.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleViewMore}
            disabled={loading}
            className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
          >
            {loading ? (
              <>
                <SpinnerIcon className="w-4 h-4 me-3 text-white font-semibold" />
                Loading...
              </>
            ) : (
              t("View More")
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ item }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-fadeInUp">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-32 object-cover rounded-md mb-2"
    />
    <h3 className="font-semibold dark:text-white">{item.name}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{item.category}</p>
    <p className="text-lg font-bold text-primary mt-2">
      ${item.price.toFixed(2)}
    </p>
    <div className="flex justify-end mt-2">
      <button className="text-green-500 mr-2 rounded-full bg-slate-200 dark:bg-slate-800 p-2">
        <Edit size={16} />
      </button>
      <button className="text-red-500 rounded-full bg-slate-200 dark:bg-slate-800 p-2">
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const RestaurantInfoSection = ({ restaurantData }) => {
  const { t } = useTranslation();

  return (
    <div>
      <ManagerDetails manager={restaurantData.manager} />
      <RestaurantDetailsInfo restaurantData={restaurantData} />
    </div>
  );
};

const ManagerDetails = ({ manager }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {t("Manager Details")}
      </h2>
      <div className="space-y-2">
        <p className="flex items-center">
          <User size={16} className="mr-2" />
          {manager.name}
        </p>
        <p className="flex items-center">
          <Mail size={16} className="mr-2" />
          {manager.email}
        </p>
        <p className="flex items-center">
          <Phone size={16} className="mr-2" />
          {manager.phone}
        </p>
      </div>
    </div>
  );
};

const RestaurantDetailsInfo = ({ restaurantData }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {t("Restaurant Details")}
      </h2>
      <div className="space-y-2">
        <p className="flex items-center">
          <MapPin size={16} className="mr-2" />
          {restaurantData.address}
        </p>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
