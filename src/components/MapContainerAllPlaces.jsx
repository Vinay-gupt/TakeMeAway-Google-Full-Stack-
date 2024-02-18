import { GoogleMap, Marker, MarkerF, OverlayView, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ReactStars from 'react-stars'
import React from 'react'

const MapContainerAllPlaces = ({allPlacesArr}) => {

    // const allPlacesArr = [
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "M536+FX5, Block K, West Patel Nagar, Patel Nagar, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6536478,
    //                 "lng": 77.1623232
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65496177989272,
    //                     "lng": 77.16373072989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.65226212010728,
    //                     "lng": 77.16103107010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "L-16",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "place_id": "ChIJX-0HgRkDDTkRY4ctyB7Qua4",
    //         "rating": 4,
    //         "reference": "ChIJX-0HgRkDDTkRY4ctyB7Qua4",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 4
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "10, West Patel Nagar, Block 1, West Patel Nagar, Patel Nagar, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6474116,
    //                 "lng": 77.16562069999999
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64873467989272,
    //                     "lng": 77.16695022989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64603502010728,
    //                     "lng": 77.16425057010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    //         "icon_background_color": "#7B9EB0",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    //         "name": "The Golden Restro Bar & Banquets",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 3456,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/113314453474132445404\">The Golden Restro &amp; Banquets</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFgnfmEsggwRMqud8vddU4j20K3E9uLGMxSQb_YaBfDUDPTe2V3GQ8BShKXu6xsShD3rz-3QgVmujued2wLLXs44Td_TmOJv-wSrtLnTzlZNA6t14TpMD9lApYeVyixOT0Q5WAWyY5pgye6LOAPjcX5fVi14VzjI9QDU190LghPxwgEh",
    //                 "width": 5184
    //             }
    //         ],
    //         "place_id": "ChIJ93_-HewCDTkRgwYQ5z-K__o",
    //         "plus_code": {
    //             "compound_code": "J5W8+X6 Delhi",
    //             "global_code": "7JWVJ5W8+X6"
    //         },
    //         "rating": 4.2,
    //         "reference": "ChIJ93_-HewCDTkRgwYQ5z-K__o",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 37
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "J5VH+428, Patel Nagar Roundabout, Rajinder Nagar, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6432533,
    //                 "lng": 77.17778009999999
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64479692989272,
    //                     "lng": 77.17907177989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64209727010727,
    //                     "lng": 77.17637212010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Lanterns Kitchen & Bar",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 2988,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/114689500182142380521\">Lanterns Restaurant</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFh_DiO-CJei5Gh8Pv6qnVwiYgpwmA7kdKxVMMd_6pkAtRfdVlKEcSDuFMyClqIMBLB873bZQiU8BRkibkHyAW8O7sEf7u_3acuAkjtqIm0GHaOi5_7Vab-bEvRLiRX-YOCYIArLX_18-N-a7tITHtHg_jV4qIdtNNkGxh8OLfaSYk6v",
    //                 "width": 5312
    //             }
    //         ],
    //         "place_id": "ChIJ-6XuBZYCDTkRzRo4PiUTNYg",
    //         "price_level": 2,
    //         "rating": 4,
    //         "reference": "ChIJ-6XuBZYCDTkRzRo4PiUTNYg",
    //         "types": [
    //             "bar",
    //             "night_club",
    //             "restaurant",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 3370
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "B168A, Block B, Baljit Nagar, Patel Nagar, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6610387,
    //                 "lng": 77.16318609999999
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.66238832989272,
    //                     "lng": 77.16453547989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.65968867010728,
    //                     "lng": 77.16183582010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Akash Verma",
    //         "place_id": "ChIJlbZpAx4DDTkRzCA6Io5mXoQ",
    //         "plus_code": {
    //             "compound_code": "M567+C7 New Delhi, Delhi",
    //             "global_code": "7JWVM567+C7"
    //         },
    //         "rating": 4,
    //         "reference": "ChIJlbZpAx4DDTkRzCA6Io5mXoQ",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 3
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "Shop No. 39, Rajendra Bhawan, Rajendra Place, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6433876,
    //                 "lng": 77.17799370000002
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64485657989272,
    //                     "lng": 77.17935032989273
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64215692010728,
    //                     "lng": 77.17665067010728
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Delly Belly Lounge Bar",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 2304,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/107422024230382335722\">AMIR TREND NEWS</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFhRmqv76Kubz28eQyk-C4ajDduNgtWXgRqAG8ymiuRL5ftjthfhftDV47l6feKGh-R4eTgH0G2TWYCzGehC7B9pzOIKDFVC2D_20QrdZOp_pXmHMlA5BMsyBCiuS0JwegpWlo-P2TawvG2Mh7LkKBBwBU-RpICnyllTg672Wd-_HDXy",
    //                 "width": 4608
    //             }
    //         ],
    //         "place_id": "ChIJRUV-EJYCDTkRoHiciE0oJWU",
    //         "plus_code": {
    //             "compound_code": "J5VH+95 New Delhi, Delhi",
    //             "global_code": "7JWVJ5VH+95"
    //         },
    //         "rating": 3.9,
    //         "reference": "ChIJRUV-EJYCDTkRoHiciE0oJWU",
    //         "types": [
    //             "night_club",
    //             "bar",
    //             "restaurant",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 132
    //     },
    //     {
    //         "business_status": "CLOSED_TEMPORARILY",
    //         "formatted_address": "11/17, W Patel Nagar Rd, Block 16, West Patel Nagar, Patel Nagar, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6501784,
    //                 "lng": 77.1658063
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65149492989273,
    //                     "lng": 77.16713072989273
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64879527010728,
    //                     "lng": 77.16443107010728
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Bt centre",
    //         "permanently_closed": true,
    //         "photos": [
    //             {
    //                 "height": 3024,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/111268042896837046016\">Sanchit Vijh</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFgXXrcvrnhWalateodnyuXLD9CbtFGoxMtH0AF10a6lLHgjOfSvUnc5Mr173XNQn-VtgVm7bhRF4xyo1txxMzqXIiFtPNFpK187Mvi3e2fxJdQ29pRTKSLg5LTqwzd2K6jUSvxDANeX0As7pjtAkuHiGdn0aj0vdIQar0yqbtBh1niP",
    //                 "width": 4032
    //             }
    //         ],
    //         "place_id": "ChIJu5XT2XIDDTkR7nUIh2nIXI0",
    //         "plus_code": {
    //             "compound_code": "M528+38 New Delhi, Delhi",
    //             "global_code": "7JWVM528+38"
    //         },
    //         "rating": 4.8,
    //         "reference": "ChIJu5XT2XIDDTkR7nUIh2nIXI0",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 13
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "Hotel Town Palace Inn, BP 12, opp. Pillar No 220, above Red Tape Showroom, Block 1, West Patel Nagar, Patel Nagar, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6495964,
    //                 "lng": 77.16183550000001
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65092287989272,
    //                     "lng": 77.16316682989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64822322010727,
    //                     "lng": 77.16046717010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    //         "name": "Sesh, The Rooftop Cafe",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 854,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/118167788764443204893\">A Google User</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFg33FC9Fkn4vLr1FZ-L62CMrTZnWonVNzmnFEsos3pX03gOuO3ucLv2OU3F9rz5NT-Jkz-pi2fAXmwjBbaAenaShgGOAEyGgXlzXoY0lO_bgetGNekHQyCNppf9_GoSJKfK-VCzvUFnIaqrY4ZEIyGq__j8ndm2FinqSljJHcZa1krX",
    //                 "width": 1280
    //             }
    //         ],
    //         "place_id": "ChIJFQ6EqtwDDTkR8Ci4Dc23V4I",
    //         "plus_code": {
    //             "compound_code": "J5X6+RP New Delhi, Delhi",
    //             "global_code": "7JWVJ5X6+RP"
    //         },
    //         "rating": 4.4,
    //         "reference": "ChIJFQ6EqtwDDTkR8Ci4Dc23V4I",
    //         "types": [
    //             "restaurant",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 48
    //     },
    //     {
    //         "business_status": "CLOSED_TEMPORARILY",
    //         "formatted_address": "19, Block 24, West Patel Nagar, Patel Nagar, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6528695,
    //                 "lng": 77.1675874
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65420617989273,
    //                     "lng": 77.16896007989273
    //                 },
    //                 "southwest": {
    //                     "lat": 28.65150652010728,
    //                     "lng": 77.16626042010728
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "My love",
    //         "permanently_closed": true,
    //         "place_id": "ChIJE5tBzicDDTkRAbL0vZ_1JN0",
    //         "plus_code": {
    //             "compound_code": "M539+42 New Delhi, Delhi",
    //             "global_code": "7JWVM539+42"
    //         },
    //         "rating": 0,
    //         "reference": "ChIJE5tBzicDDTkRAbL0vZ_1JN0",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 0
    //     },
    //     {
    //         "business_status": "CLOSED_TEMPORARILY",
    //         "formatted_address": "M547+5R7, Block 29, West Patel Nagar, Patel Nagar, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6554212,
    //                 "lng": 77.1645418
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65678022989272,
    //                     "lng": 77.16589867989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.65408057010728,
    //                     "lng": 77.16319902010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Karan Patel ji",
    //         "permanently_closed": true,
    //         "place_id": "ChIJT6Y9KEkDDTkRTz2IpbSRQgU",
    //         "rating": 0,
    //         "reference": "ChIJT6Y9KEkDDTkRTz2IpbSRQgU",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 0
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "No. 18/31, Block 31, East Patel Nagar Rd, Patel Nagar, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6454375,
    //                 "lng": 77.1727689
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64671042989272,
    //                     "lng": 77.17405677989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64401077010728,
    //                     "lng": 77.17135712010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    //         "name": "CABOOSE X",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 1869,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/101864156203364663663\">CABOOSE X</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFgMA0-udrVrdAiamdr4KWr-_Ek_AU2q3m02q9Llv6rC9s1HtGYqb9yVFCqOfzuoXi1Q-iinUUrUJwkrDIkqDtsciXyivP8CWAjLA_9qPC5VJIblgjivBzXMWiNe_hizG85UeofOD1Ti7KlF8wKjV_pi0UXwB0aLHE6IraTV3-Hi_cKd",
    //                 "width": 2803
    //             }
    //         ],
    //         "place_id": "ChIJMUB755QCDTkROjzWOZ5-4H0",
    //         "plus_code": {
    //             "compound_code": "J5WF+54 New Delhi, Delhi",
    //             "global_code": "7JWVJ5WF+54"
    //         },
    //         "rating": 4,
    //         "reference": "ChIJMUB755QCDTkROjzWOZ5-4H0",
    //         "types": [
    //             "restaurant",
    //             "night_club",
    //             "bar",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 227
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "24 1st Floor ,Nwa Road, Punjabi Bagh, Delhi, 110026, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6487696,
    //                 "lng": 77.1628231
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65013157989273,
    //                     "lng": 77.16418257989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64743192010728,
    //                     "lng": 77.16148292010729
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "OwlOwnwithlush",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 958,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/104440877649960490692\">A Google User</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFhtxUfUWJXd8Ax18vGB05DMC0pw08VZlRI5ePBuG2Gk2R_--1SGv4ZeEsEM4tlB_X6l7Uoq2E5dUvFkDxjerp-CvHa2xtzsFdKJbIqA8GAuTtSlKyQMLGaqFSLQnTGBTqTXG-m2IhEEN5c37QX_8BRGNid5T0zp1Q8lb1aW_fhmSGBr",
    //                 "width": 1280
    //             }
    //         ],
    //         "place_id": "ChIJdwTc9ZUDDTkR3Bq5TXxu0p8",
    //         "plus_code": {
    //             "compound_code": "J5X7+G4 Delhi",
    //             "global_code": "7JWVJ5X7+G4"
    //         },
    //         "rating": 3.7,
    //         "reference": "ChIJdwTc9ZUDDTkR3Bq5TXxu0p8",
    //         "types": [
    //             "night_club",
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 17
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "1, 10, Patel Rd, Block 1, West Patel Nagar, Shadipur, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6475171,
    //                 "lng": 77.1655968
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64880847989273,
    //                     "lng": 77.16690222989273
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64610882010728,
    //                     "lng": 77.16420257010729
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    //         "icon_background_color": "#909CE1",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
    //         "name": "Hotel Golden Grand",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 1268,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/109247551335248893436\">A Google User</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFh2u_E_HfsS7bNiQjLFEK17VoNjmVBlAavsdNsgldni1qbrolOiZ7viPccOgiqO8qW4WnNpi2cQyP5A1a5qCYUR1JIBTQpaHjaPzkYSssugMWGkOn4V5WqGNEGXiG1ub9NbVF_nHYmbnFGHUz6HC3jECoQ8h3MMFGE3LW6DLATYb59l",
    //                 "width": 2048
    //             }
    //         ],
    //         "place_id": "ChIJfQEtoOsCDTkRZ6-PHF1QCG4",
    //         "plus_code": {
    //             "compound_code": "J5X8+26 New Delhi, Delhi",
    //             "global_code": "7JWVJ5X8+26"
    //         },
    //         "rating": 4.1,
    //         "reference": "ChIJfQEtoOsCDTkRZ6-PHF1QCG4",
    //         "types": [
    //             "bar",
    //             "lodging",
    //             "store",
    //             "restaurant",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 1592
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "block 18 3rd floor, 18/40, near by 24 seven, Block 18, East Patel Nagar, Patel Nagar, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6456839,
    //                 "lng": 77.1732356
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64702072989272,
    //                     "lng": 77.1746073798927
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64432107010728,
    //                     "lng": 77.17190772010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    //         "name": "Panther Cafe & Lounge",
    //         "opening_hours": {
    //             "open_now": false
    //         },
    //         "photos": [
    //             {
    //                 "height": 720,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/109760128523449650948\">A Google User</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFj1Gs22bbzNWdtz0Fd9kTDEk3AVky1GyDl0ANS7NUzitk3LpdqqUyaQkV0xQis3z5lgwmpi19ib5msPjEqmyyraUbmWov2nzjzBVzpz1d1JJZOeSSb5w2Kr0QG0122Xm7Mh-pWasSWZsucH82YqboCFNP_Z-SpoutAjNk4iwM7H7WxZ",
    //                 "width": 1280
    //             }
    //         ],
    //         "place_id": "ChIJWSCwrcwDDTkRkbkeykive2U",
    //         "plus_code": {
    //             "compound_code": "J5WF+77 New Delhi, Delhi",
    //             "global_code": "7JWVJ5WF+77"
    //         },
    //         "rating": 4.5,
    //         "reference": "ChIJWSCwrcwDDTkRkbkeykive2U",
    //         "types": [
    //             "restaurant",
    //             "night_club",
    //             "bar",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 35
    //     },
    //     {
    //         "business_status": "CLOSED_TEMPORARILY",
    //         "formatted_address": "M533+PC4, W Patel Nagar Rd, Block 7, West Patel Nagar, Patel Nagar, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6542501,
    //                 "lng": 77.1535746
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65556492989273,
    //                     "lng": 77.15489477989271
    //                 },
    //                 "southwest": {
    //                     "lat": 28.65286527010728,
    //                     "lng": 77.15219512010728
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Nomination",
    //         "permanently_closed": true,
    //         "place_id": "ChIJ2USGrXQDDTkRPIjKICJITkI",
    //         "rating": 0,
    //         "reference": "ChIJ2USGrXQDDTkRPIjKICJITkI",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 0
    //     },
    //     {
    //         "business_status": "CLOSED_TEMPORARILY",
    //         "formatted_address": "Plot No, 34, Patel Rd, Block A, Guru Arjun Nagar, Shadipur, New Delhi, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.650977,
    //                 "lng": 77.1590123
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65236772989272,
    //                     "lng": 77.16039097989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64966807010728,
    //                     "lng": 77.15769132010729
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "MD sabbir",
    //         "permanently_closed": true,
    //         "place_id": "ChIJJ7vcOAIDDTkRf0aoVAxULgY",
    //         "plus_code": {
    //             "compound_code": "M525+9J New Delhi, Delhi",
    //             "global_code": "7JWVM525+9J"
    //         },
    //         "rating": 0,
    //         "reference": "ChIJJ7vcOAIDDTkRf0aoVAxULgY",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 0
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "1/6 East Patel Nagar, Patel Rd, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6444551,
    //                 "lng": 77.1707294
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64573992989272,
    //                     "lng": 77.17202892989273
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64304027010728,
    //                     "lng": 77.16932927010728
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
    //         "name": "Qbic Cafe",
    //         "opening_hours": {
    //             "open_now": true
    //         },
    //         "photos": [
    //             {
    //                 "height": 3456,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/109721422754529039168\">Ankit Malik</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFgWyPpl0kL3IwCrXe3AtTHJbMqVp9nPnH1ENaUNrNACu7ZLYOKUlPosQJTexOUCzEIjYvJqv_3KmCdcpnU_LGzqrvMTW4-RjHAetcDYcbHGwaWVrYQGKi201adMQydq2GMcgtGusZDMG9C1mqJuBUr1-_PPIGsO0r2tmevSWwU0a-Ri",
    //                 "width": 4608
    //             }
    //         ],
    //         "place_id": "ChIJxRzXBvgDDTkRRTuk2s3sdkY",
    //         "plus_code": {
    //             "compound_code": "J5VC+Q7 New Delhi, Delhi",
    //             "global_code": "7JWVJ5VC+Q7"
    //         },
    //         "price_level": 3,
    //         "rating": 4.1,
    //         "reference": "ChIJxRzXBvgDDTkRRTuk2s3sdkY",
    //         "types": [
    //             "cafe",
    //             "restaurant",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 1752
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "Unit No 167, Rajendra Bhawan, Rajendra Place, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6434352,
    //                 "lng": 77.1778607
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64488337989272,
    //                     "lng": 77.17921532989271
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64218372010728,
    //                     "lng": 77.17651567010726
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Talli Station Rajendra Place",
    //         "opening_hours": {
    //             "open_now": false
    //         },
    //         "photos": [
    //             {
    //                 "height": 3120,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/109842919995331706561\">Dheerendra Gupta</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFg-h_h_NxXSjCb8jJQOnNu_KwF5i5JCrU94nmSNxtQwYW_gUNbj9qqLTOcHna-EwcJL6BGHKxuChmNbZDcuzABMARkKCoOiOZRTGrkLKyCrVRPn45OXhAGHYpJUJF3dJ1NlvwFkUZyrFVZJzNOagLtqHpywaourwIvaDgqujHxaD7fW",
    //                 "width": 4160
    //             }
    //         ],
    //         "place_id": "ChIJP18MBZYCDTkRbTK6b82GFhw",
    //         "plus_code": {
    //             "compound_code": "J5VH+94 New Delhi, Delhi",
    //             "global_code": "7JWVJ5VH+94"
    //         },
    //         "price_level": 2,
    //         "rating": 4.1,
    //         "reference": "ChIJP18MBZYCDTkRbTK6b82GFhw",
    //         "types": [
    //             "bar",
    //             "restaurant",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 516
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "3, Govind Sikka Marg, Rajendra Place, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6425,
    //                 "lng": 77.1756
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64392712989272,
    //                     "lng": 77.17681502989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64122747010728,
    //                     "lng": 77.17411537010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Tapas Bar & Lounge - Jaypee Siddharth Hotel",
    //         "opening_hours": {
    //             "open_now": false
    //         },
    //         "place_id": "ChIJ7zWWjVMDDTkRmK-mu7rkGeM",
    //         "plus_code": {
    //             "compound_code": "J5RG+X6 New Delhi, Delhi",
    //             "global_code": "7JWVJ5RG+X6"
    //         },
    //         "rating": 4.2,
    //         "reference": "ChIJ7zWWjVMDDTkRmK-mu7rkGeM",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 9
    //     },
    //     {
    //         "business_status": "CLOSED_TEMPORARILY",
    //         "formatted_address": "Tc 108 1st floor gali no.4 pandav nagar, Patel Nagar, Delhi, 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.651658,
    //                 "lng": 77.1528551
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.65297347989272,
    //                     "lng": 77.15426337989273
    //                 },
    //                 "southwest": {
    //                     "lat": 28.65027382010727,
    //                     "lng": 77.15156372010728
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "SKV enterprises",
    //         "permanently_closed": true,
    //         "photos": [
    //             {
    //                 "height": 3000,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/107042783276597767660\">A Google User</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFiWBR5P76N9KjTqUtH-YnvhWf4XGUHElknZhriCdVEUSZ4tA2lDpBcyIt8pPCgN90-_02GeAzATDySEtH41KYI0FaI13A5BB7kCnGJBtVUqZnJ9SK--YeqItji4fDGsaTD4bDNKhCrgUBN9q6O7s-e4LwQdszvslK67je6PYzhSimTr",
    //                 "width": 4000
    //             }
    //         ],
    //         "place_id": "ChIJQ9aWQQMDDTkRVY_zlQf9xyk",
    //         "plus_code": {
    //             "compound_code": "M523+M4 Delhi",
    //             "global_code": "7JWVM523+M4"
    //         },
    //         "rating": 1,
    //         "reference": "ChIJQ9aWQQMDDTkRVY_zlQf9xyk",
    //         "types": [
    //             "bar",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 1
    //     },
    //     {
    //         "business_status": "OPERATIONAL",
    //         "formatted_address": "Vikram Towers, 179/182, DDA Complex, near Bank of Baroda, Rajendra Place, New Delhi, Delhi 110008, India",
    //         "geometry": {
    //             "location": {
    //                 "lat": 28.6430788,
    //                 "lng": 77.1784424
    //             },
    //             "viewport": {
    //                 "northeast": {
    //                     "lat": 28.64444587989272,
    //                     "lng": 77.17999357989272
    //                 },
    //                 "southwest": {
    //                     "lat": 28.64174622010728,
    //                     "lng": 77.17729392010727
    //                 }
    //             }
    //         },
    //         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    //         "icon_background_color": "#FF9E67",
    //         "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    //         "name": "Bar Room",
    //         "opening_hours": {
    //             "open_now": false
    //         },
    //         "photos": [
    //             {
    //                 "height": 750,
    //                 "html_attributions": [
    //                     "<a href=\"https://maps.google.com/maps/contrib/117546301062984802762\">A Google User</a>"
    //                 ],
    //                 "photo_reference": "AWU5eFhCfpb8YMlfkm4w3WmvoaYYsYOM2n7x_jUUL6TKiVJTz2rr_AYZU4G-PM9vb_5ateHZmB1Vx65RFEPIdO6XWPkk3kKmnnmUM2Q4nLVYfLpeUj7qwbI0NIywcIk5uXBJW0YoKyXNqJ7IE-PjYharHerF-BDQJumgQFFuC1XLG3mhAj4Q",
    //                 "width": 1000
    //             }
    //         ],
    //         "place_id": "ChIJu7PryvcDDTkRbJfVjKt358c",
    //         "plus_code": {
    //             "compound_code": "J5VH+69 New Delhi, Delhi",
    //             "global_code": "7JWVJ5VH+69"
    //         },
    //         "rating": 3.7,
    //         "reference": "ChIJu7PryvcDDTkRbJfVjKt358c",
    //         "types": [
    //             "bar",
    //             "restaurant",
    //             "food",
    //             "point_of_interest",
    //             "establishment"
    //         ],
    //         "user_ratings_total": 19
    //     }
    // ];

    // useEffect(() => {
    //     setLoading(false);
    // },[])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  const center = useMemo(() => ( allPlacesArr[0].geometry?.location ), []);

  const [markers, setMarkers] = useState([]);

  return (
    <>
      <div className="App1 d-flex flex-column justify-content-center align-items-center" >
        {!isLoaded ? (
          <LoadingSpinner />
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={15}
          >
            {/* Render all markers */}
            {allPlacesArr?.map((marker, index) => (
                <MarkerF title={marker?.name} key={index} position={{lat:marker?.geometry?.location?.lat , lng:marker?.geometry?.location?.lng}}>
                  {/* {console.log({lat:marker?.geometry?.location?.lat , lng:marker?.geometry?.location?.lng})} */}
                {/* Overlay clickable Link at marker position */}
                <OverlayViewF
                  position={{lat:marker?.geometry?.location?.lat , lng:marker?.geometry?.location?.lng}}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={(width, height) => ({
                    x: -(width / 2),
                    y: -(height),
                  })}
                >
                  <div title={marker?.name} className="flex-col map-card" style={{ position: "absolute", cursor: "pointer", left: 2 , bottom: 0}}>
                    
                    <Link to={`/details/${marker?.place_id}`} >
                      {/* Marker image */}
                      {marker?.photos?.[0]?
                      <img
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${marker?.photos[0]?.photo_reference}&key=${import.meta.env.VITE_API_KEY}`}
                        alt="Marker"
                        style={{ width: "55px", height: "55px" , borderRadius:"50%"}}
                        data-bs-dismiss="modal"
                      />
                      :
                      <img
                      src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600" // Specify the URL of the custom icon
                        alt="Marker"
                        style={{ width: "55px", height: "55px" , borderRadius:"50%"}}
                        data-bs-dismiss="modal"
                      />
                      }
                    </Link>
                    <div style={{backgroundColor: "white"}}>
                        <ReactStars
                        count={5}
                        size={13}
                        color2={'#ffd700'}
                        edit={false}
                        value={marker?.rating} 
                        />
                    </div>
                  </div>
                </OverlayViewF>
              </MarkerF>
            ))}
          </GoogleMap>
        )}
      </div>
    </>
  );
};

export default MapContainerAllPlaces;

