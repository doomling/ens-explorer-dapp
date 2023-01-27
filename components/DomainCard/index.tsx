import style from "./styles.module.css";
export default function DomainCard({ data }) {
  return (
    <div className={style.card}>
      <h3>{data.ens}.eth</h3>
    </div>
  );
}
