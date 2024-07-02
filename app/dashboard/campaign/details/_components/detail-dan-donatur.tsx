import React from "react";
import Link from "next/link";

const DetailDescription = () => {
  const donations = [
    { name: "Orang Baik", amount: "Rp20.000", time: "Baru saja" },
    { name: "Orang Baik", amount: "Rp50.000", time: "3 hari yang lalu" },
    { name: "Orang Baik", amount: "Rp100.000", time: "2 hari yang lalu" },
    { name: "Orang Baik", amount: "Rp20.000", time: "7 jam yang lalu" },
    { name: "Orang Baik", amount: "Rp200.000", time: "5 hari yang lalu" },
    { name: "Orang Baik", amount: "Rp70.000", time: "4 hari yang lalu" },
  ];

  // Slice to get only the first 3 donations
  const displayDonations = donations.slice(0, 3);

  return (
    <div>
      <div className="space-y-4 mt-4">
        {/* Detail Deskripsi */}
        <div className="bg-background rounded-md shadow-sm p-4 space-y-4 relative max-h-72 overflow-hidden">
          <div className="relative">
            <Link href="/dashboard/campaign/details/deskripsi">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Detail</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </Link>
            <div className="rounded-lg shadow-sm relative">
              <p className="line-clamp-6 text-sm leading-relaxed text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                eius praesentium atque modi consequatur dolor quod. Tenetur
                numquam doloremque officiis minus, ex recusandae inventore esse,
                autem obcaecati atque rem quia? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Impedit deserunt itaque quod ad
                dolorem facilis, nisi dolor temporibus nesciunt, commodi aliquid
                culpa nulla. Mollitia dolor suscipit quidem cum laborum!
                Cupiditate. Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Commodi omnis sint error dolore veniam harum, quibusdam
                consequuntur, aut repellendus ut consequatur laborum voluptate
                assumenda culpa. Debitis vitae est vel natus! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Vero eius praesentium
                atque modi consequatur dolor quod. Tenetur numquam doloremque
                officiis minus, ex recusandae inventore esse, autem obcaecati
                atque rem quia? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Impedit deserunt itaque quod ad dolorem
                facilis, nisi dolor temporibus nesciunt, commodi aliquid culpa
                nulla. Mollitia dolor suscipit quidem cum laborum! Cupiditate.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi omnis sint error dolore veniam harum, quibusdam
                consequuntur, aut repellendus ut consequatur laborum voluptate
                assumenda culpa. Debitis vitae est vel natus! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Vero eius praesentium
                atque modi consequatur dolor quod. Tenetur numquam doloremque
                officiis minus, ex recusandae inventore esse, autem obcaecati
                atque rem quia? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Impedit deserunt itaque quod ad dolorem
                facilis, nisi dolor temporibus nesciunt, commodi aliquid culpa
                nulla. Mollitia dolor suscipit quidem cum laborum! Cupiditate.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi omnis sint error dolore veniam harum, quibusdam
                consequuntur, aut repellendus ut consequatur laborum voluptate
                assumenda culpa. Debitis vitae est vel natus!
              </p>
              <div className="relative h-6 overflow-hidden rounded-md flex items-center justify-center my-2">
                <img
                  src="https://fastly.picsum.photos/id/83/1600/900.jpg?hmac=R9BQdLAPaGw27suOHRBe6G6xb7m1XzQlbsx7as1N7-s"
                  alt="Description Image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <Link href="/dashboard/campaign/details/deskripsi">
              <span className="text-blue-600 text-sm ">
                Baca selengkapnya
              </span>
            </Link>
          </div>
        </div>
        {/* Donatur */}
        <div className="bg-background rounded-md shadow-sm p-4 space-y-4">
          <Link href="/dashboard/campaign/details/donatur">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Donatur
                <span className="ml-2 rounded-full bg-secondary text-white px-3 py-[2px] text-sm">
                  89
                </span>
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </Link>
          <div className="space-y-4">
            {displayDonations.map((donation, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0">
                  <svg
                    className="w-full h-full text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="text-lg font-semibold">{donation.name}</div>
                  <div className="text-gray-600">
                    Berdonasi sebesar{" "}
                    <span className="font-bold">{donation.amount}</span>
                  </div>
                  <div className="text-gray-400 text-sm">{donation.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDescription;
