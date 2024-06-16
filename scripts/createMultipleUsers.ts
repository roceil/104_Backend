import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../src/models/user';
import { Profile } from '../src/models/profile';
import { Collection } from '../src/models/collection';
import { MatchListSelfSetting, options } from '../src/models/matchListSelfSetting';
import connectDB from '../configs/dbConn';
import { v4 as uuidv4 } from 'uuid';


interface UserToCreate {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
}

// 酷斃了的名稱列表 有梗的再放進去
// 雖然目前我只能用GPT想些沒梗的
const names = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack',
  'Karen', 'Leo', 'Mona', 'Nancy', 'Oscar', 'Paul', 'Quincy', 'Rachel', 'Sam', 'Tina',
  'Uma', 'Victor', 'Wendy', 'Xander', 'Yvonne', 'Zack', '喵喵怪'
];

const generateUsers = (count: number): UserToCreate[] => {
  const users: UserToCreate[] = [];
  for (let i = 1; i <= count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const uuid = uuidv4(); // 使用 UUID 產生唯一值
    const isActive = Math.random() < 0.5; // 50% 機率設置 isActive 為 true 或 false
    users.push({
      username: `${name}`,
      email: `user${uuid}@example.com`,
      password: 'password1234567',
      isActive,
    });
  }
  return users;
};

const usersToCreate = generateUsers(50);

const getRandomOption = (options) => {
  const keys = Object.keys(options).map(Number);
  return keys[Math.floor(Math.random() * keys.length)];
};

const getRandomOptionsArray = (options, maxCount) => {
  const keys = Object.keys(options).map(Number);
  const count = Math.floor(Math.random() * maxCount) + 1;
  const result = new Set();
  while (result.size < count) {
    result.add(keys[Math.floor(Math.random() * keys.length)]);
  }
  return Array.from(result);
};


const createUsers = async () => {
  try {
    await connectDB();
    console.log('MongoDB 連線成功');

    const createdUsers: mongoose.Types.ObjectId[] = [];

    for (const user of usersToCreate) {
      const { username, email, password, isActive } = user;

      // 密碼加密
      const hashPassword = await bcrypt.hash(password, 10);

      // // 隨機選擇 income, company, job
      // const income = incomes[Math.floor(Math.random() * incomes.length)];
      // const company = companies[Math.floor(Math.random() * companies.length)];
      // const job = jobs[Math.floor(Math.random() * jobs.length)];

      // 新增使用者
      const newUser = await User.create({
        personalInfo: {
          username,
          email,
          password: hashPassword,
        },
        isActive,
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

      // 新增配對設定
      await MatchListSelfSetting.create({
        userId: newUser._id,
        personalInfo: {
          age: getRandomOption(options[0].options),
          gender: getRandomOption(options[1].options),
          isMarried: getRandomOption(options[4].options),
          height: getRandomOption(options[2].options),
          weight: getRandomOption(options[3].options),
          socialCircle: getRandomOption(options[10].options),
          activities: getRandomOptionsArray(options[11].options, 3),
          location: getRandomOption(options[5].options),
          education: getRandomOption(options[6].options),
          liveWithParents: getRandomOption(options[7].options),
          religion: getRandomOption(options[8].options),
          smoking: getRandomOption(options[9].options)
        },
        workInfo: {
          occupation: getRandomOption(options[12].options),
          industry: getRandomOptionsArray(options[13].options, 3),
          workLocation: getRandomOption(options[5].options),
          expectedSalary: getRandomOption(options[14].options)
        }
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
