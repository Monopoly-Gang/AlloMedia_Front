import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { User, MessageCircle, DollarSign } from 'lucide-react';
import InputField from '../../../components/InputField';
import ImageUpload from '../../../components/ImageUpload';
import TextArea from '../../../components/TextArea';
import { menuItemSchema } from '../../../validation/menuItemValidation';

const AddMenuItem = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = async (name, value) => {
    try {
      await menuItemSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    validateField(name, value);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          image: reader.result
        }));
        validateField('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = async () => {
    try {
      await menuItemSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      console.log('Menu item data:', formData);
      toast.success(t('Menu item added successfully'));
      setFormData({ name: '', description: '', price: '', image: null });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 dark:text-slate-400">{t('Add Menu Item')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="name"
          name="name"
          type="text"
          placeholder={t('Name')}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
          icon={User}
        />

        <TextArea
          id="description"
          name="description"
          placeholder={t('Description')}
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          touched={touched.description}
          icon={MessageCircle}
        />

        <InputField
          id="price"
          name="price"
          type="text"
          placeholder={t('Price')}
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          touched={touched.price}
          icon={DollarSign}
        />

        <ImageUpload
          name="image"
          label={t('Image')}
          onChange={handleImageChange}
          error={errors.image}
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