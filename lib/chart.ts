import { ApexOptions } from "apexcharts";
import { numberPrefixer, formatRupiah } from "./utils";

export const chartOptions: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE", "#FF5733"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  tooltip: {
    y: {
      formatter: (value) => formatRupiah(value),
    },
  },
  stroke: {
    width: [2, 2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (value) => numberPrefixer(Number(value)),
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE", "#FF5733"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true
    }
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    labels: {
      formatter: (value) => numberPrefixer(Number(value)),
    }
  },
  responsive: [
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 500,
      options: {
        xaxis: {
          labels: {
            show: false,
          },
        },
      }
    }
  ],
};