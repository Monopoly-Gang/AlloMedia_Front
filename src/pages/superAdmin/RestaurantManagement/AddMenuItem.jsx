import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import InputField from '../../../components/InputField';
import ImageUpload from '../../../components/ImageUpload';
import TextArea from '../../../components/TextArea';

const AddMenuItem = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('Name is required');
    if (formData.name.length < 2) newErrors.name = t('Name must be at least 2 characters');
    if (formData.name.length > 50) newErrors.name = t('Name must not exceed 50 characters');
    if (!formData.price) newErrors.price = t('Price is required');
    if (parseFloat(formData.price) < 0) newErrors.price = t('Price must be a positive number');
    if (parseFloat(formData.price) > 1000000) newErrors.price = t('Price must not exceed 1,000,000');
    if (formData.description.length > 500) newErrors.description = t('Description must not exceed 500 characters');
    if (!formData.image) newErrors.image = t('Image is required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement API call to save menu item
      console.log('Menu item data:', formData);
      toast.success(t('Menu item added successfully'));
      setFormData({ name: '', description: '', price: '', image: null });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">{t('Add Menu Item')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="name"
          type="text"
          placeholder={t('Name')}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          touched={true}
        />

        <TextArea
          id="description"
          placeholder={t('Description')}
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
        />

        <InputField
          id="price"
          type="number"
          placeholder={t('Price')}
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          touched={true}
        />

        <ImageUpload
          name="image"
          label={t('Image')}
          onChange={handleImageChange}
          t={t}
        />
        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          {t('Add Menu Item')}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;