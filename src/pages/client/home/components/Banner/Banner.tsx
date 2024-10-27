import React, { useState, useEffect } from 'react';
import './Banner.css'

interface Image {
    src: string;
    alt: string;
}

const Banner: React.FC = () => {
    const images: Image[] = [
        {
            src: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2021/03/Valorant.png?fit=1200%2C675&ssl=1",
            alt: "Valorant"
        },
        {
            src: "https://cdn.tgdd.vn/2020/06/content/hinh-nen-lien-minh-huyen-thoai-dep-mat-cho-pc-va-dien-thoai-background-800x450.jpg",
            alt: "Liên Minh Huyền Thoại"
        },
        {
            src: "https://variety.com/wp-content/uploads/2019/02/pubg-mobile-1.png?w=1000&h=620&crop=1",
            alt: "PUBG"
        }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [images.length]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };



    return (
        <div className="banner-container">
        {/* <div className="game-categories">
            <h2 className='text-3xl font-bold'>Sort By Game</h2>
            <ul >
                <li><Link to="/products/csgo" onClick={() => handleGameClick('csgo')}>CSGO</Link></li>
                <li><Link to="/products/lol" onClick={() => handleGameClick('lol')}>League of Legends</Link></li>
                <li><Link to="/products/valorant" onClick={() => handleGameClick('valorant')}>Valorant</Link></li>
                <li><Link to="/products/pubg" onClick={() => handleGameClick('pubg')}>PUBG</Link></li>
                <li><Link to="/products/fortnite" onClick={() => handleGameClick('fortnite')}>Fortnite</Link></li>
                <li><Link to="/products/rating" onClick={() => handleGameClick('rating')}>Rating</Link></li>
                <li><Link to="/products/price" onClick={() => handleGameClick('price')}>Price</Link></li>
            </ul>
        </div> */}
        <div className="banner">
            <div className="banner-image">
                <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
            </div>
            <div className="banner-controls">
                <button onClick={prevImage} className="banner-button">❮</button>
                <button onClick={nextImage} className="banner-button">❯</button>
            </div>
        </div>
    </div>
    );
};

export default Banner;
