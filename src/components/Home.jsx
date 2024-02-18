import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeHeader from './HomeHeader';

const Home = () => {
    const [loc , setLoc] = useState("delhi");

    const homeArr = [
        { cardTitle: "Bakery" , photo: "Home_photos/bakery_photo.PNG"},
        { cardTitle: "Bar" , photo: "Home_photos/bar_photo.PNG"},
        { cardTitle: "Cafe" , photo: "Home_photos/cafe_photo.PNG"},
        { cardTitle: "Fast food restaurant" , photo: "Home_photos/fast_food_photo.PNG"},
        { cardTitle: "Ice Cream Shop" , photo: "Home_photos/ice_cream_photo.PNG"},
        { cardTitle: "Chinese Restaurant" , photo: "Home_photos/chinese_photo.PNG"},
        { cardTitle: "Pizza Place" , photo: "Home_photos/pizza_photo.PNG"},
        { cardTitle: "Sushi Restaurant" , photo: "Home_photos/sushi_photo.PNG"},
        { cardTitle: "Thai Restaurant" , photo: "Home_photos/thai_photo.PNG"},
        { cardTitle: "Veg Restaurant" , photo: "Home_photos/veg_photo.PNG"},
    ]

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if ("geolocation" in navigator) {
            // Get current position
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch city name');
                        }
                        const data = await response.json();
                        const city = data.address.neighbourhood;
                        setLoc(city);
                    } catch (error) {
                        setError(error.message);
                    }
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);
    
    return (
        <>
        <HomeHeader loc={loc} setLoc={setLoc}/>
        <div className='home-container d-flex flex-wrap justify-content-center align-items-center'>
            <div>
            </div>
            {homeArr?.map((items , index) => (
                <Link 
                    className="project-single-card homecard" data-aos="zoom-in-up"
                    key={index}
                    to={`/allplaces/${items?.cardTitle}/${loc}`}
                    style={{ textDecoration: 'none' }}
                >
                    <div className="project-single-card home-single-card shadow" style={{ width: "18rem" }}>
                        <img src={items.photo} className="card-img-top home-img" alt="..." height="150px" width="120px" />
                        <div className="home-page-card-text ">
                            <h5 className="home-card-text d-flex justify-content-center align-items-center"><p>{items.cardTitle}</p></h5>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default Home;
