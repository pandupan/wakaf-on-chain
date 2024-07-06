import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/core/table'
import { FaCrown, FaMedal } from 'react-icons/fa'
import { abbreviateName, cn } from '@/lib/utils'

const wakifList = [
  { name: 'Ahmad Abdullah', totalAmount: '1jt', donationFrequency: 2, largestDonation: '5jt' },
  { name: 'Fatimah Ibrahim', totalAmount: '5jt', donationFrequency: 1, largestDonation: '5jt' },
  { name: 'Yusuf Ali', totalAmount: '2jt', donationFrequency: 3, largestDonation: '1jt' },
  { name: 'Aisha Rahman', totalAmount: '750rb', donationFrequency: 1, largestDonation: '750rb' },
  { name: 'Khalid Hassan', totalAmount: '1.5jt', donationFrequency: 2, largestDonation: '1jt' },
  { name: 'Noura Saleh', totalAmount: '1.25jt', donationFrequency: 2, largestDonation: '750rb' },
  { name: 'Kareem Mustafa', totalAmount: '1.75jt', donationFrequency: 2, largestDonation: '1jt' },
  { name: 'Layla Bakr', totalAmount: '3jt', donationFrequency: 1, largestDonation: '3jt' },
  { name: 'Omar Khattab', totalAmount: '1.1jt', donationFrequency: 1, largestDonation: '1.1jt' },
  { name: 'Salma Ahmad', totalAmount: '800rb', donationFrequency: 1, largestDonation: '800rb' },
];

const sortedWakifList = wakifList.sort((a, b) => b.donationFrequency - a.donationFrequency);

const LeaderboardWakif = () => {
  return (
    <Table>
      <TableHead>
        <TableHeadCol className="rounded-l-lg">Top</TableHeadCol>
        <TableHeadCol>Nama</TableHeadCol>
        <TableHeadCol align="right">Total</TableHeadCol>
        <TableHeadCol align="right">Wakaf Terbesar</TableHeadCol>
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
            <TableCell align="right">{wakif.donationFrequency}x</TableCell>
            <TableCell align="right">{wakif.largestDonation}</TableCell>
            <TableCell align="right" className="rounded-r-lg">{wakif.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardWakif;
