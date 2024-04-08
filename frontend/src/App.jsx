import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
const App = () => {
  // const [products, loading, error] = customReactQuery("/api/products");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(`api/products?search=` + search, {
          signal: controller.signal,
        });
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled ", error.message);
          return;
        }
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })(); //eif emmidiately invoked function defination call

    return()=>{
      controller.abort()
    }

  }, [search]);
  return (
    <div>
      <h1>API in react</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <h2>
        Number of products are :
        {loading ? (
          <ColorRing
            visible={true}
            height="30"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            s
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          products.length
        )}{" "}
        {error && <h1>something went wrong</h1>}
      </h2>
    </div>
  );
};

export default App;
/* 
const customReactQuery = (urlPath) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(urlPath);
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })(); //eif emmidiately invoked function defination call
  }, []);

  return [products, error, loading];
};
 */
