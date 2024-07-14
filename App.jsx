import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [products, setproducts] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data && data.products) {
      setproducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const pageHandler = (selectedPage) => {
    setPages(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pages * 3 - 3, pages * 3).map((prod) => {
            return (
              <>
                <span className="products__single" key={prod.id}>
                  <span>{prod.title}</span>
                  <img src={prod.thumbnail} alt={prod.title} />
                </span>
              </>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span className={ pages > 1 ? "" : "pagination__disable"} onClick={() => pageHandler(pages - 1)}>⬅️</span>
          {[...Array(products.length / 3)].map((_, i) => {
            return (
              <span
                className={pages === i + 1 ? "pagination__selector" : ""}
                onClick={() => pageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span className={ pages < 1 ? "" : "pagination__disable"} onClick={() => pageHandler(pages + 1)}>➡️</span>
        </div>
      )}
    </div>
  );
};

export default App;
