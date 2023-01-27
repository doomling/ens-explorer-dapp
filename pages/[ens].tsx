import Container from "@/components/Container";
import DomainCard from "@/components/DomainCard";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { ethers } from "ethers";
import { ENSHistoryDocument } from "../.graphclient";
import TableContainer from "@/components/Table";

type Props = {
  ens: string;
  tokenId: never;
};

export default function ENSDetails({ ens, tokenId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [result, reexecuteQuery] = useQuery({
    query: ENSHistoryDocument,
    variables: {
      tokenId,
    },
  });

  useEffect(() => {
    if (!result.fetching) {
      setIsLoading(false);
    }
  }, [result]);

  return (
    <Container title="Domain details">
      <DomainCard data={{ ens: ens }} />
      <TableContainer>
        <table>
          <tr>
            <th>TO</th>
            <th>FROM</th>
          </tr>
          {result?.data?.transfers?.map((ens, key) => {
            return (
              <tr key={key}>
                <td>{ens.from}</td>
                <td>{ens.to}</td>
              </tr>
            );
          })}
        </table>
      </TableContainer>
    </Container>
  );
}

export async function getServerSideProps({ query }) {
  const { ens } = query;
  const nameInBytes = ethers.utils.toUtf8Bytes(ens);
  const labelInBytes = ethers.utils.keccak256(nameInBytes);
  const tokenId = BigInt(labelInBytes);

  return { props: { ens, tokenId: tokenId.toString() } };
}
