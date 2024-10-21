import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Save, User, Mail, Lock, Phone, MapPin, Building, UtensilsCrossed } from "lucide-react";
import ImageUpload from "../../../components/ImageUpload";
import InputField from "../../../components/InputField";

const AddRestaurant = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    restaurantName: "",
    cuisineType: "",
    restaurantAddress: "",
    location: "",
    banner: null,
    logo: null,
  });

  const steps = [
    t("Manager Details"),
    t("Restaurant Details"),
    t("Upload Images"),
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <InputField
                  id="fullName"
                  placeholder={t("Full Name")}
                  value={formData.fullName}
                  onChange={handleChange}
                  icon={User}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="email"
                  placeholder={t("Email")}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <InputField
                  className=""
                  id="password"
                  placeholder={t("Password")}
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={Lock}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="phoneNumber"
                  placeholder={t("Phone Number")}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  icon={Phone}
                />
              </div>
            </div>
            <InputField
              id="address"
              placeholder={t("Address")}
              value={formData.address}
              onChange={handleChange}
              icon={MapPin}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <InputField
                  id="restaurantName"
                  placeholder={t("Restaurant Name")}
                  value={formData.restaurantName}
                  onChange={handleChange}
                  icon={Building}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="cuisineType"
                  placeholder={t("Cuisine Type")}
                  value={formData.cuisineType}
                  onChange={handleChange}
                  icon={UtensilsCrossed}
                />
              </div>
            </div>
            <InputField
              id="restaurantAddress"
              placeholder={t("Restaurant Address")}
              value={formData.restaurantAddress}
              onChange={handleChange}
              icon={MapPin}
            />
            <InputField
              id="location"
              placeholder={t("Location")}
              value={formData.location}
              onChange={handleChange}
              icon={MapPin}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-between space-x-4">
            <div className="w-2/3">
            <ImageUpload
              name="banner"
              label={t("Banner")}
              onChange={handleChange}
              t={t}
              />
            </div>
            <div className="w-1/3">
              <ImageUpload
                name="logo"
              label={t("Logo")}
              onChange={handleChange}
              t={t}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t("Add Restaurant")}</h1>
      <div className="mb-6">
        <Stepper steps={steps} activeStep={activeStep} />
      </div>
      <form onSubmit={handleSubmit}>
        {renderStepContent(activeStep)}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            className="flex items-center px-4 py-2 font-semibold bg-slate-200 text-slate-700 rounded"
            disabled={activeStep === 0}
          >
            <ArrowLeft size={16} className="mr-2" />
            {t("Back")}
          </button>
          {activeStep === steps.length - 1 ? (
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-primary text-white font-semibold rounded"
            >
              <Save size={16} className="mr-2" />
              {t("Save")}
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              className=" flex items-center px-4 py-2 bg-primary text-white font-semibold rounded"
            >
              {t("Next")}
              <ArrowRight size={16} className="ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const Stepper = ({ steps, activeStep }) => (
  <ol className="flex items-center w-full text-sm text-gray-500 font-medium sm:text-base mb-12">
    {steps.map((step, index) => (
      <li
        key={step}
        className={`flex md:w-full items-center ${
          index <= activeStep ? "text-primary" : "text-slate-400"
        } ${
          index < steps.length - 1
            ? "sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8"
            : ""
        }`}
      >
        <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2">
          <span
            className={`w-6 h-6 ${
              index <= activeStep ? "bg-primary text-white" : "bg-slate-200"
            } border ${
              index <= activeStep ? "border-primary" : "border-gray-200"
            } rounded-full flex justify-center items-center mr-3 text-sm lg:w-10 lg:h-10`}
          >
            {index + 1}
          </span>
          {step}
        </div>
      </li>
    ))}
  </ol>
);

export default AddRestaurant;
