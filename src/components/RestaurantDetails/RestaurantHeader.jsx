import PropTypes from 'prop-types';

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

RestaurantHeader.propTypes = {
  restaurantData: PropTypes.object.isRequired,
};

export default RestaurantHeader;