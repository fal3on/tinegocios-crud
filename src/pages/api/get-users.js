import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const users = await prisma.users.findMany()

    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred' })
  }
}
