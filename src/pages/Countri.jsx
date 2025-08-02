import { useEffect, useState, useTransition } from "react";
import { useApi } from "../api/useApi";
import { NavLink } from "react-router-dom";

export const Countri = () => {
  const [apiDatas, setDatas] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      const ress = await useApi();
      startTransition(() => {
        setDatas(ress.data);
      });
    };

    fetchData();
  }, []);

  if (isPending) {
    return <div className="container"><span className="loaders"></span></div>
  }

  return (
    <section className="country-section">
      <ul className="grid grid-four-cols">
        {apiDatas.map((curCountry, index) => {
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
                   <NavLink to={"/country/"+name.common}><button>Read More</button></NavLink>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
