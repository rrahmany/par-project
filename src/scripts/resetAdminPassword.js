// این فایل باید کاملاً حذف شود
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    const newPassword = 'Admin@123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatedAdmin = await prisma.user.update({
      where: {
        email: 'admin@parnian.com'
      },
      data: {
        password: hashedPassword
      }
    });

    console.log('رمز عبور ادمین با موفقیت بازنشانی شد');
    console.log('ایمیل:', updatedAdmin.email);
    console.log('رمز عبور جدید:', newPassword);
  } catch (error) {
    console.error('خطا در بازنشانی رمز عبور:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();