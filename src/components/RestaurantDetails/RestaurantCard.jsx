import { MapPin, Mail, Phone, Edit, Trash2 } from "lucide-react";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const RestaurantCard = ({ restaurant, onViewDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 flex flex-col items-center">
        <img
          src={restaurant.logo}
          alt={`${restaurant.name} logo`}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold text-center dark:text-white mb-1 line-clamp-1">
          {restaurant.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {restaurant.owner}
        </p>
        <div className="w-full space-y-2">
          <div className="flex items-start">
            <MapPin
              size={16}
              className="text-primary mr-2 mt-1 flex-shrink-0"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {restaurant.address}
            </p>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="text-primary mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {restaurant.email}
            </p>
          </div>
          <div className="flex items-center">
            <Phone
              size={16}
              className="text-primary mr-2 flex-shrink-0"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {restaurant.phone}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full mt-8">
          <button
            className="w-1/2 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition duration-300"
            onClick={() => onViewDetails(restaurant.id)}
          >
            {t("View Details")}
          </button>
          <div className="flex flex-row items-center justify-center">
            <button className="flex items-center text-green-500 mr-2 rounded-full bg-slate-200 dark:bg-slate-800 p-2">
              <Edit size={16} />
            </button>
            <button className="flex items-center text-red-500 rounded-full bg-slate-200 dark:bg-slate-800 p-2">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.object.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default RestaurantCard;