// src/index.ts
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import userRoutes from "./routes/user.routes" // 👈 引入用户路由

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 使用中间件
app.use(cors())
app.use(express.json())

// 挂载路由
app.use("/api/users", userRoutes) // 👈 所有以 /api/users 开头的请求都交给 userRoutes 处理

// 根路径
app.get("/", (req, res) => {
  res.json({
    message: "Hello from backend! 👋",
    status: "success",
    timestamp: new Date().toISOString(),
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器已启动！`)
  console.log(`🔗 访问 http://localhost:${PORT}`)
})
