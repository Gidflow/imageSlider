import React, { useEffect, useState } from 'react';
import "./style.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"

const Slider = ({ url, limit, page }) => {

    const [image, setImages] = useState([]);
    const [currentSlide, setCurrentSLide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImage(getUrl) {
        try {
            setLoading(true);

            const res = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await res.json();

            console.log(data);

            if (data) {
                setImages(data);
                setLoading(false);
            }


        }
        catch (e) {
            setErrorMsg(e.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (url !== "") fetchImage(url)
    }, [url]);

    if (loading) {
        return <div>Loading data! Please wait</div>
    }

    if (errorMsg !== null) {
        return <div>Error occured! {errorMsg}</div>
    }

    const handlePrevious = () => {
        setCurrentSLide(currentSlide === 0 ? image.length - 1 : currentSlide - 1)
    }

    const handleNext = () => {
        setCurrentSLide(currentSlide === image.length - 1 ? 0 : currentSlide + 1)
    }

    return (
        <div className='container'>
            <BsArrowLeftCircleFill onClick={handlePrevious} className='arrow arrow-left' />
            {
                image && image.length ? image.map((images, index) => {
                    return <img key={images.id} src={images.download_url}
                        alt={images.download_url}
                        className={currentSlide == index ? 'current-image' : "current-image no-display"} />
                }) : null
            }
            <BsArrowRightCircleFill onClick={handleNext} className='arrow arrow-right' />
            <span className='circle-indicators'>
                {
                    image && image.length ? image.map((_, index) => {
                        return <button onClick={()=>setCurrentSLide(index)} key={index} className={currentSlide === index ? 'current-indicator' : "current-indicator inactive"}></button>
                    }) : null
                }
            </span>
        </div>
    )
}

export default Slider