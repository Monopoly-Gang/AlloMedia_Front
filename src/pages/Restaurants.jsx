import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Search, Grid, List, ChevronDown, MapPin } from "lucide-react";
import RestaurantIllustration from "../assets/img/restaurants-illustration.svg";
import SpinnerIcon from "../components/SpinnerIcon";

const mockRestaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    image: "https://via.placeholder.com/300x200.png?text=Pizza+Palace",
    location: "123 Main St, Pizzaville",
  },
  {
    id: 2,
    name: "Sushi Heaven",
    cuisine: "Japanese",
    image: "https://via.placeholder.com/300x200.png?text=Sushi+Heaven",
    location: "456 Ocean Ave, Sushitown",
  },
  {
    id: 3,
    name: "Taco Town",
    cuisine: "Mexican",
    image: "https://via.placeholder.com/300x200.png?text=Taco+Town",
    location: "789 Spice Rd, Tacoville",
  },
  {
    id: 4,
    name: "Burger Bliss",
    cuisine: "American",
    image: "https://via.placeholder.com/300x200.png?text=Burger+Bliss",
    location: "101 Patty Ln, Burgerburg",
  },
  {
    id: 5,
    name: "Pasta Paradise",
    cuisine: "Italian",
    image: "https://via.placeholder.com/300x200.png?text=Pasta+Paradise",
    location: "202 Noodle St, Pastaville",
  },
  {
    id: 6,
    name: "Curry Corner",
    cuisine: "Indian",
    image: "https://via.placeholder.com/300x200.png?text=Curry+Corner",
    location: "303 Spice Blvd, Currytown",
  },
  {
    id: 7,
    name: "Dim Sum Delight",
    cuisine: "Chinese",
    image: "https://via.placeholder.com/300x200.png?text=Dim+Sum+Delight",
    location: "404 Dragon St, Chinatown",
  },
  {
    id: 8,
    name: "Falafel Factory",
    cuisine: "Middle Eastern",
    image: "https://via.placeholder.com/300x200.png?text=Falafel+Factory",
    location: "505 Hummus Ave, Falafelville",
  },
  {
    id: 9,
    name: "Pho Paradise",
    cuisine: "Vietnamese",
    image: "https://via.placeholder.com/300x200.png?text=Pho+Paradise",
    location: "606 Noodle Ln, Phoville",
  },
  {
    id: 10,
    name: "Greek Taverna",
    cuisine: "Greek",
    image: "https://via.placeholder.com/300x200.png?text=Greek+Taverna",
    location: "707 Olive St, Greektown",
  },
  {
    id: 11,
    name: "Schnitzel Shack",
    cuisine: "German",
    image: "https://via.placeholder.com/300x200.png?text=Schnitzel+Shack",
    location: "808 Pretzel Rd, Bavariapolis",
  },
  {
    id: 12,
    name: "Tapas Time",
    cuisine: "Spanish",
    image: "https://via.placeholder.com/300x200.png?text=Tapas+Time",
    location: "909 Flamenco St, Barcelonaville",
  },
  {
    id: 13,
    name: "Samba Steakhouse",
    cuisine: "Brazilian",
    image: "https://via.placeholder.com/300x200.png?text=Samba+Steakhouse",
    location: "1010 Carnival Ave, Rio Town",
  },
  {
    id: 14,
    name: "Pierogi Palace",
    cuisine: "Polish",
    image: "https://via.placeholder.com/300x200.png?text=Pierogi+Palace",
    location: "1111 Dumpling Dr, Warsawville",
  },
  {
    id: 15,
    name: "Thai Spice",
    cuisine: "Thai",
    image: "https://via.placeholder.com/300x200.png?text=Thai+Spice",
    location: "1212 Lemongrass Ln, Bangkoktown",
  },
  {
    id: 16,
    name: "Moroccan Oasis",
    cuisine: "Moroccan",
    image: "https://via.placeholder.com/300x200.png?text=Moroccan+Oasis",
    location: "1313 Tagine Terrace, Marrakeshville",
  },
  {
    id: 17,
    name: "Fish & Chips Corner",
    cuisine: "British",
    image: "https://via.placeholder.com/300x200.png?text=Fish+%26+Chips+Corner",
    location: "1414 Thames St, Londontown",
  },
  {
    id: 18,
    name: "Crepe Cafe",
    cuisine: "French",
    image: "https://via.placeholder.com/300x200.png?text=Crepe+Cafe",
    location: "1515 Eiffel Ave, Parisville",
  },
  {
    id: 19,
    name: "Kebab Kingdom",
    cuisine: "Turkish",
    image: "https://via.placeholder.com/300x200.png?text=Kebab+Kingdom",
    location: "1616 Bosphorus Blvd, Istanbulville",
  },
  {
    id: 20,
    name: "Soul Food Shack",
    cuisine: "Southern American",
    image: "https://via.placeholder.com/300x200.png?text=Soul+Food+Shack",
    location: "1717 Comfort Ct, New Orleanstown",
  },
];

const Restaurants = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [visibleRestaurants, setVisibleRestaurants] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine =
        cuisineFilter === "" || restaurant.cuisine === cuisineFilter;
      return matchesSearch && matchesCuisine;
    });
  }, [searchTerm, cuisineFilter]);

  const uniqueCuisines = [...new Set(mockRestaurants.map((r) => r.cuisine))];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <HeroSection />
      <RestaurantSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cuisineFilter={cuisineFilter}
        setCuisineFilter={setCuisineFilter}
        uniqueCuisines={uniqueCuisines}
        filteredRestaurants={filteredRestaurants}
        viewMode={viewMode}
        setViewMode={setViewMode}
        visibleRestaurants={visibleRestaurants}
        setVisibleRestaurants={setVisibleRestaurants}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-10 md:py-20 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl">
              {t("Discover the Best Restaurants Around You")}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-justify text-gray-500 dark:text-gray-300 md:mt-5 md:max-w-2xl">
              {t(
                "Explore a curated selection of top-rated restaurants in your area. From local favorites to international cuisines, find the perfect dining experience for every occasion."
              )}
            </p>
          </div>
          <div className="mt-12 relative sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <img
              src={RestaurantIllustration}
              alt="home illustration"
              className="w-full h-[18rem] lg:h-[18rem] lg:max-w-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const RestaurantSection = ({
  searchTerm,
  setSearchTerm,
  cuisineFilter,
  setCuisineFilter,
  uniqueCuisines,
  filteredRestaurants,
  viewMode,
  setViewMode,
  visibleRestaurants,
  setVisibleRestaurants,
  isLoading,
  setIsLoading,
}) => {
  const { t } = useTranslation();

  const handleViewMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleRestaurants((prev) => prev + 8);
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading, setVisibleRestaurants]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cuisineFilter={cuisineFilter}
          setCuisineFilter={setCuisineFilter}
          uniqueCuisines={uniqueCuisines}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <RestaurantList
          restaurants={filteredRestaurants.slice(0, visibleRestaurants)}
          viewMode={viewMode}
        />
        {visibleRestaurants < filteredRestaurants.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleViewMore}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-5 h-5 mr-2" />
                  {t("Loading...")}
                </>
              ) : (
                t("View More")
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  cuisineFilter,
  setCuisineFilter,
  uniqueCuisines,
  viewMode,
  setViewMode,
}) => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (cuisine) => {
    setCuisineFilter(cuisine);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mb-6">
      <div className="relative mb-4 md:mb-0 md:w-3/4">
        <div className="flex">
          <button
            id="dropdown-button"
            className="flex-shrink-0 inline-flex items-center rounded-l-md py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-md hover:bg-gray-200 focus:ring-2 focus:ring-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {cuisineFilter === "" ? t("All Cuisines") : t(cuisineFilter)}
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700">
              <ul className="scroll py-2 text-sm text-slate-700 dark:text-slate-200 max-h-60 overflow-y-auto">
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleFilterChange("")}
                  >
                    {t("All Cuisines")}
                  </button>
                </li>
                {uniqueCuisines.map((cuisine) => (
                  <li key={cuisine}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleFilterChange(cuisine)}
                    >
                      {t(cuisine)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="search"
              className="block p-2.5 w-full z-20 text-sm text-slate-900 bg-slate-50 rounded-e-md border-s-gray-50 border-s-2 border-l-0 border border-slate-300 focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none"
              placeholder={t("Search restaurants...")}
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className={`p-2 rounded-lg ${
            viewMode === "grid"
              ? "bg-primary text-white"
              : "bg-slate-200 text-slate-700"
          }`}
          onClick={() => setViewMode("grid")}
        >
          <Grid size={20} />
        </button>
        <button
          className={`p-2 rounded-lg ${
            viewMode === "list"
              ? "bg-primary text-white"
              : "bg-slate-200 text-slate-700"
          }`}
          onClick={() => setViewMode("list")}
        >
          <List size={20} />
        </button>
      </div>
    </div>
  );
};

const RestaurantList = ({ restaurants, viewMode }) => {
    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      );
    }
  };

const RestaurantCard = ({ restaurant }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-t from-orange-100 to-transparent dark:bg-gradient-to-t dark:from-slate-800 dark:to-transparent rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition duration-300">
      <div className="flex flex-col items-center pt-4">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-24 h-24 mb-3 rounded-full shadow-md"
        />
        <h3 className="text-xl font-semibold mb-2 dark:text-white">
          {restaurant.name}
        </h3>
        <p className="text-slate-50 font-medium rounded-full bg-primary px-2 py-1 dark:text-gray-300 mb-2">
          {t(restaurant.cuisine)}
        </p>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <MapPin size={16} className="mr-1" />
          <p className="text-sm">{restaurant.location}</p>
        </div>
      </div>
      <div className="p-4">
        <button className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-dark transition duration-300">
          {t("View Menu")}
        </button>
      </div>
    </div>
  );
};

const RestaurantListItem = ({ restaurant }) => {
    const { t } = useTranslation();
    return (
      <div className="bg-white dark:bg-slate-800 rounded-md shadow-md overflow-hidden transition duration-300 flex flex-col h-full">
        <div className="flex flex-col sm:flex-row h-full">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full sm:w-40 h-48 sm:h-full object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {restaurant.name}
            </h3>
            <p className="text-slate-50 font-medium rounded-full w-fit bg-primary px-2 py-1 dark:text-gray-300 mb-2">
              {t(restaurant.cuisine)}
            </p>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <p className="text-sm">{restaurant.location}</p>
            </div>
            <div className="mt-auto">
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300">
                {t("View Menu")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Restaurants;
