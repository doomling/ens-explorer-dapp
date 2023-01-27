import style from "./styles.module.css";
import Tab from "../Tab";
import LastTransactions from "../LastTransactions";
import { useState } from "react";
import TxGraph from "../TxGraph";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = [
    {
      name: "ENS Transactions",
      component: <LastTransactions />,
    },
    { name: "Transaction graph", component: <TxGraph /> },
  ];
  return (
    <section className={style.tabsContainer}>
      <ul className={style.titleContainer}>
        {tabs.map((item, i) => {
          return (
            <li
              className={activeTab === i ? style.activeTab : ""}
              onClick={() => setActiveTab(i)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
      <div className={style.contentContainer}>
        <Tab component={tabs[activeTab].component} />
      </div>
    </section>
  );
}
