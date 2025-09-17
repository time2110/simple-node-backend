// src/controllers/user.controller.ts
import { Request, Response } from "express"
import { userService } from "../services/user.service"

/**
 * 获取所有用户
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers()
    res.json({
      success: true,
      users,
      message: "获取用户列表成功",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    })
  }
}

/**
 * 获取单个用户
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id)
    const user = await userService.getUserById(userId)

    if (user) {
      res.json({
        success: true,
        user,
        message: "获取用户信息成功",
      })
    } else {
      res.status(404).json({
        success: false,
        message: `未找到 ID 为 ${userId} 的用户`,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    })
  }
}

/**
 * 创建用户
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "姓名和邮箱是必需的",
      })
    }

    const user = await userService.createUser({ name, email })
    res.status(201).json({
      success: true,
      user,
      message: "用户创建成功！",
    })
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({
        success: false,
        message: "该邮箱已被注册",
      })
    } else {
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      })
    }
  }
}
