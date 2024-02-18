import React from 'react'
import { FaQuoteLeft , FaQuoteRight } from "react-icons/fa";

const ReviewsCarousel = (props) => {
  return (
      <div>
        <hr className='mt-3'/>
        <div>
            <h3>Reviews</h3>
        </div>
        <div className='d-flex flex-row flex-wrap'>
              {props.reviews && props.reviews?.map((item,index) => (
                  <div 
                    className='m-2 p-3 details-box'
                    key={index} 
                    style={{ borderRadius:"15px", width: "100%" , fontFamily:"cursive" , backgroundColor:"#e4e5f1"}}
                    >
                      <div>
                        <h5><FaQuoteLeft /> {item?.text} <FaQuoteRight /></h5>
                      </div>

                    <div className='d-flex align-items-end'>
                      <div className='d-flex flex-row m-2'>
                          <img
                              src={item?.profile_photo_url}
                              alt=""
                              height="50rem"
                              width="50rem"
                          />
                          <div className='d-flex flex-column ms-1' style={{height:"100%" }}>
                            <div>{item.author_name}</div>
                            <div>{item.relative_time_description}</div>
                          </div>
                      </div>
                    </div>

                  </div>
              ))}
          </div>

      </div>
  )
}

export default ReviewsCarousel
