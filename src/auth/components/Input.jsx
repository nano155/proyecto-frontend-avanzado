export const Input = ({ name, type, onChange, nameV = '' }) => {
  return (
    <input
      placeholder={`${name.charAt(0).toLocaleUpperCase()}${name.slice(1)}`}
      className="p-4 bg-transparent focus:outline-none focus:bg-purple-heart-800 focus:bg-opacity-60 placeholder:text-purple-heart-50 border-b-2 border-purple-heart-300 text-purple-heart-100 text-xl font-normal rounded-xl"
      type={type}
      onChange={onChange}
      value={nameV}
      name={name}
    />
  );
};
