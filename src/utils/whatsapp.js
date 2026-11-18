export const WHATSAPP_PHONE = '201029317818';
export const DISPLAY_PHONE = '01029317818';
export const WHATSAPP_DISPLAY_PHONE = DISPLAY_PHONE;

export function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createCartWhatsAppUrl(cartItems, subtotal, shippingFee, discountAmount, total) {
  let message = `*طلب جديد من منصة نبتة الزراعية (مصر)* 🌱\n\n`;
  message += `*قائمة المستلزمات المطلوبة:*\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   - الكمية: ${item.quantity} ${item.product.weight || 'عبوة'}\n`;
    message += `   - السعر: ${item.product.price * item.quantity} ج.م\n`;
  });

  message += `\n-----------------------\n`;
  message += `المجموع الفرعي: ${subtotal} ج.م\n`;
  if (discountAmount > 0) {
    message += `الخصم: -${discountAmount} ج.م\n`;
  }
  message += `الشحن للمزرعة: ${shippingFee === 0 ? 'شحن مجاني' : `${shippingFee} ج.م`}\n`;
  message += `*الإجمالي المستحق: ${total} ج.م*\n\n`;
  message += `يرجى التواصل لتأكيد توفر الأصناف وموعد وصول الشاحنة للمزرعة.`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createOrderWhatsAppUrl(order) {
  let message = `*تأكيد طلب شحنة زراعية - نبتة مصر* 🚜\n\n`;
  message += `*رقم الطلب:* ${order.id}\n`;
  message += `*تاريخ الطلب:* ${order.date}\n`;
  message += `*اسم العميل / المشرف:* ${order.customerName || 'العميل'}\n`;
  message += `*رقم الهاتف:* ${order.customerPhone || ''}\n`;
  message += `*موقع المزرعة:* ${order.shippingAddress}\n`;
  message += `*طريقة السداد:* ${order.paymentMethod}\n\n`;

  message += `*المستلزمات المطلوبة:*\n`;
  order.items.forEach((item, index) => {
    const pName = item.product?.name || item.name;
    const pPrice = item.product?.price || item.price;
    message += `${index + 1}. ${pName} × ${item.quantity} (${pPrice * item.quantity} ج.م)\n`;
  });

  message += `\n-----------------------\n`;
  message += `المجموع الفرعي: ${order.subtotal} ج.م\n`;
  if (order.discount > 0) {
    message += `خصم الكوبون: -${order.discount} ج.م\n`;
  }
  message += `الشحن والتوصيل: ${order.shipping === 0 ? 'مجاني' : `${order.shipping} ج.م`}\n`;
  message += `*الإجمالي النهائي: ${order.total} ج.م*\n\n`;
  message += `أرجو تأكيد حجز الشحنة وبدء التحميل. شكراً لكم!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
