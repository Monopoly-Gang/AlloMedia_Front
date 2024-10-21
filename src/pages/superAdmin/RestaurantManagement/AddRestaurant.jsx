import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  ArrowRight,
  ArrowLeft,
  Save,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Building,
  UtensilsCrossed,
} from "lucide-react";
import ImageUpload from "../../../components/ImageUpload";
import InputField from "../../../components/InputField";
import {
  validateStep,
  managerDetailsSchema,
  restaurantDetailsSchema,
  imageUploadSchema,
} from "../../../validation/addRestaurantValidation";

const AddRestaurant = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const steps = [
    t("Manager Details"),
    t("Restaurant Details"),
    t("Upload Images"),
  ];

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateField = async (name, value) => {
    let schema;
    if (managerDetailsSchema.fields[name]) {
      schema = managerDetailsSchema;
    } else if (restaurantDetailsSchema.fields[name]) {
      schema = restaurantDetailsSchema;
    } else if (imageUploadSchema.fields[name]) {
      schema = imageUploadSchema;
    }

    if (schema) {
      try {
        await Yup.reach(schema, name).validate(value);
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setTouched((prev) => ({ ...prev, [name]: true }));
      } catch (error) {
        setErrors((prev) => ({ ...prev, [name]: error.message }));
        setTouched((prev) => ({ ...prev, [name]: true }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    validateField(name, files ? files[0] : value);
  };

  const handleStepChange = async (nextStep) => {
    const { isValid, errors } = await validateStep(activeStep, formData);
    if (isValid) {
      setActiveStep(nextStep);
    } else {
      setErrors(errors);
      setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = await validateStep(activeStep, formData);
    if (isValid) {
      console.log(formData);
      // TODO: Send data to backend
    } else {
      setErrors(errors);
    }
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
                  name="fullName"
                  placeholder={t("Full Name")}
                  value={formData.fullName}
                  onChange={handleChange}
                  icon={User}
                  error={errors.fullName}
                  touched={touched.fullName}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="email"
                  name="email"
                  placeholder={t("Email")}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  error={errors.email}
                  touched={touched.email}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <InputField
                  id="password"
                  name="password"
                  placeholder={t("Password")}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  icon={Lock}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  error={errors.password}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder={t("Phone Number")}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  icon={Phone}
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />
              </div>
            </div>
            <InputField
              id="address"
              name="address"
              placeholder={t("Address")}
              value={formData.address}
              onChange={handleChange}
              icon={MapPin}
              error={errors.address}
              touched={touched.address}
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
                  name="restaurantName"
                  placeholder={t("Restaurant Name")}
                  value={formData.restaurantName}
                  onChange={handleChange}
                  icon={Building}
                  error={errors.restaurantName}
                  touched={touched.restaurantName}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="cuisineType"
                  name="cuisineType"
                  placeholder={t("Cuisine Type")}
                  value={formData.cuisineType}
                  onChange={handleChange}
                  icon={UtensilsCrossed}
                  error={errors.cuisineType}
                  touched={touched.cuisineType}
                />
              </div>
            </div>
            <InputField
              id="restaurantAddress"
              name="restaurantAddress"
              placeholder={t("Restaurant Address")}
              value={formData.restaurantAddress}
              onChange={handleChange}
              icon={MapPin}
              error={errors.restaurantAddress}
              touched={touched.restaurantAddress}
            />
            <InputField
              id="location"
              name="location"
              placeholder={t("Location")}
              value={formData.location}
              onChange={handleChange}
              icon={MapPin}
              error={errors.location}
              touched={touched.location}
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
                error={errors.banner}
                t={t}
              />
            </div>
            <div className="w-1/3">
              <ImageUpload
                name="logo"
                label={t("Logo")}
                onChange={handleChange}
                error={errors.logo}
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
            onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
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
              onClick={() => handleStepChange(activeStep + 1)}
              className="flex items-center px-4 py-2 bg-primary text-white font-semibold rounded"
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
