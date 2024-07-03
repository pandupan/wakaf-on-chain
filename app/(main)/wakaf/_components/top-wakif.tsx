import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/table'
import { abbreviateName, cn, formatRupiah } from '@/lib/utils'
import { FaCrown, FaMedal } from 'react-icons/fa'

const wakifList = [
  { name: 'Ahmad Abdullah', date: '2024-06-01', amount: 1000000 },
  { name: 'Fatimah Ibrahim', date: '2024-06-02', amount: 500000 },
  { name: 'Yusuf Ali', date: '2024-06-03', amount: 2000000 },
  { name: 'Aisha Rahman', date: '2024-06-04', amount: 750000 },
  { name: 'Khalid Hassan', date: '2024-06-05', amount: 1500000 },
  { name: 'Noura Saleh', date: '2024-06-06', amount: 1250000 },
  { name: 'Kareem Mustafa', date: '2024-06-07', amount: 1750000 },
  { name: 'Layla Bakr', date: '2024-06-08', amount: 3000000 },
  { name: 'Omar Khattab', date: '2024-06-09', amount: 1100000 },
  { name: 'Salma Ahmad', date: '2024-06-10', amount: 800000 },
];

const sortedWakifList = wakifList.sort((a, b) => b.amount - a.amount);

const TopWakifGrid = () => {
  return (
    <div className="p-4 sm:container mx-auto space-y-4 sm:space-y-8">
      <h1 className="text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
        Top 10 Terbaru Wakif
      </h1>
      <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
        Ini dibuat untuk memberikan apresiasi kepada para wakif yang telah berkontribusi dalam periode terbaru.
        Kami menghargai setiap sumbangan yang diberikan dan berharap dapat terus mendorong lebih banyak orang untuk berpartisipasi
        dalam kegiatan wakaf yang berkelanjutan.
      </p>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Top</TableHeadCol>
          <TableHeadCol>Nama</TableHeadCol>
          <TableHeadCol align="right" className="rounded-r-lg">Total Wakaf</TableHeadCol>
        </TableHead>
        <TableBody className="text-gray-700">
          {sortedWakifList.map((wakif, index) => (
            <TableRow
              key={index}
              isEven={index % 2 === 0}
              className={`
              ${index === 0 ?
                  "bg-yellow-100 hover:bg-yellow-200" : index === 1 ?
                    "bg-orange-100 hover:bg-orange-200" : index === 2 ?
                      "bg-gray-200 hover:bg-gray-300" : "bg-gray-50 hover:bg-gray-100"}
            `}
            >
              <TableCell className="rounded-l-lg">
                <div className="flex items-center">
                  {index === 0 ? (
                    <FaCrown className="text-yellow-500 text-xs sm:text-2xl" />
                  ) : (
                    <FaMedal className={cn(
                      'text-xs sm:text-2xl',
                      index === 1 ?
                        "text-orange-500" : index === 2 ?
                          "text-gray-400" : "text-gray-300"
                    )} />
                  )}
                  <span className={cn(
                    'text-xs font-bold ml-2',
                    index === 0 ?
                      'text-yellow-500' : index === 1 ?
                        'text-orange-500' : index === 2 ?
                          'text-gray-500' : ''
                  )}>
                    {`${index + 1}`}
                  </span>
                </div>
              </TableCell>
              <TableCell>{abbreviateName(wakif.name)}</TableCell>
              <TableCell align="right" className="rounded-r-lg">
                {formatRupiah(wakif.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopWakifGrid;
