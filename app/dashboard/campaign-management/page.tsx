import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { FiMoreVertical, FiEdit, FiRefreshCw, FiEye } from "react-icons/fi"; 

const page = () => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Kampanye</TableHeadCol>
          <TableHeadCol>Status</TableHeadCol>
          <TableHeadCol>Target</TableHeadCol>
          <TableHeadCol>Nama Pembuat</TableHeadCol> 
          <TableHeadCol className="rounded-r-lg">Aksi</TableHeadCol>
        </TableHead>
        <TableBody className="text-gray-700">
          <TableRow>
            <TableCell className="rounded-l-lg">
              <div className="flex items-center space-x-4">
                <div className="w-32 aspect-w-16 aspect-h-9">
                  <img
                    src="https://picsum.photos/id/83/1600/900"
                    alt="Campaign"
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <div className="font-bold max-w-xs">
                    Mari berwakaf untuk membantu santri PPM Al Ihsan Tasikmalaya
                  </div>
                  <div className="border border-b my-2" />
                  <div className="flex flex-row justify-between">
                    <div>
                      <h4 className="text-xs">Terkumpul</h4>
                      <span className="block font-bold text-xs text-green-500">
                        Rp9.835.000
                      </span>
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs">Kekurangan</h4>
                      <span className="block font-bold text-xs text-red-500">
                        Rp805.000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {/* <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
                Tercapai
              </span> */}
              <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full">
                Berjalan
              </span>
              {/* <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                Ditutup
              </span> */}
            </TableCell>
            <TableCell>
              Rp12.000.000
            </TableCell>
            <TableCell>
              DEZA ADYTIAR NUR ARIEF
            </TableCell>
            <TableCell className="rounded-r-lg">
              <Popover>
                <PopoverTrigger>
                  <div className="px-3 py-2 border rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">
                    Aksi
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-1">
                    <button className="flex rounded-lg items-center py-2 px-4 text-left w-full hover:bg-gray-100 transition duration-150 ease-in-out">
                      <FiEye className="mr-2" aria-hidden="true" /> Lihat
                    </button>
                    <button className="flex rounded-lg items-center py-2 px-4 text-left w-full hover:bg-gray-100 transition duration-150 ease-in-out">
                      <FiEdit className="mr-2" aria-hidden="true" /> Edit
                    </button>
                    <button className="flex rounded-lg items-center py-2 px-4 text-left w-full hover:bg-gray-100 transition duration-150 ease-in-out">
                      <FiRefreshCw className="mr-2" aria-hidden="true" /> Ubah
                      Status
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
