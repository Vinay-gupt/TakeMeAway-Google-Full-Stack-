import React from 'react'

const DetailsCarousel = (props) => {
  return (
    <div >

      <div id="carouselExample" style={{ height: "60vh"}} className="carousel slide m-auto detail-carousel">
        <div className="carousel-inner" style={{ height: "100%" }}>

          {props?.details?.photos?.map((obj, index) => (
            <div key={index} className={`carousel-item ${index == 0 ? "active" : ""}`}>
              <div className='d-flex justify-content-center align-items-center' style={{ height: "50vh" }}>
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${obj?.photo_reference}&key=${import.meta.env.VITE_API_KEY}`}

                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          ))}

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default DetailsCarousel