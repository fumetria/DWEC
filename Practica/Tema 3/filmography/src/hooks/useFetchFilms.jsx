import { useEffect, useState } from "react";

export const useFetchFilms = (url, query, refetch) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(query ? `${url}/${query}` : url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url, query, refetch]);

  return { data, error };
};
