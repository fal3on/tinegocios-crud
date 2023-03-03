import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.query

  try {
    await prisma.datos.delete({
      where: { id: Number(id) }
    })
    return res.status(204).end()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
