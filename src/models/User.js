const UserSchema = {
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  role: String, // 'ADMIN' یا 'USER'
  isActive: Boolean,
  mobile: String,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date,
  profileImage: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
};