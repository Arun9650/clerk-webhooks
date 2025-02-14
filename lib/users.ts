import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createUser(data: User) {
  console.log("🚀 ~ createUser ~ data:", data)
  try {
    const user = await prisma.user.create({ data })
    console.log("🚀 ~ createUser ~ user:", user)
    return { user }
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error)
    return { error }
  }
}

export async function getUserById({
  id,
  clerkUserId
}: {
  id?: string
  clerkUserId?: string
}) {
  try {
    if (!id && !clerkUserId) {
      throw new Error('id or clerkUserId is required')
    }

    const query = id ? { id } : { clerkUserId }

    const user = await prisma.user.findUnique({ where: id ? { id: Number(id) } : { clerkUserId } })
    return { user }
  } catch (error) {
    return { error }
  }
}

export async function UpdateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data
    })
    return { user }
  } catch (error) {
    return { error }
  }
}
