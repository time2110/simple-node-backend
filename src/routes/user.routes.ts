// src/routes/user.routes.ts
import { Router } from "express"
import {
  createUser,
  getUserById,
  getUsers,
} from "../controllers/user.controller"

const router = Router()

// 定义路由
router.get("/", getUsers) // GET /api/users
router.get("/:id", getUserById) // GET /api/users/:id
router.post("/", createUser) // POST /api/users

export default router
