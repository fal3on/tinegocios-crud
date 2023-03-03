import { useState } from 'react'
import { useRouter } from 'next/router'
import { ModalRoot, Form, Label, Input, Select, Option, Button } from './globals.styled'

const createdAt = new Date().toISOString().split('T')[0]
const updatedAt = new Date().toISOString()

export default function CreateForm({ data, isEdit, isOpen, handleClose, handleReload }) {
  const router = useRouter()

  const createdAtFormated = data?.created_at ? new Date(data.created_at).toISOString().split('T')[0] : createdAt
  const updatedAtFormated = updatedAt

  const [formData, setFormData] = useState({
    titulo: data?.titulo || '',
    descripcion: data?.descripcion || '',
    created_at: createdAtFormated,
    updated_at: updatedAtFormated,
    company_name: data?.company_name || '',
    company_image: data?.company_image || '',
    company_email: data?.company_email || '',
    job_type: data?.job_type || '',
    is_active: data?.is_active,
    // tags: data?.tags || []
    tags: data?.tags ? data?.tags.join(', ') : '',
    observaciones: data?.observaciones || ''
  })

  console.log('data from CreateForm', data)
  console.log('formData', formData)

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setFormData({
          ...formData,
          company_image: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(formData)

    const formDataToSend = {
      ...formData,
      company_image: formData.company_image ? formData.company_image.split(',')[1] : null,
      created_at: formData.created_at ? new Date(formData.created_at).toISOString() : null,
      updated_at: formData.updated_at ? new Date(formData.updated_at).toISOString() : null,
      tags: formData.tags
        ? formData.tags
            .split(/[, ]+/)
            .filter(tag => tag.trim() !== '')
            .map(tag => tag.trim())
        : null
    }

    console.log('formDataToSend', formDataToSend)

    const res = await fetch('/api/create-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataToSend)
    })

    if (res.ok) {
      const data = await res.json()
      // Handle success
      handleClose()
      handleReload()
      router.push({
        pathname: '/dashboard',
        query: { username: 'admin', isAdmin: true }
      })
    } else {
      console.error('Something went wrong')
    }
  }

  // update data
  async function handleUpdate(e) {
    e.preventDefault()

    const formDataToUpdate = {
      ...formData,
      updated_at: formData.updated_at ? new Date(formData.updated_at).toISOString() : null,
      created_at: formData.created_at ? new Date(formData.created_at).toISOString() : null,
      company_image: formData.company_image?.split(',')[1],
      tags: formData.tags
        ? formData.tags
            .split(/[, ]+/)
            .filter(tag => tag.trim() !== '')
            .map(tag => tag.trim())
        : null
    }

    console.log('formDataToUpdate', formDataToUpdate)

    const res = await fetch(`/api/update-job?id=${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(formDataToUpdate),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
      handleClose()
      handleReload()
      router.push({
        pathname: '/dashboard',
        query: { username: 'admin', isAdmin: true }
      })
    }
  }

  return (
    <ModalRoot isOpen={isOpen}>
      <Form onSubmit={handleSubmit}>
        <div
          className='header'
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}
        >
          {/* {isEdit ? (
            <span
              style={{
                cursor: 'pointer',
                color: 'black',
                textAlign: 'left',
                fontWeight: 'bolder',
                textTransform: 'uppercase',
                width: '100%'
              }}
              onClick={() => router.push('/dashboard')}
            >
              Regresar
            </span>
          ) : (
            <span
              style={{
                cursor: 'pointer',
                color: 'black',
                textAlign: 'right',
                fontWeight: 'bolder',
                textTransform: 'uppercase',
                width: '100%'
              }}
              onClick={handleClose}
            >
              Cerrar
            </span>
          )} */}
          <span
            style={{
              cursor: 'pointer',
              color: 'black',
              textAlign: 'right',
              fontWeight: 'bolder',
              textTransform: 'uppercase',
              width: '100%'
            }}
            onClick={handleClose}
          >
            Cerrar
          </span>
        </div>

        <Label htmlFor='titulo'>
          Titulo
          <Input type='text' name='titulo' id='titulo' value={formData.titulo} onChange={handleInputChange} required />
        </Label>
        <Label htmlFor='descripcion'>
          Descripcion
          <Input
            type='text'
            name='descripcion'
            id='descripcion'
            value={formData.descripcion}
            onChange={handleInputChange}
          />
        </Label>
        <Label htmlFor='company_name'>
          Nombre de la empresa
          <Input
            type='text'
            name='company_name'
            id='company_name'
            value={formData.company_name}
            onChange={handleInputChange}
          />
        </Label>
        <Label htmlFor='company_image'>
          Imagen de la empresa
          <Input
            type='file'
            name='company_image'
            id='company_image'
            accept='image/*'
            onChange={handleFileChange}
            required
          />
        </Label>
        <Label htmlFor='company_email'>
          Email de la empresa
          <Input
            type='email'
            name='company_email'
            id='company_email'
            value={formData.company_email}
            onChange={handleInputChange}
          />
        </Label>
        <Label htmlFor='job_type'>
          Tipo de trabajo
          <Select name='job_type' id='job_type' value={formData.job_type} onChange={handleInputChange} required>
            <Option value=''>Selecciona una opcion</Option>
            <Option value='FULL_TIME'>Full-time</Option>
            <Option value='FREELANCE'>Freelance</Option>
            <Option value='TEMPORARY'>Temporary</Option>
            <Option value='CONTRACT'>Contract</Option>
          </Select>
        </Label>
        {isEdit && (
          <Label htmlFor='is_active'>
            Activo
            <Input
              type='checkbox'
              name='is_active'
              id='is_active'
              checked={formData.is_active}
              onChange={handleInputChange}
            />
          </Label>
        )}
        <Label htmlFor='tags'>
          Tags
          <Input type='text' name='tags' id='tags' value={formData.tags} onChange={handleInputChange} required />
        </Label>
        <Label htmlFor='observaciones'>
          Observaciones
          <Input
            type='text'
            name='observaciones'
            id='observaciones'
            value={formData.observaciones}
            onChange={handleInputChange}
          />
        </Label>

        {isEdit ? (
          <Button type='button' onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button type='submit'>Submit</Button>
        )}
      </Form>
    </ModalRoot>
  )
}
