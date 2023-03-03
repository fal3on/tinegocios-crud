import { DashboardContainer } from './globals.styled'
import { useRouter } from 'next/router'

export default function DashboardHeader({ userName }) {
  const router = useRouter()

  function handleLogout() {
    router.push('/')
  }

  return (
    <DashboardContainer>
      <p>
        <span
          onClick={handleLogout}
          style={{ fontWeight: 'bolder', textTransform: 'capitalize', cursor: 'pointer', color: 'red' }}
        >
          Salir {''}
        </span>
        Bienvenido <span style={{ fontWeight: 'bolder', textTransform: 'capitalize' }}>{userName}</span>
      </p>
      {userName === 'admin' && <h1>Dashboard</h1>}
    </DashboardContainer>
  )
}
