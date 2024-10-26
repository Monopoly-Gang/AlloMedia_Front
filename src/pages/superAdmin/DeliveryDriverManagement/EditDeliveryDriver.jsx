import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import InputField from '../../../components/InputField';

const EditDeliveryDriver = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        // API call to fetch driver data would go here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
        const mockData = {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: '+1234567890',
          address: '123 Delivery St, City, Country',
        };
        setFormData(mockData);
      } catch (error) {
        console.error('Error fetching delivery driver data:', error);
        toast.error(t('Failed to load delivery driver data'));
      }
    };

    fetchDriverData();
  }, [id, t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to update delivery driver would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      console.log('Updated delivery driver:', formData);
      toast.success(t('Delivery driver updated successfully'));
    } catch (error) {
      console.error('Error updating delivery driver:', error);
      toast.error(t('Failed to update delivery driver'));
    }
  };

 
  return (
    <div className="max-w-xl mx-auto border border-slate-200 dark:border-slate-800 rounded-md bg-slate-50 dark:bg-slate-900 p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">{t('Edit Delivery Driver')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={t('Full Name')}
          icon={() => <User size={20} />}
          required
        />
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('Email')}
          icon={() => <Mail size={20} />}
          required
        />
        <InputField
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder={t('Phone Number')}
          icon={() => <Phone size={20} />}
          required
        />
        <InputField
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder={t('Address')}
          icon={() => <MapPin size={20} />}
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors"
        >
          {t('Update Delivery Driver')}
        </button>
      </form>
    </div>
  );
};

export default EditDeliveryDriver;