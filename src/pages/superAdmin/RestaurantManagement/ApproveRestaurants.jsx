import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Check, X, ChevronLeft, ChevronRight, User, Utensils, Mail, Phone, MapPin, Bell } from "lucide-react";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

const mockRestaurants = [
    {
      id: 1,
      name: "HEALTHY FEAST CORNER",
      owner: "Hollie Bruggen",
      address: "2123 Osprey the Blue Mountains, Townline, Feversham, ON NOC 1CO, Canada",
      email: "hbruggen0@narod.ru",
      phone: "1078832848",
      logo: "https://via.placeholder.com/150?text=Healthy+Feast+Corner",
      cuisineType: "Healthy",
    },
    {
      id: 2,
      name: "FARMHOUSE DISH HEAVEN",
      owner: "Delainey Soden",
      address: "2045 Scotch Line, Essa, Ontario, L9R 1V2, Alliston, CA",
      email: "dsoden1@fda.gov",
      phone: "2847899814",
      logo: "https://via.placeholder.com/150?text=Farmhouse+Dish+Heaven",
      cuisineType: "American",
    },
    {
      id: 3,
      name: "KITCHEN CREATION",
      owner: "Lou Hillen",
      address: "6058 Townhigh Mountains, Sideroad, Clarksburg, ON.",
      email: "lhillen2@dyndns.org",
      phone: "2816686226",
      logo: "https://via.placeholder.com/150?text=Kitchen+Creation",
      cuisineType: "Italian",
    },
    {
      id: 4,
      name: "COUNTRY COOKING COVE",
      owner: "Karlyn Newsome",
      address: "A-67 Concession 8, Nottawasaga RD, Glen Huron, Poland",
      email: "knewsome3@alexa.com",
      phone: "1102607941",
      logo: "https://via.placeholder.com/150?text=Country+Cooking+Cove",
      cuisineType: "Mexican",
    },
    {
      id: 5,
      name: "URBAN TASTE BISTRO",
      owner: "Jordan Smith",
      address: "123 Main St, Toronto, ON M5H 2N2, Canada",
      email: "jsmith@urbantaste.com",
      phone: "4165551234",
      logo: "https://via.placeholder.com/150?text=Urban+Taste+Bistro",
      cuisineType: "Fusion",
    },
    {
      id: 6,
      name: "SEAFOOD DELIGHT",
      owner: "Marina Fisher",
      address: "456 Ocean Ave, Vancouver, BC V6Z 2Y7, Canada",
      email: "mfisher@seafooddelight.com",
      phone: "6045555678",
      logo: "https://via.placeholder.com/150?text=Seafood+Delight",
      cuisineType: "Seafood",
    },
    {
      id: 7,
      name: "VEGAN VIBES",
      owner: "Ella Green",
      address: "789 Greenway Blvd, Ottawa, ON K1A 0B1, Canada",
      email: "egreen@veganvibes.com",
      phone: "6135557890",
      logo: "https://via.placeholder.com/150?text=Vegan+Vibes",
      cuisineType: "Vegan",
    },
    {
      id: 8,
      name: "SPICE ROUTE",
      owner: "Raj Patel",
      address: "101 Curry Ln, Calgary, AB T2P 3G7, Canada",
      email: "rpatel@spiceroute.com",
      phone: "4035551010",
      logo: "https://via.placeholder.com/150?text=Spice+Route",
      cuisineType: "Indian",
    },
    {
      id: 9,
      name: "SUSHI SENSATION",
      owner: "Akira Tanaka",
      address: "202 Sushi St, Montreal, QC H3B 1A1, Canada",
      email: "atanaka@sushisensation.com",
      phone: "5145552020",
      logo: "https://via.placeholder.com/150?text=Sushi+Sensation",
      cuisineType: "Japanese",
    },
    {
      id: 10,
      name: "TACO TOWN",
      owner: "Carlos Ramirez",
      address: "303 Fiesta Rd, Edmonton, AB T5J 3N8, Canada",
      email: "cramirez@tacotown.com",
      phone: "7805553030",
      logo: "https://via.placeholder.com/150?text=Taco+Town",
      cuisineType: "Mexican",
    },
    {
      id: 11,
      name: "PASTA PARADISE",
      owner: "Giovanni Rossi",
      address: "404 Pasta Pl, Winnipeg, MB R3C 4T3, Canada",
      email: "grossi@pastaparadise.com",
      phone: "2045554040",
      logo: "https://via.placeholder.com/150?text=Pasta+Paradise",
      cuisineType: "Italian",
    },
    {
      id: 12,
      name: "BURGER BARN",
      owner: "Sam Johnson",
      address: "505 Burger Blvd, Halifax, NS B3J 2K9, Canada",
      email: "sjohnson@burgerbarn.com",
      phone: "9025555050",
      logo: "https://via.placeholder.com/150?text=Burger+Barn",
      cuisineType: "American",
    },
    {
      id: 13,
      name: "THAI TREATS",
      owner: "Nina Chai",
      address: "606 Thai St, Victoria, BC V8W 1N6, Canada",
      email: "nchai@thaitreats.com",
      phone: "2505556060",
      logo: "https://via.placeholder.com/150?text=Thai+Treats",
      cuisineType: "Thai",
    },
    {
      id: 14,
      name: "FRENCH FLAIR",
      owner: "Pierre Dubois",
      address: "707 Paris Ave, Quebec City, QC G1R 4P5, Canada",
      email: "pdubois@frenchflair.com",
      phone: "4185557070",
      logo: "https://via.placeholder.com/150?text=French+Flair",
      cuisineType: "French",
    },
    {
      id: 15,
      name: "MEDITERRANEAN MAGIC",
      owner: "Sophia Papadopoulos",
      address: "808 Olive Rd, Hamilton, ON L8P 1A1, Canada",
      email: "spapadopoulos@mediterraneanmagic.com",
      phone: "9055558080",
      logo: "https://via.placeholder.com/150?text=Mediterranean+Magic",
      cuisineType: "Mediterranean",
    },
    {
      id: 16,
      name: "BBQ BLISS",
      owner: "Tommy Lee",
      address: "909 Grill St, Regina, SK S4P 3Y2, Canada",
      email: "tlee@bbqbliss.com",
      phone: "3065559090",
      logo: "https://via.placeholder.com/150?text=BBQ+Bliss",
      cuisineType: "BBQ",
    },
    {
      id: 17,
      name: "GREEK GARDEN",
      owner: "Dimitri Kosta",
      address: "1010 Athens Ln, St. John's, NL A1C 1A1, Canada",
      email: "dkosta@greekgarden.com",
      phone: "7095551010",
      logo: "https://via.placeholder.com/150?text=Greek+Garden",
      cuisineType: "Greek",
    },
    {
      id: 18,
      name: "CHINESE CHOW",
      owner: "Li Wei",
      address: "1111 Dragon Rd, Saskatoon, SK S7K 1N2, Canada",
      email: "lwei@chinesechow.com",
      phone: "3065551111",
      logo: "https://via.placeholder.com/150?text=Chinese+Chow",
      cuisineType: "Chinese",
    },
    {
      id: 19,
      name: "PIZZA PALACE",
      owner: "Mario Bianchi",
      address: "1212 Slice St, London, ON N6A 3K7, Canada",
      email: "mbianchi@pizzapalace.com",
      phone: "5195551212",
      logo: "https://via.placeholder.com/150?text=Pizza+Palace",
      cuisineType: "Pizza",
    },
    {
      id: 20,
      name: "SOUTHERN SOUL",
      owner: "Georgia Brown",
      address: "1313 Soul Ave, Charlottetown, PE C1A 1A1, Canada",
      email: "gbrown@southernsoul.com",
      phone: "9025551313",
      logo: "https://via.placeholder.com/150?text=Southern+Soul",
      cuisineType: "Southern",
    },
  ];

const Modal = ({ isOpen, onClose, restaurant, onApprove, onReject }) => {
  const { t } = useTranslation();
  if (!isOpen || !restaurant) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900 bg-opacity-80 flex justify-center items-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{restaurant.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            <img src={restaurant.logo} alt={restaurant.name} className="w-32 h-32 object-cover rounded-full mb-4" />
            <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
              {restaurant.cuisineType}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md"> 
              <InfoItem icon={<User size={18} />} label={t("Owner")} value={restaurant.owner} />
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md"> 
              <InfoItem icon={<Mail size={18} />} label={t("Email")} value={restaurant.email} />
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md"> 
              <InfoItem icon={<Phone size={18} />} label={t("Phone")} value={restaurant.phone} />
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md"> 
              <InfoItem icon={<Utensils size={18} />} label={t("Cuisine Type")} value={restaurant.cuisineType} />
            </div>
          </div>
          
          <div className="mb-6 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
            <InfoItem icon={<MapPin size={18} />} label={t("Address")} value={restaurant.address} />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button onClick={onReject} variant="danger">
              <X size={18} className="mr-2" />
              {t("Reject")}
            </Button>
            <Button onClick={onApprove} variant="success">
              <Check size={18} className="mr-2" />
              {t("Approve")}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 text-gray-500 dark:text-gray-400 mr-3">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-base">{value}</p>
    </div>
  </div>
);

const Button = ({ children, onClick, variant }) => {
  const baseClasses = "px-4 py-2 rounded-md transition-colors flex items-center justify-center";
  const variantClasses = {
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

const ApproveRestaurants = () => {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const itemsPerPage = 6;

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleApprove = useCallback(() => {
    if (selectedRestaurant) {
      setRestaurants(restaurants.filter((r) => r.id !== selectedRestaurant.id));
      toast.success(t("Restaurant approved"), {
        description: t("{{name}} has been successfully approved", {
          name: selectedRestaurant.name,
        }),
      });
      sendNotificationToManager(selectedRestaurant.id, 'approved');
      setIsModalOpen(false);
    }
  }, [selectedRestaurant, restaurants, t]);
  
  const handleReject = useCallback(() => {
    if (selectedRestaurant) {
      setRestaurants(restaurants.filter((r) => r.id !== selectedRestaurant.id));
      toast.error(t("Restaurant rejected"), {
        description: t("{{name}} has been rejected", { name: selectedRestaurant.name }),
      });
      sendNotificationToManager(selectedRestaurant.id, 'rejected');
      setIsModalOpen(false);
    }
  }, [selectedRestaurant, restaurants, t]);

  const sendNotificationToManager = async (restaurantId, status) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Notification sent to manager of restaurant ${restaurantId}: Status - ${status}`);
      toast.success(t("Notification sent to manager"), {
        icon: <Bell size={18} />,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error(t("Failed to send notification to manager"));
    }
  };

  const indexOfLastRestaurant = currentPage * itemsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - itemsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.ceil(restaurants.length / itemsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
        type="button"
        onClick={() => typeof number === 'number' && setCurrentPage(number)}
        className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${
          currentPage === number
            ? "bg-gray-200 text-gray-800 dark:bg-primary dark:text-white"
            : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
        } py-2 px-3 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:focus:bg-white/10`}
        aria-current={currentPage === number ? "page" : undefined}
        disabled={typeof number !== 'number'}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster richColors />
      <h1 className="text-3xl font-bold mb-6">{t("Approve Restaurants")}</h1>
      {restaurants.length === 0 ? (
        <p className="text-center py-8">{t("No pending restaurants to approve.")}</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {currentRestaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 flex flex-col items-center">
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="w-24 h-24 object-cover rounded-full mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2 text-center">{restaurant.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{restaurant.cuisineType}</p>
                  <button
                    onClick={() => openModal(restaurant)}
                    className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    {t("View Details")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <nav className="flex justify-center items-center space-x-2 mt-8" aria-label="Pagination">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            {renderPageNumbers()}
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </>
      )}
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            restaurant={selectedRestaurant}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  restaurant: PropTypes.object,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

InfoItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['danger', 'success']).isRequired,
};

export default ApproveRestaurants;