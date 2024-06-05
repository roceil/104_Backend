import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../src/models/user';
import { Profile } from '../src/models/profile'; 
import { Collection } from '../src/models/collection'; 
import connectDB from '../configs/dbConn';
import { v4 as uuidv4 } from 'uuid';

interface UserToCreate {
  username: string;
  email: string;
  password: string;
}

// 酷斃了的名稱列表 有梗的再放進去
// 雖然目前我只能用GPT想些沒梗的
const names = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack',
  'Karen', 'Leo', 'Mona', 'Nancy', 'Oscar', 'Paul', 'Quincy', 'Rachel', 'Sam', 'Tina',
  'Uma', 'Victor', 'Wendy', 'Xander', 'Yvonne', 'Zack','喵喵怪'
];

const generateUsers = (count: number): UserToCreate[] => {
  const users: UserToCreate[] = [];
  for (let i = 1; i <= count; i++) {
    const name = names[Math.floor(Math.random() * names.length)]; 
    const uuid = uuidv4(); // 使用 UUID 產生唯一值
    users.push({
      username: `${name}`,
      email: `user${uuid}@example.com`,
      password: 'password1234567',
    });
  }
  return users;
};

const usersToCreate = generateUsers(50);

// 測試用的 不用在意
// const usersToCreate = [
//   { username: 'user1', email: 'user1@example.com', password: 'password1234567' },
//   { username: 'user2', email: 'user2@example.com', password: 'password1234567' },
//   { username: 'user3', email: 'user3@example.com', password: 'password1234567' },
// ];

const createUsers = async () => {
  try {
    await connectDB();
    console.log('MongoDB 連線成功');

    const createdUsers: mongoose.Types.ObjectId[] = [];

    for (const user of usersToCreate) {
      const { username, email, password } = user;

      // 密碼加密
      const hashPassword = await bcrypt.hash(password, 10);

      // 新增使用者
      const newUser = await User.create({
        personalInfo: {
          username,
          email,
          password: hashPassword,
        },
      });

      // 新增 profile
      await Profile.create({
        userId: newUser._id,
        tags: [],
        exposureSettings: {
          rating: null,
          isShow: true, // 設定為 true
          isMatch: false,
        }
      });

      // 新增 collection
      await Collection.create({
        userId: newUser._id,
        collectedUserId: [],
      });

      createdUsers.push(newUser._id);

      console.log(`User ${username} created successfully with profile`);
    }

    // 隨機產生收藏關係
    for (const userId of createdUsers) {
      // 從其他使用者中隨機選擇一個或多個
      const otherUsers = createdUsers.filter(id => !id.equals(userId));
      const randomCount = Math.floor(Math.random() * otherUsers.length) + 1; // 亂數產生收藏數量(?
      const randomUsers: mongoose.Types.ObjectId[] = [];

      for (let i = 0; i < randomCount; i++) {
        const randomIndex = Math.floor(Math.random() * otherUsers.length);
        randomUsers.push(otherUsers[randomIndex]);
        otherUsers.splice(randomIndex, 1); // 確保不會重複選擇同一個使用者
      }

      // 更新收藏紀錄
      await Collection.updateOne(
        { userId },
        { $addToSet: { collectedUserId: { $each: randomUsers } } }
      );

      console.log(`User ${userId} randomly collected users: ${randomUsers}`);
    }

    console.log('所有使用者新增成功並隨機收藏對方(b= W=)b');
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    mongoose.connection.close();
  }
};

createUsers();
