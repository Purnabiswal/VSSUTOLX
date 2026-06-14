const whatsappMessage = (productTitle) => [
  'Hello, I found your listing on VSSUT OLX.',
  '',
  'I am interested in purchasing:',
  productTitle,
  '',
  'Can we discuss this item?',
].join('\n');

export const normalizeIndianWhatsappNumber = (number) => {
  const digits = String(number || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  return '';
};

export const buildWhatsappLink = ({ number, productTitle = 'your listing' }) => {
  const normalized = normalizeIndianWhatsappNumber(number);
  if (!normalized) return '';
  return `https://wa.me/${normalized}?text=${encodeURIComponent(whatsappMessage(productTitle))}`;
};
