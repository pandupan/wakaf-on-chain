import { abbreviateName, cn } from '@/lib/utils';
import React from 'react';
import { FaCrown, FaMedal } from 'react-icons/fa';

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
    <div>
      <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
        <thead className="bg-gradient-to-r from-secondary to-indigo-500 text-white">
          <tr>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base rounded-l-lg">Top</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base">Nama</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-base">Total</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-base">Wakaf Terbesar</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-base rounded-r-lg">Total Wakaf</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sortedWakifList.map((wakif, index) => (
            <tr
              key={index}
              className={`transform transition duration-500 hover:scale-[1.02] ${index === 0 ? "bg-yellow-100 hover:bg-yellow-200" : index === 1 ? "bg-gray-200 hover:bg-gray-300" : index === 2 ? "bg-orange-100 hover:bg-orange-200" : "bg-gray-50 hover:bg-gray-100"} rounded-lg`}
            >
              <td className="py-2 sm:py-3 px-2 sm:px-4 rounded-l-lg">
                <div className="flex items-center">
                  {index === 0 ? (
                    <FaCrown className="text-yellow-500 text-xs sm:text-2xl" />
                  ) : (
                    <FaMedal className={index === 1 ? "text-gray-400 text-xs sm:text-2xl" : index === 2 ? "text-orange-500 text-xs sm:text-2xl" : "text-gray-300 text-xs sm:text-2xl"} />
                  )}
                  <span className={cn(
                    'text-xs font-bold ml-2',
                    index === 0 ? 'text-yellow-500' : index === 1
                      ? 'text-gray-400' : index === 2
                        ? 'text-orange-500' : ''
                  )}>
                    {`${index + 1}`}
                  </span>
                </div>
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 sm:text-base text-xs">
                {abbreviateName(wakif.name)}
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-right sm:text-base text-xs">
                {wakif.donationFrequency}x
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-right sm:text-base text-xs">
                {wakif.largestDonation}
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 rounded-r-lg text-right sm:text-base text-xs">
                {wakif.totalAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardWakif;
