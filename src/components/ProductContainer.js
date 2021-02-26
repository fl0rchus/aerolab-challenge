import React, { useContext, useEffect, useState } from "react";
import { urlProducts, headers } from "../helpers/variables";
import { Product } from "./Product";
import PaginationComponent from "./PaginationComponent";
import { userContext } from "../App";
import usePagination from "../hooks/usePagination";
import { Spinner } from "./Spinner";

export default function ProductContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setProductsList, productsList, category } = useContext(userContext);
  const [sortData, setSortData] = React.useState("recent");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(urlProducts, { method: "GET", headers });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
      setProductsList(data);
    };
    fetchProducts();
  }, []);

  const renderSwitch = () => {
    switch (sortData) {
      case "lowPrice":
        return products
          .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
          .map((data, id) => <Product key={id} data={data} />);
      case "highPrice":
        return products
          .sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost))
          .map((data, id) => <Product key={id} data={data} />);
      default:
        return products
          .sort((a, b) => (a._id < b._id ? -1 : 1))
          .map((data, id) => <Product key={id} data={data} />);
    }
  };

  const { currentArray, next, prev, maxPage, currentPage } = usePagination(
    renderSwitch(),
    16
  );

  return (
    <div className="container animate__animated animate__backInUp">
      <section className="d-flex justify-content-center mt-5">
        <button className="btnFilter btn" onClick={() => setSortData("recent")}>
          Most recent
        </button>
        <button
          className="btnFilter btn"
          onClick={() => setSortData("lowPrice")}
        >
          Lowest price
        </button>
        <button
          className="btnFilter btn"
          onClick={() => setSortData("highPrice")}
        >
          Highest price
        </button>
      </section>
      <hr />
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {loading ? <Spinner /> : currentArray}
      </div>
      <hr />
      <section className="d-flex justify-content-center mb-5">
        <button
          className="btnPaginationLeft btn"
          onClick={() => prev()}
          disabled={currentPage <= 1}
        >
          Next
        </button>
        <button
          className="btnPaginationRight btn"
          onClick={() => next()}
          disabled={currentPage >= maxPage}
        >
          Prev
        </button>
      </section>
    </div>
  );
}
