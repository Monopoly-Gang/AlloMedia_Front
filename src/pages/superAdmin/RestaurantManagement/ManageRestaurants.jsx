import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";

import RestaurantCard from "../../../components/RestaurantDetails/RestaurantCard";

const ManageRestaurants = () => {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch restaurants data (replace with API call)
    const dummyData = [
      {
        id: 1,
        name: "HEALTHY FEAST CORNER",
        owner: "Hollie Bruggen",
        address:
          "2123 Osprey the Blue Mountains, Townline, Feversham, ON NOC 1CO, Canada",
        email: "hbruggen0@narod.ru",
        phone: "1078832848",
        logo: "https://via.placeholder.com/100?text=Healthy+Feast+Corner",
        cuisineType: "Healthy",
      },
      {
        id: 2,
        name: "FARMHOUSE DISH HEAVEN",
        owner: "Delainey Soden",
        address: "2045 Scotch Line, Essa, Ontario, L9R 1V2, Alliston, CA",
        email: "dsoden1@fda.gov",
        phone: "2847899814",
        logo: "https://via.placeholder.com/100?text=Farmhouse+Dish+Heaven",
        cuisineType: "American",
      },
      {
        id: 3,
        name: "KITCHEN CREATION",
        owner: "Lou Hillen",
        address: "6058 Townhigh Mountains, Sideroad, Clarksburg, ON.",
        email: "lhillen2@dyndns.org",
        phone: "2816686226",
        logo: "https://via.placeholder.com/100?text=Kitchen+Creation",
        cuisineType: "Italian",
      },
      {
        id: 4,
        name: "COUNTRY COOKING COVE",
        owner: "Karlyn Newsome",
        address: "A-67 Concession 8, Nottawasaga RD, Glen Huron, Poland",
        email: "knewsome3@alexa.com",
        phone: "1102607941",
        logo: "https://via.placeholder.com/100?text=Country+Cooking+Cove",
        cuisineType: "Mexican",
      },
    ];
    setRestaurants(dummyData);
    setFilteredRestaurants(dummyData);
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCuisine === "all" || restaurant.cuisineType === filterCuisine)
    );
    setFilteredRestaurants(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCuisine, restaurants]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterCuisine(e.target.value);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handelViewDetails = (id) => {
    navigate(`/dashboard/super-admin/restaurant-details/${id}`);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          {t("Manage Restaurants")}
        </h1>
        <button className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300">
          <Plus size={16} className="mr-2" />
          {t("Add Restaurant")}
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="relative mb-4 md:mb-0 md:w-1/2">
          <input
            type="text"
            placeholder={t("Search restaurants...")}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <select
          className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
          value={filterCuisine}
          onChange={handleFilterChange}
        >
          <option value="all">{t("All Cuisines")}</option>
          <option value="Italian">{t("Italian")}</option>
          <option value="Japanese">{t("Japanese")}</option>
          <option value="Mexican">{t("Mexican")}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onViewDetails={handelViewDetails}
          />
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
          {t("No restaurants found.")}
        </p>
      )}

      {filteredRestaurants.length > restaurantsPerPage && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            <ChevronLeft size={20} />
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === number + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
              }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageRestaurants;
