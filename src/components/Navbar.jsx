import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const {placeid} = useParams();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary position-sticky top-0 z-2" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><b>TakeMeAway</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                    {
                        placeid && (<li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" onClick={() => {navigate(-1)}} >Listing</Link>
                                    </li>)
                    }
                        </ul>
                    </div>
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar 
