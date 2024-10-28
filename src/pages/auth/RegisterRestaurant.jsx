import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import ImageUpload from "../../components/ImageUpload";
import InputField from "../../components/InputField";
import useForm from "../../hooks/useForm";
import {
  managerDetailsSchema,
  restaurantDetailsSchema,
  imageUploadSchema,
} from "../../validation/addRestaurantValidation";
import Stepper from "../../components/Stepper";

const initialState = {
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
};
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const RegisterRestaurant = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const Auth = AuthService();
  const navigate = useNavigate();

  const {
    formData,
    errors,
    touched,
    isSubmitting,
    currentStep,
    handleChange,
    handleSubmit,
    handleStepChange,
  } = useForm(
    initialState,
    [managerDetailsSchema, restaurantDetailsSchema, imageUploadSchema],
    onSubmit
  );

  const steps = [
    t("Manager Details"),
    t("Restaurant Details"),
    t("Upload Images"),
  ];

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  async function onSubmit(data) {
    const isRegistered = await Auth.registerRestaurant({
      ...data,
      logo: data.logo.target.value,
      banner: data.banner.target.value,
    });
    if (isRegistered) navigate("/login");
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
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
          <>
            <ImageUpload
              name="banner"
              label={t("Banner")}
              onChange={(file) =>
                handleChange({ target: { name: "banner", value: file } })
              }
              error={errors.banner}
              t={t}
            />

            <ImageUpload
              name="logo"
              label={t("Logo")}
              onChange={(file) =>
                handleChange({ target: { name: "logo", value: file } })
              }
              error={errors.logo}
              t={t}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-10 bg-slate-50 dark:bg-slate-900 sm:px-16">
      <div className="relative w-full max-w-[900px] rounded-md bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)] p-2 dark:bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)]">
        <div className="relative flex flex-col justify-center rounded-md bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 px-6 lg:min-h-[500px] py-10">
          <div className="mx-auto w-full max-w-[647px]">
            <h1 className="text-2xl dark:text-slate-400 font-bold mb-4">
              {t("Add Restaurant")}
            </h1>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Stepper steps={steps} activeStep={currentStep} />
              </div>
              <form onSubmit={handleSubmit} className="w-full max-w-[647px]">
                {renderStepContent(currentStep)}
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => handleStepChange("prev")}
                    className="flex items-center px-4 py-2 font-semibold bg-slate-200 text-slate-700 rounded"
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    {t("Back")}
                  </button>
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-primary text-white font-semibold rounded"
                      disabled={isSubmitting}
                    >
                      <Save size={16} className="mr-2" />
                      {isSubmitting ? t("Saving...") : t("Save")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStepChange("next")}
                      className="flex items-center px-4 py-2 bg-primary text-white font-semibold rounded"
                    >
                      {t("Next")}
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
