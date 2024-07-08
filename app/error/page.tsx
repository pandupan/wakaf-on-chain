import ErrorLayout from '@/components/error-layout'

function ErrorPage() {
  return (
    <ErrorLayout
      title="Ohh Tidak... 500"
      description="Maaf, terjadi error di server. Hubungi kami untuk mengatasinya!"
    />
  )
}

export default ErrorPage