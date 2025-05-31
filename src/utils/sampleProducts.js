const sampleProducts = [
  {
    id: 1,
    name: "کرم مرطوب کننده هیدرودرم",
    brand: "هیدرودرم",
    description: "کرم مرطوب کننده مناسب پوست خشک و حساس",
    price: 185000,
    discount: 15,
    category: "مراقبت پوست",
    image: "https://dkstatics-public.digikala.com/digikala-products/117515091.jpg",
    rating: 4.5,
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "سرم ویتامین C سینره",
    brand: "سینره",
    description: "سرم روشن کننده و ضد لک حاوی ویتامین C",
    price: 245000,
    discount: 20,
    category: "مراقبت پوست",
    image: "https://dkstatics-public.digikala.com/digikala-products/121343611.jpg",
    rating: 4.8,
    date: "2024-01-20"
  },
  {
    id: 3,
    name: "ژل شستشو صورت نوتروژینا",
    brand: "نوتروژینا",
    description: "ژل شستشو مناسب انواع پوست",
    price: 165000,
    discount: 10,
    category: "پاک کننده",
    image: "https://dkstatics-public.digikala.com/digikala-products/110534679.jpg",
    rating: 4.3,
    date: "2024-01-18"
  },
  {
    id: 4,
    name: "کرم ضد آفتاب لاروش پوزای",
    brand: "لاروش پوزای",
    description: "کرم ضد آفتاب با SPF50 مناسب پوست چرب",
    price: 395000,
    discount: 25,
    category: "ضد آفتاب",
    image: "https://dkstatics-public.digikala.com/digikala-products/114712754.jpg",
    rating: 4.9,
    date: "2024-01-22"
  }
];

// ذخیره محصولات در localStorage
localStorage.setItem('products', JSON.stringify(sampleProducts));