# 使用帶有 Node.js 20 的官方基礎映像
FROM node:20

# 設定工作目錄
WORKDIR /app

# 安裝 pnpm
RUN npm install -g pnpm

# 複製 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安裝依賴
RUN pnpm install --frozen-lockfile

# 複製 TypeScript 設定檔案、進入點和配置目錄
COPY tsconfig.json ./
COPY app.ts ./
COPY configs ./configs
COPY ./swagger-output.json /app/


# 複製源代碼
COPY src ./src

# 編譯 TypeScript
RUN pnpm run build

# 暴露容器在 3000 端口
EXPOSE 3000

# 啟動 Node.js 應用
CMD ["node", "dist/app.js"]
