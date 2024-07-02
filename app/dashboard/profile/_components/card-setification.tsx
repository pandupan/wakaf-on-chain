import { Button } from '@/components/ui/button'
import { FaDownload } from 'react-icons/fa'

const CardSertification = () => {
  
  const certificateHistory = [
    { date: '1 Juli 2024', title: 'Wakaf Pendidikan', category: 'Pendidikan', amount: 'Rp 5,000,000' },
    { date: '15 Juni 2024', title: 'Wakaf Kesehatan', category: 'Kesehatan', amount: 'Rp 3,000,000' },
    { date: '10 Juni 2024', title: 'Wakaf Sosial', category: 'Sosial', amount: 'Rp 2,000,000' },
    { date: '5 Mei 2024', title: 'Wakaf Ekonomi', category: 'Ekonomi', amount: 'Rp 1,500,000' },
  ];

  return (
    <div className="flex flex-col w-full lg:w-2/3 p-4">
      <h2 className="text-blue-500 text-lg font-bold mb-4">Pratinjau Sertifikat Wakaf</h2>

      <div className="mt-4">
        <div className="border border-gray-300 p-4 rounded">
          <h2 className="text-lg font-bold">Sertifikat Wakaf</h2>
          <p className="mt-2">Judul Wakaf: Wakaf Pendidikan</p>
          <p className="mt-2">Tanggal: 1 Juli 2024</p>
          <Button size="sm" variant="primary" className="mt-4" onClick={() => alert('Preview or Download PDF')}>
            Preview / Download PDF
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4 text-blue-500">History Sertifikat</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
            <thead className="bg-gradient-to-r from-secondary to-indigo-500 text-white">
              <tr>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base rounded-l-lg">Tanggal</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base">Judul Kampanye</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base">Kategori</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-center text-xs sm:text-base rounded-r-lg">Download</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {certificateHistory.map((cert, index) => (
                <tr
                  key={index}
                  className={`transform transition duration-500 hover:scale-[1.02] ${index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"} rounded-lg`}
                >
                  <td className="py-2 sm:py-3 px-2 sm:px-4 rounded-l-lg text-xs sm:text-base">
                    {cert.date}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base">
                    {cert.title}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base">
                    {cert.category}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 rounded-r-lg text-center text-xs sm:text-base flex justify-center items-center">
                    <FaDownload className="text-blue-500 cursor-pointer" onClick={() => alert(`Download ${cert.title}`)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CardSertification
