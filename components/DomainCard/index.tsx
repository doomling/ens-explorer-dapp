import style from "./styles.module.css";

type DomainCardProps = {
  ens: string;
};
export default function DomainCard({ ens }: DomainCardProps) {
  return (
    <div className={style.card}>
      <h3>{ens}.eth</h3>
    </div>
  );
}
