const XLSX = require('xlsx');

const processProductExcel = (filePath) => {
  // خواندن فایل اکسل
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
  // تبدیل به آرایه‌ای از اشیاء
  const products = XLSX.utils.sheet_to_json(worksheet, { 
    header: [
      'name',
      'price',
      'originalPrice',
      'discount',
      'rating',
      'reviewCount',
      'image',
      'brand',
      'category',
      'description',
      'isNew'
    ],
    range: 1 // شروع از ردیف دوم (بعد از هدر)
  });

  // پردازش و اعتبارسنجی داده‌ها
  return products.map(product => ({
    name: product.name,
    price: Number(product.price),
    originalPrice: Number(product.originalPrice),
    discount: Number(product.discount),
    rating: Number(product.rating),
    reviewCount: Number(product.reviewCount),
    image: product.image,
    brand: product.brand,
    category: product.category,
    description: product.description,
    isNew: product.isNew === 'true'
  }));
};

module.exports = { processProductExcel };