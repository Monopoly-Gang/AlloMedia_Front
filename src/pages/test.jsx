import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Grid, List, Filter } from "lucide-react";
import SpinnerIcon from "../components/SpinnerIcon";
import { getRequest } from "../utils/axiosRequests";

const RestaurantDetails = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(6);
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);

  // Fetching menu items
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const uri = `MenuItem/getMenuItems/${id}`;
        const data = await getRequest(uri);
        setRestaurantData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        setRestaurantData([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleMenuItemClick = (id) => {
    navigate(`/menu-details/${id}`);
  };

  // Memoize filtered menu items based on search term and price range
  const filteredMenu = useMemo(() => {
    if (!restaurantData) return [];
    return restaurantData.filter((item) => {
      const matchesPrice =
        (priceRange.from === "" || item.price >= parseFloat(priceRange.from)) &&
        (priceRange.to === "" || item.price <= parseFloat(priceRange.to));
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesPrice && matchesSearch;
    });
  }, [priceRange, searchTerm, restaurantData]);

  const visibleItems = filteredMenu.slice(0, visibleMenu);

  const uniqueCuisines = restaurantData
    ? [...new Set(restaurantData.map((item) => item.description))]
    : [];

  const handlePriceChange = (e) => {
    const { id, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [id]: value }));
  };

  const handleViewMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleMenu((prev) => prev + 6);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading && !restaurantData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerIcon className="w-8 h-8" />
      </div>
    );
  }

  return (
    <section className="py-10 md:py-20 lg:py-14 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 flex">
        <div className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {restaurantData && restaurantData.length > 0 && (
            <>
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
                <img
                  src={restaurantData[0].cover || "default-cover-url"}
                  alt="Restaurant Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
                  <img
                    src={restaurantData[0].logo || "default-logo-url"}
                    alt="Restaurant Logo"
                    className="w-24 h-24 rounded-full border-4 border-white mr-4"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {restaurantData[0].restaurantName || "Restaurant Name"}
                    </h1>
                    <p className="text-xl text-white">
                      {restaurantData[0].cuisineType || "Various Cuisines"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchAndFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  cuisineFilter={cuisineFilter}
                  setCuisineFilter={setCuisineFilter}
                  uniqueCuisines={uniqueCuisines}
                  viewMode={viewMode}
                  visibleMenu={visibleMenu}
                  setViewMode={setViewMode}
                />
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-3">
                    <MenuList
                      restaurantData={visibleItems}
                      viewMode={viewMode}
                      onMenuItemClick={handleMenuItemClick}
                    />
                    {visibleMenu < filteredMenu.length && (
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
                  <aside className="col-span-1 text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Filter size={20} />
                      <h2 className="text-base font-semibold">{t("Filter by")}</h2>
                    </div>
                    <div className="flex flex-col items-center gap-4 rounded-md p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div>
                        <h3 className="text-sm font-semibold">{t("Price")}</h3>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center">
                          <input
                            id="from"
                            type="number"
                            value={priceRange.from}
                            onChange={handlePriceChange}
                            className="border border-gray-300 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-50 text-sm font-medium rounded-full w-full py-2 px-4 focus:outline-none"
                            placeholder={t("From")}
                            min="0"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            id="to"
                            type="number"
                            value={priceRange.to}
                            onChange={handlePriceChange}
                            className="border border-gray-300 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-50 text-sm font-medium rounded-full w-full py-2 px-4 focus:outline-none"
                            placeholder={t("To")}
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetails;