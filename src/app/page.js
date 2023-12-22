import SimpleForm from "./form";

export default function Home() {
  return (
    <main className="flex md:min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 lg:p-32">
      <div className="max-w-2xl w-full mx-auto bg-gray-800 font-mono rounded-xl shadow-lg p-6 md:p-8 dark:bg-zinc-800">
        <div className="flex flex-col items-center justify-center space-y-4">
          <SimpleForm />
        </div>
      </div>
      <div className="mt-8 text-center bg-gray-900 text-gray-300 text-xs rounded-md shadow-lg p-2">
        Dibangunkan oleh <a href="https://twitter.com/haziqhapiz" target="_blank" rel="noopener noreferrer" className="underline">Haziq Hapiz</a>
      </div>
    </main>
  );
}
