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
            <InfoItem icon={<User size={18} />} label={t("Owner")} value={restaurant.owner} />
            <InfoItem icon={<Mail size={18} />} label={t("Email")} value={restaurant.email} />
            <InfoItem icon={<Phone size={18} />} label={t("Phone")} value={restaurant.phone} />
            <InfoItem icon={<Utensils size={18} />} label={t("Cuisine Type")} value={restaurant.cuisineType} />
          </div>
          
          <div className="mb-6">
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
      // Simulating an API call to send notification
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
          <nav className="flex items-center justify-center gap-x-1" aria-label="Pagination">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
              <span className="sr-only">{t("Previous")}</span>
            </button>
            <div className="flex items-center gap-x-1">
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  type="button"
                  onClick={() => setCurrentPage(number + 1)}
                  className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${
                    currentPage === number + 1
                      ? "bg-gray-200 text-gray-800 dark:bg-primary dark:text-white"
                      : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                  } py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:focus:bg-white/10`}
                  aria-current={currentPage === number + 1 ? "page" : undefined}
                >
                  {number + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              aria-label="Next"
            >
              <span className="sr-only">{t("Next")}</span>
              <ChevronRight size={14} />
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