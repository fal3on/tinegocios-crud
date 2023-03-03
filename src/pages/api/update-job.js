import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query
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

  console.log('req.body', req.body)

  try {
    const data = {
      titulo,
      descripcion,
      created_at,
      updated_at,
      company_name,
      company_email,
      job_type,
      is_active,
      tags,
      observaciones
    }

    if (company_image) {
      data.company_image = Buffer.from(company_image, 'base64')
    }

    const updatedUser = await prisma.datos.update({
      where: { id: Number(id) },
      data
    })

    res.status(200).json(updatedUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  } finally {
    await prisma.$disconnect()
  }
}

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default async function handler(req, res) {
//   const { id } = req.query
//   const {
//     titulo,
//     descripcion,
//     created_at,
//     updated_at,
//     company_name,
//     company_image,
//     company_email,
//     job_type,
//     is_active,
//     tags
//   } = req.body

//   console.log('req.body', req.body)

//   try {
//     const updatedUser = await prisma.datos.update({
//       where: { id: Number(id) },
//       data: {
//         titulo,
//         descripcion,
//         created_at,
//         updated_at,
//         company_name,
//         // company_image,
//         company_image: company_image ? Buffer.from(company_image, 'base64') : null,
//         company_email,
//         job_type,
//         is_active,
//         tags
//       }
//     })

//     res.status(200).json(updatedUser)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Something went wrong' })
//   } finally {
//     await prisma.$disconnect()
//   }
// }
