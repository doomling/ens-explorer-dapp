import style from "./styles.module.css";

type TableContainerProps = {
  children: React.ReactNode[] | React.ReactNode;
};

export default function TableContainer({ children }: TableContainerProps) {
  return <div className={style.tableContainer}>{children}</div>;
}
