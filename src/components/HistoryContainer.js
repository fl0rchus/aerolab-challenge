import React, { useEffect, useState } from "react";
import { urlHistory, headers } from "../helpers/variables";
import HistoryComponent from "./HistoryComponent";
import PaginationComponent from "./PaginationComponent";

function HistoryContainer() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const res = await fetch(urlHistory, { method: "GET", headers });
      const data = await res.json();
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <div className="container">
      <HistoryComponent history={history} loading={loading} />
    </div>
  );
}
export default HistoryContainer;
