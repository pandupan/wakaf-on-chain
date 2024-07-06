import { Suspense } from "react"
import LoginForm from "./_components/login-form"

function LoginPage() {
  return (
    <div className="bg-secondary min-h-screen flex justify-center items-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}

export default LoginPage