import { Link} from "react-router-dom"

export const Button = ({buttonName, message, messageLink, route}) => {
  return (
    <div className="flex justify-between lg:flex-row flex-col">
    <button className="rounded-xl py-1 px-3 w-full bg-purple-heart-400 text-purple-50 text-lg">{buttonName}</button>
    <p className="w-full text-purple-heart-50">{message} <Link to={route} className="text-purple-heart-300">{messageLink}</Link></p>
    </div>
  )
}
