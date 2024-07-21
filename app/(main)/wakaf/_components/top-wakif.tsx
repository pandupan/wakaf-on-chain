import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/core/table'
import { getTopWakif } from '@/data/wakif';
import { abbreviateName, anonymizeName, cn, formatRupiah } from '@/lib/utils'
import { FaCrown, FaMedal } from 'react-icons/fa'

const TopWakifGrid = async () => {
  const data = await getTopWakif();

  if (data.rank.length === 0) return null;

  return (
    <div className="p-4 sm:container mx-auto space-y-4 sm:space-y-8">
      <h1 className="sm:text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
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
          {data.rank.map((wakif, index) => (
            <TableRow
              key={wakif.id}
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
              <TableCell>
                {anonymizeName(abbreviateName(wakif?.name || 'Anonim', 2))}
              </TableCell>
              <TableCell align="right" className="rounded-r-lg">
                {formatRupiah(wakif.berwakafTotal)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopWakifGrid;
