import { ChangeEvent, useEffect, useState } from "react";
import Api from '../../hooks/useApi';
import './style.css';

export const SearchCarPage = () => {
    // const [latitude, setLatitude] = useState<string | null>(null);
    // const [longitude, setLongitude] = useState<string | null>(null);
    const [vacancyNumber, setVacancyNumber] = useState<string>('');
    const [vehicleId, setVehicleId] = useState<string>('');

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             position => {
    //                 setLatitude(String(position.coords.latitude));
    //                 setLongitude(String(position.coords.longitude));
    //             },
    //             error => {
    //                 console.log(error.message);
    //             }
    //         );
    //     } else {
    //         console.log('Geolocation is not supported by this browser.');
    //     }
    // }, []);

    const handleInputVacancyNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setVacancyNumber(e.target.value);
    }

    const handleInputVehicleId = (e: ChangeEvent<HTMLInputElement>) => {
        setVehicleId(e.target.value);
    }

    const handleSearchClick = async () => {
        console.log({ vacancyNumber, vehicleId })
        if (vacancyNumber) {
            const { status, data } = await Api.getVacancyCoordsByVacancyNumber(vacancyNumber);
            console.log({ status, data })
            if (status !== 200) return;
            getDirectionsToCar(data.coords);
        }

        if (vehicleId) {
            const { status, data } = await Api.getVacancyCoordsByVehicleId(vehicleId);
            console.log({ status, data })
            if (status !== 200) {
                console.log("Not found");
                return;
            }
            getDirectionsToCar(data.coords);
        }

        return console.log('SEND ONE THING');
    }

    const getDirectionsToCar = (vacancyCoords: string) => {
        const formattedCoords = vacancyCoords!.replace(/,/g, '.').trim();
        window.location.replace('https://www.google.com/maps/dir/?api=1&origin=' +
            encodeURIComponent(`Bloco L Facens`)
            + "&destination=" + encodeURIComponent(formattedCoords));
    }

    return (
        <>
            <div className="container-search">
                <h1><span>Search</span> your car</h1>
                {/* <label>Vacancy Number:</label> */}
                <input type="text" name="vacancyNumber" placeholder="Enter the vacancy number"
                    value={vacancyNumber} onChange={handleInputVacancyNumber} />
                {/* <label>Vehicle ID:</label> */}
                <input type="text" name="vehicleId" placeholder="Enter the vehicle id"
                    value={vehicleId} onChange={handleInputVehicleId} />
                <button onClick={handleSearchClick}>Search</button>
                <p>Can't find your car ? <a href="">Contact Us</a></p>
            </div>
        </>
    )
}