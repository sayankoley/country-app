import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SearchFilter } from "../Ui/SearchFilter";

export const Country = () => {
  const [apiData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isTyping, setIsTyping] = useState(false); // ⬅️ Add this

  // Fetch country data on mount
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
        );
        const dat = await res.json();
        setData(dat);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // Debounce the search input
  useEffect(() => {
    setIsTyping(true); // ⬅️ Start typing
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setIsTyping(false); // ⬅️ Typing finished
    }, 1200); // debounce delay

    return () => clearTimeout(timer);
  }, [search]);

  // Filter logic
  useEffect(() => {
    const result = apiData.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesRegion =
        filter === "all" || country.region.toLowerCase() === filter.toLowerCase();
      return matchesSearch && matchesRegion;
    });
    setFilteredData(result);
  }, [debouncedSearch, filter, apiData]);

  // Show spinner while loading data or debounce is pending
  if (loading || isTyping) {
    return (
      <div className="container">
        <span className="loaders">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setfilter={setFilter}
        apiData={apiData}
        setData={setData}
      />
      <section className="country-section container">
        {filteredData?.length === 0 ? (
          <p>No Country Match</p>
        ) : (
          <ul className="grid grid-four-cols">
            {filteredData.map((curCountry, index) => {
              const { capital, flags, name, population, region } = curCountry;
              return (
                <li key={index} className="country-card card">
                  <div className="container-card bg-white-box">
                    <img src={flags.svg} alt={flags.alt || name.common} />
                    <div className="countryInfo">
                      <p className="card-title">
                        {name.common.length > 10
                          ? name.common.slice(0, 10) + "..."
                          : name.common}
                      </p>
                      <p>
                        <span className="card-description">Population:</span>
                        {population.toLocaleString()}
                      </p>
                      <p>
                        <span className="card-description">Region:</span>
                        {region}
                      </p>
                      <p>
                        <span className="card-description">Capital:</span>
                        {capital?.[0] || "N/A"}
                      </p>
                      <NavLink to={`/country/${name.common}`}>
                        <button>Read More</button>
                      </NavLink>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
};
