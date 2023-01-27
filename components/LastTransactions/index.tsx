import { NameRegisteredQueryDocument } from "../../.graphclient";
import { ethers } from "ethers";
import { useQuery } from "urql";
import { useEffect, useState } from "react";
import Link from "next/link";
import TableContainer from "../Table";

export default function LastTransactions() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [result, reexecuteQuery] = useQuery({
    query: NameRegisteredQueryDocument,
  });

  useEffect(() => {
    if (!result.fetching) {
      setIsLoading(false);
    }
  }, [result]);

  return (
    <TableContainer>
      <button onClick={reexecuteQuery}>Update data</button>
      Count: <span>{result?.data?.nameRegistereds.length}</span>
      {!isLoading ? (
        <table>
          <tr>
            <th>ENS</th>
            <th>Adquired by</th>
            <th>Cost</th>
          </tr>
          {result?.data?.nameRegistereds?.map((ens, key) => {
            return (
              <tr key={key}>
                <td>
                  <Link href={ens.name}>{ens.name}.eth</Link>
                </td>
                <td>
                  <a
                    target="_blank"
                    href={`https://etherscan.io/address/${ens.owner}`}
                  >
                    {ens.owner}
                  </a>
                </td>
                <td>{`${ethers.utils.formatEther(ens.cost)} ETH`}</td>
              </tr>
            );
          })}
        </table>
      ) : (
        <p>Loading</p>
      )}
    </TableContainer>
  );
}
