import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <div className="bg-background rounded-md shadow-sm p-4 space-y-4 relative">
        <div className="relative">
          <Link href="/dashboard/campaign/details">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>

              <h2 className="text-xl font-semibold">Detail</h2>
            </div>
          </Link>
          <div className="rounded-lg shadow-sm relative">
            <p className="text-sm leading-relaxed text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eius
              praesentium atque modi consequatur dolor quod. Tenetur numquam
              doloremque officiis minus, ex recusandae inventore esse, autem
              obcaecati atque rem quia? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Impedit deserunt itaque quod ad dolorem facilis,
              nisi dolor temporibus nesciunt, commodi aliquid culpa nulla.
              Mollitia dolor suscipit quidem cum laborum! Cupiditate. Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Commodi omnis
              sint error dolore veniam harum, quibusdam consequuntur, aut
              repellendus ut consequatur laborum voluptate assumenda culpa.
              Debitis vitae est vel natus! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Vero eius praesentium atque modi
              consequatur dolor quod. Tenetur numquam doloremque officiis minus,
              ex recusandae inventore esse, autem obcaecati atque rem quia?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              deserunt itaque quod ad dolorem facilis, nisi dolor temporibus
              nesciunt, commodi aliquid culpa nulla. Mollitia dolor suscipit
              quidem cum laborum! Cupiditate. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Commodi omnis sint error dolore
              veniam harum, quibusdam consequuntur, aut repellendus ut
              consequatur laborum voluptate assumenda culpa. Debitis vitae est
              vel natus! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Vero eius praesentium atque modi consequatur dolor quod.
              Tenetur numquam doloremque officiis minus, ex recusandae inventore
              esse, autem obcaecati atque rem quia? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Impedit deserunt itaque quod ad
              dolorem facilis, nisi dolor temporibus nesciunt, commodi sesuatu
              culpa nulla. Mollitia dolor suscipit quidem cum laborum!
              Cupiditate. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Commodi omnis sint error dolore veniam harum, quibusdam
              consequuntur, aut repellendus ut consequatur laborum voluptate
              assumenda culpa. Debitis vitae est vel natus!
            </p>
            <div className="relative overflow-hidden rounded-md flex items-center justify-center my-2">
              <img
                src="https://fastly.picsum.photos/id/83/1600/900.jpg?hmac=R9BQdLAPaGw27suOHRBe6G6xb7m1XzQlbsx7as1N7-s"
                alt="Description Image"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
