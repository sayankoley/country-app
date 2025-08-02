import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom"
import { usesApi } from "../api/useApi";

export const CountryDetails = () => {
    const param = useParams();
    console.log(param);
    const [isPending, setTransition] = useState(true);;
    const [apiDatass, setDatass] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                const dat = await usesApi(param.id);
                console.info(dat.data);
             
                    setDatass(dat.data[0]);
                setTransition(false);
            } catch (er) {
                console.debug(er);
            }
        }
        fetch();


    }, []);
    if (isPending) {
        return <div className="container"><span className="loaders"></span></div>
    }
    return (
        <div className="container">
        <section className="card country-details-card container">
            <div className="container-card bg-white-box">
                {apiDatass && (
                    <div className="country-image grid grid-two-cols">
                        <img
                            src={apiDatass.flags.svg}
                            alt={apiDatass.flags.alt}
                            className="flag"
                        />
                        <div className="country-content">
                            <p className="card-title"> {apiDatass.name.official} </p>

                            <div className="infoContainer">
                                <p>
                                    <span className="card-description">
                                    
                                         Native Names:  {Object.keys(apiDatass.name.nativeName).map((key)=>{
                                            return(
                                            apiDatass.name.nativeName[key].common
                                            )
                                        }).join(", ")
                                        
                                        }</span>

                                </p>
                                <p>
                                    <span className="card-description"> Population: {apiDatass.population.toLocaleString()}</span>

                                </p>
                                <p>
                                    <span className="card-description"> Region: {apiDatass.region}</span>

                                </p>
                                <p>
                                    <span className="card-description"> Sub Region: {apiDatass.subregion
}</span>

                                </p>
                                <p>
                                    <span className="card-description"> Capital: {apiDatass.capital[0]}</span>

                                </p>

                                <p>
                                    <span className="card-description">Top Level Domain: {apiDatass.tld[0]}</span>

                                </p>
                                <p>
                                    <span className="card-description"> Currencies: <span className="card-description">
  Currencies: {
    Object.keys(apiDatass.currencies)
      .map((key) => apiDatass.currencies[key].name)
      .join(", ")
  }
</span>
</span>

                                </p>
                                <p>
                                    <span className="card-description">Languages:{Object.keys(apiDatass.languages).map((key)=>{
                                        return apiDatass.languages[key]
                                    }).join(", ")} </span>

                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="country-card-backBtn">
                    <NavLink to={"/country"} className="backBtn">
                        <button>Go Back</button>
                    </NavLink>
                </div>
            </div>
        </section>
        </div>
    );
}
