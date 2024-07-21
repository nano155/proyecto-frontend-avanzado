export const ProductCardCarousel = ({ image, description }) => {
  return (
    <div className="relative w-full h-full bg-white shadow-md rounded-lg overflow-hidden">
    <img
      src={image}
      alt="Product"
      className="w-full h-full object-contain"
    />
    <div className="absolute bottom-0 left-0 w-full bg-opacity-75 bg-gray-800 text-white p-4">
      <p>{description}</p>
    </div>
  </div>
  )
}