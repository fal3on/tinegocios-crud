import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Wrapper, DashboardContainer, Button } from './globals.styled'
import DashboardHeader from './DashboardHeader'
import CreateForm from './CreateForm'
import UserCard from './UserCard'

export default function Dashboard() {
  const router = useRouter()
  const { username, isAdmin } = router.query
  const [jobsData, setJobsData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reload, setReload] = useState(false)

  function handleReload() {
    setReload(!reload)
  }

  function handleOpen() {
    setIsModalOpen(!isModalOpen)
  }

  function handleClose() {
    setIsModalOpen(false)
  }

  function handleEditOpen(data) {
    setEditData(data)
    setIsEdit(true)
  }

  function handleEditClose() {
    setIsEdit(false)
  }

  // user check
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && !username) {
  //     router.push('/')
  //   }
  // }, [])

  // get data
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('api/data')
      const data = await response.json()
      setJobsData(data)
    }
    getData()
  }, [])

  // Time to reload check
  useEffect(() => {
    console.log('Time to reload?', reload)

    const getData = async () => {
      const response = await fetch('api/data')
      const data = await response.json()
      setJobsData(data)
    }
    getData()
    setReload(false)
  }, [reload])

  // delete data
  const handleDelete = async id => {
    try {
      const res = await fetch(`/api/delete-job?id=${id}`, { method: 'DELETE' })
      if (res.status === 204) {
        setJobsData(jobsData.filter(item => item.id !== id))
      } else {
        console.error(res.statusText)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container>
        <Wrapper>
          <DashboardHeader userName={username} />
          {username === 'admin' ? (
            <DashboardContainer style={{ marginTop: '2rem' }}>
              <Button onClick={handleOpen} style={{ background: 'green' }}>
                Crear
              </Button>
            </DashboardContainer>
          ) : null}

          <DashboardContainer style={{ marginTop: '2rem' }}>
            <Wrapper>
              <h2>Lista de trabajos</h2>
              <div
                className=''
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  margin: '2rem auto',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* {jobsData?.map(job => (
                  <UserCard
                    key={job.id}
                    job={job}
                    handleDelete={handleDelete}
                    username={username}
                    onClick={() => handleEditOpen(job)}
                  />
                ))} */}
                {jobsData.length > 0 ? (
                  jobsData?.map(job => (
                    <UserCard
                      key={job.id}
                      job={job}
                      handleDelete={handleDelete}
                      username={username}
                      onClick={() => handleEditOpen(job)}
                    />
                  ))
                ) : (
                  <h4>No hay trabajos disponibles 🥲</h4>
                )}
              </div>
            </Wrapper>
          </DashboardContainer>
        </Wrapper>
      </Container>
      {/* modals area */}
      {isModalOpen && <CreateForm isModalOpen={isModalOpen} handleClose={handleClose} handleReload={handleReload} />}
      {isEdit && (
        <CreateForm
          isModalOpen={handleEditOpen}
          handleClose={handleEditClose}
          data={editData}
          isEdit
          handleReload={handleReload}
        />
      )}
    </>
  )
}
