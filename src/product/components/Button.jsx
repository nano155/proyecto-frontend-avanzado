export const Button = ({name, action}) => {
  return (
    <>
    <button onClick={action} className="ml-7 py-2 px-3 self-start bg-gradient-to-tr from-purple-300 via-purple-heart-400 to-purple-heart-500 0 rounded-xl text-purple-heart-100">{name}</button>
    </>
  )
}