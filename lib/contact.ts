export const WHATSAPP_NUMBER = '2347068495149';
export const WHATSAPP_DISPLAY = '+234 706 849 5149';
export const CONTACT_EMAIL = 'iyiola@sulvatech.com';

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
