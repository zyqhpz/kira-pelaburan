import SimpleForm from './form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8 space-y-4 bg-gray-800 rounded-xl shadow-lg dark:bg-zinc-800">
          <SimpleForm />
        </div>
      </div>
    </main>
  )
}
