import { useEffect, useState } from "react"
import { useProductStore } from "../../hooks/useProductStore"
import { Navbar } from "../components"
import { Carousel } from "../components/Carousel";

export const HomePage = () => {
  const [carouselData, setCarouselData] = useState([]);
  const { products } = useProductStore();

  const getRandomProducts = (products, num) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  const optimizeImage = (url) => {
    // Ajusta los parámetros de la URL según la documentación de Cloudinary
    return url.replace("/upload/", "/upload/q_auto,f_auto,w_500/");
  };

  const chargeCarouselData = () => {
    const randomProducts = getRandomProducts(products, 5);
    const formattedData = randomProducts.map(product => ({
      description: product.description,
      image: optimizeImage(product.thumbnails[0])
    }));
    setCarouselData(formattedData);
  };

  useEffect(() => {
    if (products.length > 0) {
      chargeCarouselData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <Carousel carouselData={carouselData} />
      </div>
    </>
  )
}
