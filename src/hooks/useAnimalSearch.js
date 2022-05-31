import { useEffect, useState } from "react";

export const useAnimalSearch = () => {
  const [animals, setAnimals] = useState([]);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };

  useEffect(() => {
    let lastQuery = "";
    if (localStorage.getItem("lastQuery")) {
      lastQuery = localStorage.getItem("lastQuery");
    }
    search(lastQuery);
  }, []);

  return { search, animals };
};
