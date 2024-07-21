import { useProductStore } from "../../hooks/useProductStore";


export const ProductAll = ({title, owner, id, handleEdit}) => {

    const {deleteProduct} = useProductStore()
  

    const handleDelete = async (id) =>{
        await deleteProduct(id)
      }
    return (
        <>
            <div className="flex px-6 text-white items-center justify-between gap-4 bg-purple-heart-300 rounded-xl bg-opacity-40">
                <div>
                    <p>{title}</p>
                    <span className="text-xs font-light">By {owner}</span>
                </div>
                <div className="modifier flex gap-3 cursor-pointer">
                    <button onClick={() => handleEdit(id)} className="text-blue-300"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg></button>
                    <button onClick={() => handleDelete(id)} className="text-red-500 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM4.118 1.5A1.5 1.5 0 0 1 5.5 1h5a1.5 1.5 0 0 1 1.382.5H14a1 1 0 0 1 1 1v1a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5V2.5a1 1 0 0 1 1-1h2.618zM14 4v10.5A1.5 1.5 0 0 1 12.5 16h-9A1.5 1.5 0 0 1 2 14.5V4h12zm-1 0H3v10.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4z" />
                    </svg></button>
                </div>
            </div>
        </>
    )
}