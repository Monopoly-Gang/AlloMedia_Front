import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import InputField from "../../../components/InputField";
import ImageUpload from "../../../components/ImageUpload";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import { User, MessageCircle, DollarSign } from "lucide-react";

const EditMenuItemPage = ({ onSave }) => {
  const { t } = useTranslation();
  const location = useLocation(); 
  const [formData, setFormData] = useState(location.state?.item || {});

  useEffect(() => {
    if (location.state?.item) {
      setFormData(location.state.item);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (file) => {
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!formData) {
    return <div>{t("No menu item selected")}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{t("Edit Menu Item")}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <InputField
              id="name"
              name="name"
              type="text"
              label={t("Name")}
              placeholder={t("Enter item name")}
              value={formData.name}
              onChange={handleChange}
              icon={User}
            />
          </div>

          <div className="flex-1">
            <InputField
              id="price"
              name="price"
              type="text"
              label={t("Price")}
              placeholder={t("Enter item price")}
              value={formData.price}
              onChange={handleChange}
              icon={DollarSign}
            />
          </div>
        </div>

        <TextArea
          id="description"
          name="description"
          label={t("Description")}
          placeholder={t("Enter item description")}
          value={formData.description}
          onChange={handleChange}
          icon={MessageCircle}
        />

        <ImageUpload
          name="image"
          label={t("Image")}
          onChange={handleImageChange}
          t={t}
        />

        <Button
          type="submit"
          className="w-full"
        >
          {t("Save Changes")}
        </Button>
      </form>
    </div>
  );
};

EditMenuItemPage.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default EditMenuItemPage;