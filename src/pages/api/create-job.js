import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  try {
    if (req.method === 'POST') {
      const {
        titulo,
        descripcion,
        created_at,
        updated_at,
        company_name,
        company_image,
        company_email,
        job_type,
        is_active,
        tags,
        observaciones
      } = req.body

      const newData = await prisma.datos.create({
        data: {
          titulo,
          descripcion,
          created_at,
          updated_at,
          company_name,
          company_image: company_image ? Buffer.from(company_image, 'base64') : null,
          company_email,
          job_type,
          is_active,
          tags,
          observaciones
        }
      })

      res.status(201).json(newData)
    } else {
      res.status(405).json({ message: 'Method Not Allowed' })
    }
  } catch (err) {
    console.error(err)
    console.log(err.message)
    res.status(500).json({ message: 'Something went wrong' })
  } finally {
    await prisma.$disconnect()
  }
}
