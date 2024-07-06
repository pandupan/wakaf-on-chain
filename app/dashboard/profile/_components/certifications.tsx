import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/core/table'
import { formatRupiah } from '@/lib/utils'
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
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Tanggal</TableHeadCol>
          <TableHeadCol>Judul Kampanye</TableHeadCol>
          <TableHeadCol>Wakaf</TableHeadCol>
          <TableHeadCol align="center" className="rounded-r-lg">Download</TableHeadCol>
        </TableHead>
        <TableBody className="text-gray-700">
          {data.map((cert, index) => (
            <TableRow key={index} isEven={index % 2 === 0}>
              <TableCell className="rounded-l-lg">{cert.date}</TableCell>
              <TableCell>{cert.title}</TableCell>
              <TableCell>{formatRupiah(cert.amount)}</TableCell>
              <TableCell align="center" className="rounded-r-lg">
                <button className="text-blue-500">
                  <FaDownload />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Certifications
