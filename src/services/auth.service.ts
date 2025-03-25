import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { ApiError } from '../utils/Response';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

class AuthService {

  public async register(userData: RegisterData) {
    const { username, email, password } = userData;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new ApiError(400, 'Email already exists');
    }

    // Check if username exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      throw new ApiError(400, 'Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(String(user._id)), 
    };
  }


  public async login(loginData: LoginData) {
    const { email, password } = loginData;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(String(user._id)),
    };
  }

  public async logout() {
    return { message: 'Logged out successfully' };
  }
}

export default new AuthService();
