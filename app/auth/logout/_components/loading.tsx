import { VscLoading } from 'react-icons/vsc';

function Loading() {
  return (
    <div className="w-[90%] sm:w-full max-w-md p-8 sm:p-10 rounded-lg bg-secondary-foreground space-y-6 shadow-lg">
      <VscLoading className="text-3xl animate-spin mx-auto" />
      <h1 className="text-center animate-pulse">
        Sedang logout... Tunggu sebentar
      </h1>
    </div>
  )
}

export default Loading