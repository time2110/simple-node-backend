import cors from "cors"
import dotenv from "dotenv"
import express from "express" // 👈 只导入 express 函数
// 👇 导入 Prisma Client
import { PrismaClient } from "@prisma/client"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// 👇 创建 Prisma Client 实例
const prisma = new PrismaClient()

// GET /api/users - 获取所有用户
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json({
      success: true,
      users,
      message: "获取用户列表成功",
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
})

// POST /api/users - 创建新用户
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "姓名和邮箱是必需的" })
    }

    const user = await prisma.user.create({
      data: { name, email },
    })

    res.status(201).json({
      success: true,
      user,
      message: "用户创建成功！",
    })
  } catch (error: any) {
    if (error.code === "P2002") {
      // 唯一约束冲突
      res.status(400).json({ success: false, message: "该邮箱已被注册" })
    } else {
      res.status(500).json({ success: false, error: "Internal Server Error" })
    }
  }
})

// 启动服务器
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 服务器已启动！`)
  console.log(`🔗 访问 http://localhost:${PORT}`)
})
