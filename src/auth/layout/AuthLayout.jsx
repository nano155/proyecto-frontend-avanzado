import { Button } from "../components"



export const AuthLayout = ({children, namePage, buttonName, message, messageLink, route, onSubmit}) => {
  return (
    <div className="relative bg-transparent p-20 rounded-md lg:w-2/5 xl:w-1/3  md:w-3/5 w-full text-center">
    <div className="absolute inset-0 bg-purple-heart-700 opacity-60 rounded-md"></div>
    <form onSubmit={onSubmit} className="relative z-10 flex flex-col gap-5">
    <h3 className="text-4xl text-purple-heart-50 font-semibold">{namePage}</h3>
      {children}
      <Button buttonName={buttonName} message={message} messageLink={messageLink} route={route}/>
    </form>
  </div>
  )
}
