import style from "./styles.module.css";

type Props = {
  component: React.ReactNode;
};
export default function Tab({ component }: Props) {
  return (
    <div className={style.tabContainer}>
      <div className={style.content}>{component}</div>
    </div>
  );
}
