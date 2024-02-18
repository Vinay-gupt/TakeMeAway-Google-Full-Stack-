import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import DetailsCarousel from './DetailsCarousel';
import ReviewsCarousel from './ReviewsCarousel';
import { SiGooglemaps } from "react-icons/si";
import MapContainer from './MapContainer';
import LoadingSpinner from './LoadingSpinner';

const Details = () => {
   //  const homeArr = [
   //      { cardTitle: "Bakery" , photo: "https://cdn.pixabay.com/photo/2023/03/26/11/40/woman-7878192_640.jpg"},
   //      { cardTitle: "Bar" , photo: "https://cdn.pixabay.com/photo/2023/11/09/11/50/cat-8377169_640.jpg"},
   //      { cardTitle: "Cafe" , photo: "https://cdn.pixabay.com/photo/2023/03/26/11/40/woman-7878192_640.jpg"},
   //      { cardTitle: "Fast food restaurant" , photo: "https://cdn.pixabay.com/photo/2023/11/09/11/50/cat-8377169_640.jpg"},
   //      { cardTitle: "Ice Cream Shop" , photo: "https://cdn.pixabay.com/photo/2023/03/26/11/40/woman-7878192_640.jpg"},
   //      { cardTitle: "Chinese Restaurant" , photo: "https://cdn.pixabay.com/photo/2023/11/09/11/50/cat-8377169_640.jpg"},
   //      { cardTitle: "Pizza Place" , photo: "https://cdn.pixabay.com/photo/2023/03/26/11/40/woman-7878192_640.jpg"},
   //      { cardTitle: "Sushi Restaurant" , photo: "https://cdn.pixabay.com/photo/2023/11/09/11/50/cat-8377169_640.jpg"},
   //  ]

   const [details, setDetails] = useState({});
   const [mapToggle, setMapToggle] = useState(false);
   const [load, setLoad] = useState(true);

   const { placeid } = useParams();
   const BASE_URL = import.meta.env.VITE_BASE_URL;

   //  useEffect(() => {
   //      setDetails({
   //          "formatted_address": "48 Pirrama Rd, Pyrmont NSW 2009, Australia",
   //          "formatted_phone_number" : "(02) 9374 4000",
   //          "geometry" : 
   //          {
   //             "location" : 
   //             {
   //                "lat" : -33.866489,
   //                "lng" : 151.1958561
   //             },
   //             "viewport" : 
   //             {
   //                "northeast" : 
   //                {
   //                   "lat" : -33.8655112697085,
   //                   "lng" : 151.1971156302915
   //                },
   //                "southwest" : 
   //                {
   //                   "lat" : -33.86820923029149,
   //                   "lng" : 151.1944176697085
   //                }
   //             }
   //          },
   //          "name" : "Google Sydney - Pirrama Road",
   //          "photos" : 
   //          [
   //             {
   //                "height" : 3024,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/104641095422852249098\">Matty B</a>"
   //                ],
   //                "photo_reference" : "AWU5eFi_7uoyjR4FK5kcp4_wJ4wbpeZ8-COa59QCkGrQEd83pBeQuRb1svxXwMIkJaJugpU7HsiXSUQWZFmxduitGBs3o3ckP8_NHtKk3r0H_XVXq6oo-pbYzXPHC_08LnG71G4gCruorPi25aKJqRaOkQswzHbp1yaF_VtSQZ1SKKXaabJP",
   //                "width" : 4032
   //             },
   //             {
   //                "height" : 3264,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/102493344958625549078\">Heyang Li</a>"
   //                ],
   //                "photo_reference" : "AWU5eFh6ma8qiiNCWE3RIOhPPWST1RxZcOVoRPfecv7suUopTb30QL3_JpR_AwUIGtiVnRSZZQCTarJZWL9_BnjzsEknpyLThieCPIrKNs2SLxPMFs2FCkfhQj88wmOnp3EtfTz_yRlRnlTVbJ4dfcSk__jMj16PDuvmvvH9oItJD9-lU6GO",
   //                "width" : 4912
   //             },
   //             {
   //                "height" : 3024,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/109073253434498369454\">sang suh</a>"
   //                ],
   //                "photo_reference" : "AWU5eFiJ5NWOTltlAzYjqGoknkNg7RHM94XqHnAUs4qVNE4MVimp2QFTzT77g0FdTmgB58K1HDgAoO8-jGDVhjAxAlbaC7t_Ojl8pHattTmHG8P4T-T8JmkYssALE7MbPmcOt03ooVzzuoJHGJWE2Y2537KSAPPBvnedXX05JEbastEifFHC",
   //                "width" : 4032
   //             },
   //             {
   //                "height" : 3024,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/102987930970147458128\">Garrett N.</a>"
   //                ],
   //                "photo_reference" : "AWU5eFgTESEtR9zjh1BIf_xXm_XwKh-RANUn5dJTZgK4B0ux5dTO85HXh5gFPDJClk6HwJdnjc8b3_biwP9N-TrN3b-OuROMlWlp2CFm-5NuiNpkAFe4GItnRkvdMJpl852qEmsCLzqxiePb8lpiGPpsHi51PZRNT1UBuOcjXAjoc4jDTZjs",
   //                "width" : 4032
   //             },
   //             {
   //                "height" : 3072,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/101597484841229205770\">Flo Yeow</a>"
   //                ],
   //                "photo_reference" : "AWU5eFi1OHTNJTr3IScUjKaKBNhbdqnisqk3sXn1JjdSV81PVs66b2koedUBjj3XblCsudx1LZdpU5705vO5YmLJbKmGAMYpVEZyTRqD62eT1QvaWHCcVFjQqE4vSGFtcRkAjczh3GFkscwAsuq5Hh41XzPlikOaMzxSZtcI0tyWG9EGadJW",
   //                "width" : 4080
   //             },
   //             {
   //                "height" : 4032,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/114541402993501063706\">Chidi Ilobi</a>"
   //                ],
   //                "photo_reference" : "AWU5eFiC-S30mi2dAz9-NNP1aJjVdQlFZJd9RC3zRo-jZP5IqH_q9sKoJAzKAUcF0XOSgu6iLcyJFDWfq4JMdbGaRC778hUhB9K_4GqNhnA0ZZ1WhUpTd-bwYiknDQOjfsXcH_KxwOhPPqMmLvW_j299JMNDt5-uXc2CY8YDlZe0yXaJU14v",
   //                "width" : 3024
   //             },
   //             {
   //                "height" : 2448,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/109424226596487740627\">William Li</a>"
   //                ],
   //                "photo_reference" : "AWU5eFh6LRBm8XQFmKQxfqIHs27W1b0MyDp-5EKC44vTw_URkpfffTEVQKFpnKN1xSoehLH8vg3o3LGnITEQka0HANUApozoVNh9cwICpu7vxfiS0HMRVLqiYW0HPeim0Fj0fRyAHt4FyerxxRPZ0K24gs1Yw5Y_TlNoklihIGPc4Mqi6Inv",
   //                "width" : 3264
   //             },
   //             {
   //                "height" : 3921,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/102987930970147458128\">Garrett N.</a>"
   //                ],
   //                "photo_reference" : "AWU5eFhcnF1Q5g8g3RnfiDJ90hSEcAfTTYmBtzs82QM6MxuU9eX9gheSTiGXEErjn51ZGh8H2EccuEx4a5JzE77vsg2Z_8bfwFKALAcOYCh3wmqs5Kgs45cGL3fxWwdDRVQKi3RIXivE8wRNJEDjFrogD6_yPhf2Lio_iQ2H1tCu7-Mr_MEc",
   //                "width" : 2941
   //             },
   //             {
   //                "height" : 4032,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/102558609090086310801\">Huy Tran</a>"
   //                ],
   //                "photo_reference" : "AWU5eFhh1T7PLuxNcUxIwUteoo6QJoHgSypR_Dzoqa32pI20N_WwnjCJg3bZ2xkaqLOKLTdRTUZgGyrVaKRmKkbRjFKSlKZ7HW08jLdzD1qxsAM_WYyl5CfJJoX4Dl39ztrNL6o8UyEAit8DKKONZu91x5K4ZAaCGr4a26K275wZvgTd8ajL",
   //                "width" : 3024
   //             },
   //             {
   //                "height" : 3024,
   //                "html_attributions" : 
   //                [
   //                   "<a href=\"https://maps.google.com/maps/contrib/104641095422852249098\">Matty B</a>"
   //                ],
   //                "photo_reference" : "AWU5eFjoe4YQdMd6Cd4Wj7_8inhi_jHn0MGxngXsVWfeJBcMWhEYVfrSwvauDVDRlrdPfxNvT3D2xGuKVZwsAW5--OWZiRs6U2gAg8bVVU8rTuLUHx2-jVET_CfoTy7BAX9-GY8gEFscrEiry-FVUvaviT3m6pV-vgjV-ojBuF7pbG2j4OFg",
   //                "width" : 4032
   //             }
   //          ],
   //          "rating" : 4,
   //          "reviews" : 
   //          [
   //             {
   //                "author_name" : "Flo Yeow",
   //                "author_url" : "https://www.google.com/maps/contrib/101597484841229205770/reviews",
   //                "language" : "en",
   //                "original_language" : "en",
   //                "profile_photo_url" : "https://lh3.googleusercontent.com/a-/ALV-UjWOqykOFGE9KCFEtmPJxqXd3uN4B-frD_eQZQLFYrAOUG1q=s128-c0x00000000-cc-rp-mo-ba8",
   //                "rating" : 5,
   //                "relative_time_description" : "a year ago",
   //                "text" : "This is the Sales side of the couple of offices that Google has in Sydney. The engineering side is nicer but this is nice too.\n\nStraightforward set up, in a single column building, stairs and lift in the middle, and everything else around it. Professional baristas at The Press are really lovely people, and when I visited the dining hall was serving Carbonara on a cheese wheel. Make sure you stand at the rooftop balcony and enjoy the breeze and view of the surroundings.\n\nWith such gorgeous amenities and benefits, what's there not to like about working here.",
   //                "time" : 1670547584,
   //                "translated" : false
   //             },
   //             {
   //                "author_name" : "Scott Duncombe",
   //                "author_url" : "https://www.google.com/maps/contrib/116392337420960935042/reviews",
   //                "language" : "en",
   //                "original_language" : "en",
   //                "profile_photo_url" : "https://lh3.googleusercontent.com/a-/ALV-UjVSpL3BXP00_s7qDvYvBl87qGOqCg3s-t9o--kLKV9otsY=s128-c0x00000000-cc-rp-mo",
   //                "rating" : 1,
   //                "relative_time_description" : "3 months ago",
   //                "text" : "Impossible to get on to...\nImpossible to fix any issue with Business Listings...\nKeep getting automated responses that aren't solving the issues...\nNo one answers their phones....\nDoes anyone actually read these Google Reviews on Google?\nBusiness is tough enough, but when google starts to suspend business listings that have been live and active for 3 years, it is affecting the bottom line.... yet they are not there to help or fix any problems....",
   //                "time" : 1699403370,
   //                "translated" : false
   //             },
   //             {
   //                "author_name" : "Johnny Bravo",
   //                "author_url" : "https://www.google.com/maps/contrib/110160589786904846393/reviews",
   //                "language" : "en",
   //                "original_language" : "en",
   //                "profile_photo_url" : "https://lh3.googleusercontent.com/a/ACg8ocJAn_QAyj4f1-8b7w6v6D4qaOeyz23N2pXmKwtva4n4=s128-c0x00000000-cc-rp-mo",
   //                "rating" : 1,
   //                "relative_time_description" : "2 months ago",
   //                "text" : "The Google reviews process provides an avenue whereby any random person (or group of people, or competitor business owners) can anonymously, slander and attack a business publicly with little to no recourse and it is impossible  for the business to have these reviews removed (even when they are obviously fake). This can have a detrimental effect on a businesses performance and is a totally unfair system...Businessess have no choice weather they participate in the review system or not, google just automatically asigns it (even if it's not wanted)..  So here's one back at ya google. If I could leave zero stars I would.. don't be fooled by googles 4.5 star rating, reading through thier reviews, it is blatantly obvious that google uses staff and/or bots to provide false positive reviews to counteract the amount of negative ones they get, it's not really cricket is it???",
   //                "time" : 1700128403,
   //                "translated" : false
   //             },
   //             {
   //                "author_name" : "Wilhelmina Cheel",
   //                "author_url" : "https://www.google.com/maps/contrib/106866809907251511770/reviews",
   //                "language" : "en",
   //                "original_language" : "en",
   //                "profile_photo_url" : "https://lh3.googleusercontent.com/a-/ALV-UjXk_Qy4LodS4mzArl08uHEsChqoxtvsyc7oaKKg15OXTw=s128-c0x00000000-cc-rp-mo",
   //                "rating" : 1,
   //                "relative_time_description" : "a month ago",
   //                "text" : "Please take note..\nSeveral times over the past 3 mths I have emailed to notify Google that my account is being charged for a platform that was closed by the merchant ,so is no longer in existence.\nWhat do I need to do for Google to stop charging me for something I can't use...something non existent.",
   //                "time" : 1704413620,
   //                "translated" : false
   //             },
   //             {
   //                "author_name" : "Jiri Kanicky",
   //                "author_url" : "https://www.google.com/maps/contrib/102185688529835406660/reviews",
   //                "language" : "en",
   //                "original_language" : "en",
   //                "profile_photo_url" : "https://lh3.googleusercontent.com/a-/ALV-UjUbXVGnJ6-4Z3-JW9NgVyDg5Mhmke8cLpfE1cCrDOcDH_Y=s128-c0x00000000-cc-rp-mo-ba3",
   //                "rating" : 1,
   //                "relative_time_description" : "3 months ago",
   //                "text" : "Extremely bad services for hardware. I bought a Pixel 8 which is having a problem and I am not able to get a new one in the store. They want to take this one and send me new within 4 weeks. Being without a phone is a great service. Apple would have changed it on the spot. No more purchasing Google lemon phones.",
   //                "time" : 1698557152,
   //                "translated" : false
   //             }
   //          ]
   //          ,"url": "https://maps.google.com/?cid=10281119596374313554"
   //       });
   //  },[placeid])



   useEffect(() => {
      axios.get(`${BASE_URL}/details/${placeid}`)
         .then((output) => {
            setDetails(output.data.result)
            setLoad(false);
         })
   }, [])

   return (

      <>
         {load ? (<LoadingSpinner />) :
            <div className="m-auto mt-4" style={{ width: "80vw" }}>

               <DetailsCarousel details={details} />

               <div
                  className='position-sticky top-2'
               >
                  <div className='d-flex justify-content-between align-items-center'>
                     <h2><b>{details.name}</b></h2>
                     <h4 >{details.rating ? details.rating : 0}⭐</h4>
                  </div>
                  <div className='detailed-address'>{details.formatted_address}</div>
                  <div className='mt-1'>{details?.opening_hours?.open_now === false ? <h6 style={{ color: "red" }}>CURRENTLY CLOSED</h6> : <h6 style={{ color: "green" }}>OPEN NOW</h6>}</div>

                  <a href={details?.url} target="_blank">
                     <button
                        type="button"
                        className="btn btn-outline-secondary m-1"
                     >
                        Go to Maps <SiGooglemaps />
                     </button>
                  </a>
                  {/* --- */}
                  <button
                     type="button"
                     className="btn btn-outline-secondary m-1"
                     onClick={() => setMapToggle(!mapToggle)}
                  >
                     Show on Map <SiGooglemaps />
                  </button>
                  <div>
                     <MapContainer lat={details?.geometry?.location?.lat} lon={details?.geometry?.location?.lng} mapToggle={mapToggle} details={details} />
                  </div>
                  {/* --- */}
               </div>

               {details && <ReviewsCarousel reviews={details?.reviews} />}

            </div>
         }
      </>
   )
}

export default Details