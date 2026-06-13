export const required = (label) => ({ required: `${label} is required` });

export const priceValidation = {
  required: 'Price is required',
  min: { value: 1, message: 'Price must be greater than 0' },
};

export const emailValidation = {
  required: 'Email is required',
  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
};
