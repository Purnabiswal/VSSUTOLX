export const required = (label) => ({ required: `${label} is required` });

export const priceValidation = {
  required: 'Price is required',
  min: { value: 1, message: 'Price must be greater than 0' },
};

export const emailValidation = {
  required: 'Email is required',
  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
};

export const whatsappValidation = {
  pattern: {
    value: /^[6-9]\d{9}$/,
    message: 'WhatsApp number must be a valid Indian mobile number',
  },
};
