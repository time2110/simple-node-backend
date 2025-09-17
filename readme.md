# 📚 Node.js 后端服务使用文档

这是一个基于 Express 和 Prisma 的简单 Node.js 后端服务，用于管理用户数据。它使用 MySQL 作为数据库。

## 🛠️ 技术栈

- Node.js: JavaScript 运行时
- Express: Web 应用框架
- TypeScript: JavaScript 的超集，提供类型安全
- Prisma: 数据库 ORM (对象关系映射器)
- MySQL: 关系型数据库
- Docker: 容器化平台，用于运行 MySQL

## 🚀 快速开始

### 1. 克隆项目并安装依赖

```
git clone <your-repo-url>
cd simple-node-backend
npm install
```

### 2. 启动 MySQL 数据库

使用 Docker 启动一个 MySQL 实例：

```
docker run -d \
  --name my-mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=node_api \
  -e MYSQL_USER=app_user \
  -e MYSQL_PASSWORD=app_password \
  mysql:8.0
```

### 3. 配置环境变量

创建一个 .env 文件，并填入以下内容：

```
PORT=3000
NODE_ENV=development
DATABASE_URL="mysql://app_user:app_password@localhost:3306/node_api"
```

### 4. 初始化数据库

使用 Prisma 将您的数据模型同步到数据库：

npx prisma db push

这会根据 prisma/schema.prisma 中的定义在 MySQL 中创建表。

### 5. 生成 Prisma Client

npx prisma generate

### 6. 启动应用

npm start

## 🔧 开发与维护

### 查看数据库内容

#### 方法 1: 使用 Prisma Studio

npx prisma studio

然后在浏览器中访问 http://localhost:5555。

#### 方法 2: 进入 MySQL 容器

```bash
docker exec -it my-mysql mysql -u app_user -p node_api
```

输入密码 app_password，然后执行：

```
SELECT * FROM User;
```

### 重新初始化数据库

如果您想清除所有数据并从头开始：

删除并重新创建容器：

```
docker rm my-mysql
docker run -d [之前的 docker run 命令]
```

重新运行 npx prisma db push 和 npx prisma generate
