const express = require('express');
const router = express.Router();
const multer = require('multer');
const { processProductExcel } = require('../utils/excelProcessor');

// تنظیمات ذخیره فایل
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// مسیر آپلود فایل اکسل
router.post('/upload-products', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'لطفاً یک فایل انتخاب کنید' });
    }

    const products = processProductExcel(req.file.path);
    
    // اینجا می‌توانید محصولات را در دیتابیس ذخیره کنید
    // await Product.bulkCreate(products);

    res.json({ 
      message: 'محصولات با موفقیت آپلود شدند',
      productsCount: products.length 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'خطا در پردازش فایل',
      error: error.message 
    });
  }
});

module.exports = router;