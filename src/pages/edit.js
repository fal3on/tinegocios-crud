import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'
import CreateForm from '@/components/CreateForm'

export default function EditPage({ data }) {
  const router = useRouter()

  console.log('data from Edit', data)

  return <CreateForm data={data} isEdit />
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient()

  try {
    const data = await prisma.datos.findUnique({
      where: {
        id: Number(context.query.id)
      },
      select: {
        id: true,
        titulo: true,
        descripcion: true,
        created_at: true,
        updated_at: true,
        company_name: true,
        company_image: true,
        company_email: true,
        job_type: true,
        is_active: true,
        tags: true
      }
    })

    // convert buffer to base64 for image field
    const formattedData = {
      ...data,
      company_image: data.company_image ? Buffer.from(data.company_image).toString('base64') : null,
      created_at: data.created_at ? data.created_at.toISOString() : null,
      updated_at: data.updated_at ? data.updated_at.toISOString() : null
    }
    console.log('formattedData', formattedData)
    return {
      props: {
        data: formattedData
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        data: null
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
