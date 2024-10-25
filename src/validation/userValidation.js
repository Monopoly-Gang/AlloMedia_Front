import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must not exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
    ),
  role: Yup.string()
    .required('Role is required')
    .oneOf(['client', 'livreur', 'gestionnaire', 'super_admin'], 'Invalid role'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must not exceed 100 characters'),
    phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\+212[5-7]\d{8}$/, 'Invalid phone number format'),
});

export default userValidationSchema;