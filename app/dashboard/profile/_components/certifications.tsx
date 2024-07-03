import { formatRupiah } from '@/lib/utils';
import { FaDownload } from 'react-icons/fa'

const Certifications = () => {
  const data = [
    { date: '1 Juli 2024', title: 'Wakaf Pendidikan', category: 'Pendidikan', amount: 5000000 },
    { date: '15 Juni 2024', title: 'Wakaf Kesehatan', category: 'Kesehatan', amount: 3000000 },
    { date: '10 Juni 2024', title: 'Wakaf Sosial', category: 'Sosial', amount: 2000000 },
    { date: '5 Mei 2024', title: 'Wakaf Ekonomi', category: 'Ekonomi', amount: 1500000 },
  ];

  return (
    <div className="bg-background p-4 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Sertifikat</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
          <thead className="bg-gradient-to-r from-secondary to-indigo-500 text-white">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm rounded-l-lg">Tanggal</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">Judul Kampanye</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">Wakaf</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-center text-xs sm:text-sm rounded-r-lg">Download</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((cert, index) => (
              <tr
                key={index}
                className={`transition duration-500 ${index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}`}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4 rounded-l-lg text-xs sm:text-sm">
                  {cert.date}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                  {cert.title}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                  {formatRupiah(cert.amount)}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 rounded-r-lg text-center text-xs sm:text-sm">
                  <button className="text-blue-500">
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Certifications
