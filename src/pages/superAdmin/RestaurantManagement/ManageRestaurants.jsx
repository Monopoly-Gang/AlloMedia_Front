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
          address: "2123 Osprey the Blue Mountains, Townline, Feversham, ON NOC 1CO, Canada",
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
        {
          id: 5,
          name: "URBAN TASTE BISTRO",
          owner: "Jordan Smith",
          address: "123 Main St, Toronto, ON M5H 2N2, Canada",
          email: "jsmith@urbantaste.com",
          phone: "4165551234",
          logo: "https://via.placeholder.com/100?text=Urban+Taste+Bistro",
          cuisineType: "Fusion",
        },
        {
          id: 6,
          name: "SEAFOOD DELIGHT",
          owner: "Marina Fisher",
          address: "456 Ocean Ave, Vancouver, BC V6Z 2Y7, Canada",
          email: "mfisher@seafooddelight.com",
          phone: "6045555678",
          logo: "https://via.placeholder.com/100?text=Seafood+Delight",
          cuisineType: "Seafood",
        },
        {
          id: 7,
          name: "VEGAN VIBES",
          owner: "Ella Green",
          address: "789 Greenway Blvd, Ottawa, ON K1A 0B1, Canada",
          email: "egreen@veganvibes.com",
          phone: "6135557890",
          logo: "https://via.placeholder.com/100?text=Vegan+Vibes",
          cuisineType: "Vegan",
        },
        {
          id: 8,
          name: "SPICE ROUTE",
          owner: "Raj Patel",
          address: "101 Curry Ln, Calgary, AB T2P 3G7, Canada",
          email: "rpatel@spiceroute.com",
          phone: "4035551010",
          logo: "https://via.placeholder.com/100?text=Spice+Route",
          cuisineType: "Indian",
        },
        {
          id: 9,
          name: "SUSHI SENSATION",
          owner: "Akira Tanaka",
          address: "202 Sushi St, Montreal, QC H3B 1A1, Canada",
          email: "atanaka@sushisensation.com",
          phone: "5145552020",
          logo: "https://via.placeholder.com/100?text=Sushi+Sensation",
          cuisineType: "Japanese",
        },
        {
          id: 10,
          name: "TACO TOWN",
          owner: "Carlos Ramirez",
          address: "303 Fiesta Rd, Edmonton, AB T5J 3N8, Canada",
          email: "cramirez@tacotown.com",
          phone: "7805553030",
          logo: "https://via.placeholder.com/100?text=Taco+Town",
          cuisineType: "Mexican",
        },
        {
          id: 11,
          name: "PASTA PARADISE",
          owner: "Giovanni Rossi",
          address: "404 Pasta Pl, Winnipeg, MB R3C 4T3, Canada",
          email: "grossi@pastaparadise.com",
          phone: "2045554040",
          logo: "https://via.placeholder.com/100?text=Pasta+Paradise",
          cuisineType: "Italian",
        },
        {
          id: 12,
          name: "BURGER BARN",
          owner: "Sam Johnson",
          address: "505 Burger Blvd, Halifax, NS B3J 2K9, Canada",
          email: "sjohnson@burgerbarn.com",
          phone: "9025555050",
          logo: "https://via.placeholder.com/100?text=Burger+Barn",
          cuisineType: "American",
        },
        {
          id: 13,
          name: "THAI TREATS",
          owner: "Nina Chai",
          address: "606 Thai St, Victoria, BC V8W 1N6, Canada",
          email: "nchai@thaitreats.com",
          phone: "2505556060",
          logo: "https://via.placeholder.com/100?text=Thai+Treats",
          cuisineType: "Thai",
        },
        {
          id: 14,
          name: "FRENCH FLAIR",
          owner: "Pierre Dubois",
          address: "707 Paris Ave, Quebec City, QC G1R 4P5, Canada",
          email: "pdubois@frenchflair.com",
          phone: "4185557070",
          logo: "https://via.placeholder.com/100?text=French+Flair",
          cuisineType: "French",
        },
        {
          id: 15,
          name: "MEDITERRANEAN MAGIC",
          owner: "Sophia Papadopoulos",
          address: "808 Olive Rd, Hamilton, ON L8P 1A1, Canada",
          email: "spapadopoulos@mediterraneanmagic.com",
          phone: "9055558080",
          logo: "https://via.placeholder.com/100?text=Mediterranean+Magic",
          cuisineType: "Mediterranean",
        },
        {
          id: 16,
          name: "BBQ BLISS",
          owner: "Tommy Lee",
          address: "909 Grill St, Regina, SK S4P 3Y2, Canada",
          email: "tlee@bbqbliss.com",
          phone: "3065559090",
          logo: "https://via.placeholder.com/100?text=BBQ+Bliss",
          cuisineType: "BBQ",
        },
        {
          id: 17,
          name: "GREEK GARDEN",
          owner: "Dimitri Kosta",
          address: "1010 Athens Ln, St. John's, NL A1C 1A1, Canada",
          email: "dkosta@greekgarden.com",
          phone: "7095551010",
          logo: "https://via.placeholder.com/100?text=Greek+Garden",
          cuisineType: "Greek",
        },
        {
          id: 18,
          name: "CHINESE CHOW",
          owner: "Li Wei",
          address: "1111 Dragon Rd, Saskatoon, SK S7K 1N2, Canada",
          email: "lwei@chinesechow.com",
          phone: "3065551111",
          logo: "https://via.placeholder.com/100?text=Chinese+Chow",
          cuisineType: "Chinese",
        },
        {
          id: 19,
          name: "PIZZA PALACE",
          owner: "Mario Bianchi",
          address: "1212 Slice St, London, ON N6A 3K7, Canada",
          email: "mbianchi@pizzapalace.com",
          phone: "5195551212",
          logo: "https://via.placeholder.com/100?text=Pizza+Palace",
          cuisineType: "Pizza",
        },
        {
          id: 20,
          name: "SOUTHERN SOUL",
          owner: "Georgia Brown",
          address: "1313 Soul Ave, Charlottetown, PE C1A 1A1, Canada",
          email: "gbrown@southernsoul.com",
          phone: "9025551313",
          logo: "https://via.placeholder.com/100?text=Southern+Soul",
          cuisineType: "Southern",
        },
        {
          id: 21,
          name: "BISTRO BLISS",
          owner: "Emily Clark",
          address: "1414 Bistro Blvd, Fredericton, NB E3B 1A1, Canada",
          email: "eclark@bistrobliss.com",
          phone: "5065551414",
          logo: "https://via.placeholder.com/100?text=Bistro+Bliss",
          cuisineType: "Bistro",
        },
        {
          id: 22,
          name: "TAPAS TEMPTATION",
          owner: "Carlos Gomez",
          address: "1515 Tapas St, Windsor, ON N9A 3K7, Canada",
          email: "cgomez@tapastemptation.com",
          phone: "5195551515",
          logo: "https://via.placeholder.com/100?text=Tapas+Temptation",
          cuisineType: "Spanish",
        },
        {
          id: 23,
          name: "CURRY CORNER",
          owner: "Anjali Mehta",
          address: "1616 Curry Ln, Surrey, BC V3T 1V8, Canada",
          email: "amehta@currycorner.com",
          phone: "6045551616",
          logo: "https://via.placeholder.com/100?text=Curry+Corner",
          cuisineType: "Indian",
        },
        {
          id: 24,
          name: "GRILL GURU",
          owner: "Tom Grills",
          address: "1717 Grill St, Red Deer, AB T4N 1E1, Canada",
          email: "tgrills@grillguru.com",
          phone: "4035551717",
          logo: "https://via.placeholder.com/100?text=Grill+Guru",
          cuisineType: "Grill",
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

  const handleViewDetails = (id) => {
    navigate(`/dashboard/super-admin/restaurant-details/${id}`);
  };

  const handleAddRestaurant = () => {
    navigate("/dashboard/super-admin/add-restaurant");
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 3;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        onClick={() => typeof number === 'number' && paginate(number)}
        className={`w-8 h-8 rounded-full ${
          currentPage === number
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
        }`}
        disabled={typeof number !== 'number'}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          {t("Manage Restaurants")}
        </h1>
        <button
          className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
          onClick={handleAddRestaurant}
        >
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp">
        {currentRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onViewDetails={handleViewDetails}
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
          {renderPageNumbers()}
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