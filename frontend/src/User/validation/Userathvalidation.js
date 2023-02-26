import * as Yup from 'yup';

export const signupvalidationSchema = Yup.object().shape({
    lastname: Yup.string().required('lastname is required'),
    firstname: Yup.string()
      .required('first name is required')
      .min(3, 'first name must be at least 6 characters')
      .max(20, 'first name must not exceed 20 characters'),
    username: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(3, 'Password must be at least 3 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmpass: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      acceptTerms:Yup.bool().oneOf([true], 'Accept Terms is required')
  });
 export  const loginvalidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(3, 'Password must be at least 3 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });






