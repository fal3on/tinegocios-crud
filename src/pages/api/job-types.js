import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const jobTypes = await prisma.datos.findMany({
    select: {
      job_type: true
    }
  })

  const uniqueJobTypes = [...new Set(jobTypes.map(job => job.job_type))]

  res.status(200).json({ jobTypes: uniqueJobTypes })
}
