import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function removeAdminUsers() {
  try {
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        role: 'ADMIN'
      }
    });

    console.log('تمام کاربران ادمین با موفقیت حذف شدند');
    console.log('تعداد کاربران حذف شده:', deletedUsers.count);
  } catch (error) {
    console.error('خطا در حذف کاربران ادمین:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeAdminUsers();