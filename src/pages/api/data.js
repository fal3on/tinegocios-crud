import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  try {
    const data = await prisma.datos.findMany({})
    const formattedData = data.map(item => {
      return {
        ...item,
        company_image: item.company_image ? Buffer.from(item.company_image).toString('base64') : null,
        created_at: item.created_at ? item.created_at.toISOString() : null,
        updated_at: item.updated_at ? item.updated_at.toISOString() : null
      }
    })
    console.log(formattedData)
    // res.status(200).json({ data: formattedData })
    res.status(200).json(formattedData)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  } finally {
    await prisma.$disconnect()
  }
}
