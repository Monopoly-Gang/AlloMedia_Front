import { useState, useEffect  } from "react";
import { useNavigate , useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import MenuItem from "./MenuItem";
import SpinnerIcon from "../../components/SpinnerIcon";
import PropTypes from 'prop-types';
import axiosInstance  from "../../config/axiosService";

const MenuSection = ({userRole = 'restaurantManager' }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const fetchRestaurantData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/MenuItem/getMenuItems/${id}`);
      if (response.status === 200) {
        console.log(response.data);
        setMenuItems(response.data);
      } else {
        toast.error(t("Failed to load restaurant data"));
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      toast.error(t("Failed to load restaurant data"));
    } finally {
      setLoading(false);
    }
  };

  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleDeleteMenuItem = (id) => {
    setMenuItems((prevItems) => prevItems.filter(item => item._id !== id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredMenu.slice(0, indexOfLastItem);

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  const handleAddMenuItem = () => {
    const route = userRole === 'superAdmin' 
      ? "/dashboard/super-admin/add-menu-item"
      : `/dashboard/restaurant-manager/add-menu-item/${id}`;
    navigate(route);
  };

  return (
    <div className="md:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold dark:text-white">{t("Menu")}</h2>
        <button
          className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
          onClick={handleAddMenuItem}
        >
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
          <MenuItem key={item._id} item={item} onDelete={handleDeleteMenuItem} />
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

MenuSection.propTypes = {
  userRole: PropTypes.oneOf(['superAdmin', 'restaurantManager'])
};

export default MenuSection;
