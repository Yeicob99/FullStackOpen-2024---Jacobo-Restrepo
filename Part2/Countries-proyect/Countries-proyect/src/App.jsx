import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ capital }) => {
    const [weather, setWeather] = useState(null);
    const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

    useEffect(() => {
        if (!API_KEY) {
            console.error("API key is missing");
            return;
        }

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error("Error al buscar el clima", error);
            });
    }, [capital, API_KEY]);

    if (!weather) return <p>Loading weather...</p>;

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p><strong>Temperature:</strong> {weather.main.temp} °K</p>
            <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
        </div>
    );
};

export { WeatherInfo };

const CountryInfo = ({ country }) => {
    if (!country) return null;

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            <p><strong>Área:</strong> {country.area} km²</p>
            <p><strong>Idiomas:</strong></p>
            <ul>
                {country.languages &&
                    Object.values(country.languages).map((lang, index) => (
                        <li key={index}>{lang}</li>
                    ))
                }
            </ul>
            <img src={country.flags.png} alt="Bandera" width="150" />

            {country.capital && <WeatherInfo capital={country.capital[0]} />}
        </div>
    );
};

const BuscarPaises = () => {
    const [query, setQuery] = useState("");
    const [paises, setPaises] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (query === '') {
            setPaises([]);
            setSelectedCountry(null);
            return;
        }

        axios
            .get(`https://restcountries.com/v3.1/name/${query}`)
            .then(response => {
                setPaises(response.data);
                setSelectedCountry(null);
            })
            .catch(error => {
                console.error("Error al buscar países", error);
                setPaises([]);
            });
    }, [query]);

    return (
        <div>
            <p>Find countries:</p>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write the name of a country"
            />

            {paises.length > 10 && <p>Make it more specific</p>}

            {paises.length <= 10 && paises.length > 1 && (
                <ul>
                    {paises.map((pais) => (
                        <li key={pais.name.common}>
                            {pais.name.common}
                            <button onClick={() => setSelectedCountry(pais)}>Show info</button>
                        </li>
                    ))}
                </ul>
            )}

            {(paises.length === 1 || selectedCountry) && (
                <CountryInfo country={selectedCountry || paises[0]} />
            )}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <h1>Country Finder</h1>
            <BuscarPaises />
        </div>
    );
};

export default App;