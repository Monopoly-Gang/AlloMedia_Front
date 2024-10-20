import React from "react";
import ManagerDetails from "./ManagerDetails";
import RestaurantDetailsInfo from "./RestaurantDetailsInfo";

const RestaurantInfoSection = ({ restaurantData }) => (
  <div>
    <ManagerDetails manager={restaurantData.manager} />
    <RestaurantDetailsInfo restaurantData={restaurantData} />
  </div>
);

export default RestaurantInfoSection;