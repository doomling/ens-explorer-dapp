import { ENSTransfersPerDayDocument } from "../../.graphclient";
import { useQuery } from "urql";
import { useEffect, useState } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DailyTransferType {
  id: string;
  count: number;
  timestamp: string;
}
export default function TxGraph() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderedData, setOrderedData] = useState<
    DailyTransferType[] | undefined
  >();

  const [result, reexecuteQuery] = useQuery({
    query: ENSTransfersPerDayDocument,
  });

  useEffect(() => {
    if (!result.fetching) {
      setIsLoading(false);
      setOrderedData(result.data?.dailyTransfers.reverse());
    }
  }, [result]);

  console.log(result.data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels: orderedData?.map((item) => {
      return item.id;
    }),
    datasets: [
      {
        label: "ENS Daily transactions",
        data: orderedData?.map((item) => {
          return item.count;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>{!isLoading ? <Line options={options} data={data} /> : "loading"}</div>
  );
}
