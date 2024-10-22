import * as Yup from 'yup';

export const restaurantValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Restaurant name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  cuisineType: Yup.string()
    .required('Cuisine type is required')
    .min(2, 'Cuisine type must be at least 2 characters')
    .max(30, 'Cuisine type must not exceed 30 characters'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must not exceed 100 characters'),
  location: Yup.string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters')
    .max(50, 'Location must not exceed 50 characters'),
  banner: Yup.mixed()
    .test('fileSize', 'File too large', (value) => !value || (value && value.size <= 5242880)) // 5MB
    .test('fileFormat', 'Unsupported Format', (value) => 
      !value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
    ),
  logo: Yup.mixed()
    .test('fileSize', 'File too large', (value) => !value || (value && value.size <= 2097152)) // 2MB
    .test('fileFormat', 'Unsupported Format', (value) => 
      !value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
    ),
  manager: Yup.string().required('Manager is required'),
});

export default restaurantValidationSchema;