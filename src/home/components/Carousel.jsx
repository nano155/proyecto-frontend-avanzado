import { useEffect, useState } from "react";
import { ProductCardCarousel } from "./ProductCardCarousel"

export const Carousel = ({ carouselData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
      }, 3000); // Cambia la imagen cada 3 segundos
  
      return () => clearInterval(interval);
    }, [carouselData.length]);
  
    if (carouselData.length === 0) return null; // Asegúrate de manejar el caso en el que no haya datos
  
    const { image, description } = carouselData[currentIndex];
  
    return (
      <div className="w-2/4 l h-96 flex justify-center items-center bg-white rounded-lg">
        <ProductCardCarousel
          image={image}
          description={description}
        />
      </div>
  )
}