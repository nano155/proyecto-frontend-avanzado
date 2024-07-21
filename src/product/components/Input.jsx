export const Input = ({type, onChange, nameV, name}) => {
  return (
    <input
    placeholder={`${name.charAt(0).toLocaleUpperCase()}${name.slice(1)}`}
    className="p-2 w-64 bg-transparent focus:outline-none focus:bg-purple-heart-800 focus:bg-opacity-60 placeholder:text-purple-heart-200 border-b-2 border-purple-heart-300 text-purple-heart-100 text-xs font-medium rounded-xl bg-purple-heart-200 bg-opacity-20"
    type={type}
    onChange={onChange}
    value={nameV}
    name={name}
  />
  )
}