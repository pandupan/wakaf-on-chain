import { FaUser } from "react-icons/fa"

const WakifList = () => {
  const donations = [
    { name: "Anonim", amount: "Rp20.000", time: "Baru saja" },
    { name: "Ega Aprianto", amount: "Rp50.000", time: "3 hari yang lalu" },
    { name: "Pandu Pangestu", amount: "Rp100.000", time: "2 hari yang lalu" },
  ];

  return (
    <div className="bg-background rounded-md shadow-sm p-4 space-y-4 sticky top-0">
      <div className="flex gap-2 items-center">
        <h2 className="text-lg sm:text-xl font-bold">
          Wakif
        </h2>
        <span className="inline-block rounded-full bg-secondary text-white px-3 py-[2px] text-sm">
          89
        </span>
      </div>
      <div className="space-y-4">
        {donations.map((donation, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gray-50 border px-4 py-3 rounded-lg shadow-sm"
          >
            <div className="w-10 sm:w-12 aspect-square rounded-full flex items-center justify-center bg-gray-100 border">
              <FaUser className="text-gray-700" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold">{donation.name}</h3>
              <h5 className="text-gray-600 text-sm sm:text-base font-semibold text-secondary tracking-wide">
                {donation.amount}
              </h5>
              <span className="block text-gray-400 text-xs sm:text-sm">{donation.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WakifList;
