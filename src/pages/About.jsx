import CountryData from "../api/countryData.json";
export const About=()=>{
    return(
   <section className="section-about container">
      <h2 className="container-title">
        Here are the Interesting Facts
        <br />
        we’re proud of
      </h2>

      <div className="gradient-cards">

        {CountryData.map((cur)=>{

            const {capital,countryName,population,interestingFact} =cur;
            return(
         
            <div className="card" key={cur.id}>
              <div className="container-card bg-blue-box">
                <p className="card-title">{countryName}</p>
                <p>
                  <span className="card-description">Capital:</span>
                {capital}
                </p>
                <p>
                  <span className="card-description">Population:</span>
            {population}
                </p>
                <p>
                  <span className="card-description">Interesting Fact:</span>
                  {interestingFact}
                </p>
              </div>
            </div>
            )
   })};
      
      </div>
    </section>
  );

};