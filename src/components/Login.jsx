import { Container, Form, Label, Input, Button } from './globals.styled'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async e => {
    e.preventDefault()
    console.log('username', username)
    console.log('admin', isAdmin)
    try {
      const res = await fetch('/api/get-users')
      if (res.status === 200) {
        const { users } = await res.json()
        const user = users.find(u => u.username === username)

        if (!user) {
          setError('Invalid username')
        } else if (!user.is_admin) {
          setError('You are not an admin')
          router.push({
            pathname: '/dashboard',
            query: { username: user.username, isAdmin: user.is_admin }
          })
        } else {
          setIsAdmin(true)
          router.push({
            pathname: '/dashboard',
            query: { username: user.username, isAdmin: user.is_admin }
          })
        }
      } else {
        const { message } = await res.json()
        setError(message)
      }
    } catch (error) {
      setError('An error occurred')
    } finally {
      setUsername('')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Label htmlFor='username'>Username:</Label>
        <Input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        <Button type='submit'>Log in</Button>
        {error && <p>{error}</p>}
        {isAdmin && <p>Admin</p>}
      </Form>
    </Container>
  )
}
