// src/services/user.service.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class UserService {
  /**
   * 获取所有用户
   */
  async getAllUsers() {
    return await prisma.user.findMany()
  }

  /**
   * 根据 ID 获取单个用户
   */
  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  /**
   * 创建新用户
   */
  async createUser(data: { name: string; email: string }) {
    return await prisma.user.create({
      data,
    })
  }
}

// 导出一个实例
export const userService = new UserService()
