import * as yup from 'yup';


export const schemaUser = yup.object().shape({
    fname: yup.string()
                .trim("first name contain leading spaces")
                .required("first name is required"),
    sname: yup.string()
                .trim("second name contain leading spaces")
                .required("second name is required"),
    email: yup.string()
                .email("Email should be valid and contain @")
                .required("Email is required"),
    phone: yup.string()
                .required("Phone Number is required") 
                .min(8, 'Phone number should have more than 8 characters'),
    password: yup.string()
                .required('Please enter your password.')
                .min(8, 'Your password is too short.'),
    cpassword: yup.string()
                .required('Please retype your password.')
                .oneOf([yup.ref('password')], 'Your passwords do not match.') ,
    dob: yup.string()
                .trim("DOB contain leading spaces")
                .required("Date of Birth is required"),     
});

export const schemaUserEdit = yup.object().shape({
  fname: yup.string()
              .trim("first name contain leading spaces")
              .required("first name is required"),
sname: yup.string()
              .trim("second name contain leading spaces")
              .required("second name is required"),
dob: yup.string()
              .trim("DOB contain leading spaces")
              .required("Date of Birth is required"),
});
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

export const imgCheck = yup.object().shape({
profile_image: yup.mixed()
              .required("You need to provide a file")
});

export const schemaLogin = yup.object().shape({
  username: yup.string()
              .trim("Username contain leading spaces")
              .required("Username is required"),
password: yup.string()
              .trim("Description contain leading spaces")
      .required("Password is required")
              
});