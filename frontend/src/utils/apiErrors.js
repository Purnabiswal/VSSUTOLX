const statusMessages = {
  401: 'Unauthorized. Please login.',
  403: 'You do not have permission to perform this action.',
  404: 'Listing not found.',
  409: 'Email already exists.',
  422: 'Please fix the highlighted fields.',
  500: 'Server error. Please try again.',
};

export function parseApiError(error) {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const details = data?.details || data?.errors || [];
  const detailMessage = Array.isArray(details)
    ? details.map((item) => item.msg || item.message).filter(Boolean).join(', ')
    : '';
  const message = detailMessage || data?.message || statusMessages[status] || error?.message || 'Something went wrong';
  return { message, status, details };
}

export function errorMessage(error) {
  return error?.message || parseApiError(error).message;
}
