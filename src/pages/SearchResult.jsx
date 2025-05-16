import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaInstagram, FaRegComment } from "react-icons/fa";
import NoFeed from "./NoFeed";
import { Card, CardBody, CardImg, CardText, Carousel, CarouselItem } from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

const SearchResult = () => {

    const port = "http://localhost:8080/";
    const [results, setResults] = useState([]);
    const location = useLocation();
    const [query, setQuery] = useState("");


    //  const queryParam = new URLSearchParams(location.search);
    // const searchQuery = queryParam.get("query");
    // console.log(searchQuery);
    // useEffect(() => {
    //     if (searchQuery && searchQuery.length > 1) {
    //         axios
    //             .get(`http://localhost:8080/searchFeed?query=${searchQuery}`)
    //             .then((res) => {
    //                 setResults(res.data);
    //             })
    //             .catch((err) => {
    //                 console.error("Search failed", err);
    //             });
    //     }
    // }, [searchQuery]);

    const handleSearch = async (e) => {

        const value = e.target.value;
        setQuery(value);

        if (value.length >= 1) {
            try {
                const response = await axios.get(`http://localhost:8080/searchFeed?query=${value}`);
                setResults(response.data);
            } catch (error) {
                console.log(error.message);

            }
        } else {
            setResults("No result")
        }

    }

    return (

        <>
            <nav className='navbar nav-light bg-light justify-content-between p-3'>

                <div className='d-flex mx-2 '>
                    <a className='navbar-brand  '>
                        <FaInstagram />
                        <span className='m-2 '>Instagram</span>
                    </a>
                </div>
                <form className="form-inline">
                    <input className="form-control mr-sm-2 rounded-pill" type="text" placeholder="Search" aria-label="Search" id='searchBar' onKeyUp={handleSearch} />

                </form>

            </nav>
            <div>
                {/* <h2>Search Results for: "{Query}"</h2> */}
                {/* <ul>
                    {results.map((item) => (
                        <li key={item.id}>
                            {item.title}: {item.description}
                        </li>
                    ))}
                </ul> */}

                <>
                    {

                        results.length === 0 ? (<NoFeed />) :

                            (results.map((d) => {
                                //  console.log(d.id);
                                // const images = d.imgPath.split(',');

                                const isMultiple = d.imgPath.includes(',');


                                // console.log(isMultiple)
                                const images = isMultiple ? d.imgPath.split(',') : d.imgPath;
                                // console.log(images)
                                // console.log(d);

                                return isMultiple ? (
                                    <div style={{ width: '18rem', height: '18rem' }} className="d-inline-block border rounded m-2 " key={d.id}>
                                        <Carousel key={d.id} style={{ width: '18rem' }} className="d-inline-block mt-0 " interval={null}>
                                            {images.map((img, index) => (
                                                <CarouselItem key={index}>
                                                    <img

                                                        src={port + img.trim()}
                                                        style={{ height: '10rem', width: '18rem', objectFit: 'cover' }}
                                                        alt={`carousel-img-${index}`}
                                                    />
                                                </CarouselItem>
                                            ))}


                                        </Carousel>
                                        <div>
                                            <div className='mx-2 p-1'>
                                                <button className="btn btn-transparent"><AiOutlineLike  /></button>
                                                <button className="btn btn-transparent"><FaRegComment /></button>
                                                <button className="btn btn-transparent"><PiShareFat /></button>
                                            </div>
                                            <div className='mx-2 '>
                                                <h6>{d.title}</h6>
                                                <span style={{ fontSize: '0.75rem' }}>{d.description.length > 30
                                                    ? d.description.substring(0, 45)
                                                    : d.description}</span>
                                            </div>
                                        </div>

                                    </div>


                                ) : (
                                    <Card style={{ width: '18rem' }} className="d-inline-block m-2" key={d.id}>
                                        <CardImg
                                            variant="top"
                                            src={port + images.trim()}
                                            style={{ width: '18rem', height: '10rem', objectFit: 'cover' }}
                                        />

                                        <CardBody>
                                            <div>
                                                <button className="btn btn-transparent"><AiOutlineLike /></button>
                                                <button className="btn btn-transparent"><FaRegComment /></button>
                                                <button className="btn btn-transparent"><PiShareFat /></button>
                                            </div>
                                            <CardText className="mt-1 h6">{d.title}</CardText>
                                            <CardText className="mt-1" style={{ fontSize: '0.75rem' }}>
                                                {d.description.length > 30
                                                    ? d.description.substring(0, 45)
                                                    : d.description}
                                            </CardText>
                                        </CardBody>
                                    </Card>


                                )

                               
                            }))

                    }


                </>

            </div>
        </>
    )
}

export default SearchResult