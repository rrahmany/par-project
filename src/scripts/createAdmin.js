// این فایل باید کاملاً حذف شود
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@parnian.com',
        password: hashedPassword,
        firstName: 'مدیر',
        lastName: 'سیستم',
        role: 'ADMIN',
        isActive: true
      }
    });

    console.log('کاربر ادمین با موفقیت ایجاد شد:', admin);
  } catch (error) {
    console.error('خطا در ایجاد کاربر ادمین:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();