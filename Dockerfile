# 使用 Node.js 20 的官方映像作為基礎
FROM node:20

# 設定工作目錄
WORKDIR /app

# 安裝 pnpm
RUN npm install -g pnpm

# 複製專案
COPY . .

# 安裝依賴
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm run build

# nginx 配置
COPY service_nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露應用端口
EXPOSE 3001

# 啟動應用
CMD ["pnpm", "start"]