import { useRef, useState } from "react";
import { Input } from "./Input";
import { useForm } from "../../hooks";
import { useProductStore } from "../../hooks/useProductStore";


const formData = {
    title: '',
    description: '',
    code: '',
    price: '',
    status: false,
    stock: '',
    category: ''
};

const formValidations = {
    title: [((value) => value.length > 5), 'title is required'],
    description: [((value) => value.length > 5), 'description is required'],
    code: [((value) => value.length > 3), 'code is required'],
    price: [((value) => value.length > 0), 'Price is required'],
    stock: [((value) => value.length > 0), 'stock is required'],
    category: [
        ((value) => value.length > 0), 'category is required',
        ((value) => ['computadoras', 'accesorios', 'electrodomesticos', 'televisores', 'telefonos'].includes(value)), 'Invalid category'
    ],
    status: [((value) => typeof value === 'boolean'), 'status must be a boolean'] // Validación para el nuevo campo
};

export const CreateProduct = ({setCreateP}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false)
    const { createProduct } = useProductStore()
    const { title, description, code, price, status, stock, category, onChange, onReset, formState, titleValid, descriptionValid, codeValid, priceValid, statusValid, stockValid, categoryValid, validForm } = useForm(formData, formValidations);

    const inputFileRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validForm) return setFormSubmitted(true)
        await createProduct(formState, selectedFiles)
        setSelectedFiles([])
        setCreateP()
        onReset()
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col items-center p-2">
                <h2 className="text-2xl text-white mb-4">Crea un producto</h2>
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-2 bg">
                    <Input onChange={onChange} nameV={title} name={'title'} type={'text'} />
                    <span className={`text-sm text-error ${!!titleValid && formSubmitted ? 'visible' : 'hidden'} font-bold`} >{titleValid}*</span>
                    <Input onChange={onChange} nameV={description} name={'description'} type={'text'} />
                    <span className={`text-sm text-error ${!!descriptionValid && formSubmitted ? 'visible' : 'hidden'} font-bold`} >{descriptionValid}*</span>
                    <Input onChange={onChange} nameV={code} name={'code'} type={'text'} />
                    <span className={`text-sm text-error ${!!codeValid && formSubmitted ? 'visible' : 'hidden'} font-bold`} >{codeValid}*</span>
                    <Input onChange={onChange} nameV={price} name={'price'} type={'number'} />
                    <span className={`text-sm text-error ${!!priceValid && formSubmitted ? 'visible' : 'hidden'} font-bold`} >{priceValid}*</span>
                    <Input onChange={onChange} nameV={stock} name={'stock'} type={'number'} />
                    <span className={`text-sm text-error ${!!stockValid && formSubmitted ? 'visible' : 'hidden'} font-bold`} >{stockValid}*</span>
                    <select value={category}
                        onChange={onChange}
                        name="category"
                        className="p-1 bg-transparent focus:outline-none focus:bg-purple-heart-800 focus:bg-opacity-60 placeholder:text-purple-heart-200 border-b-2 border-purple-heart-300 text-purple-heart-100 text-xs font-normal rounded-xl bg-purple-heart-200 bg-opacity-20"
                    >
                        <option value="" disabled hidden>Categoria</option>
                        <option value="computadoras">Computadoras</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="electrodomesticos">Electrodomesticos</option>
                        <option value="televisores">Televisores</option>
                        <option value="telefonos">Telefonos</option>
                    </select>
                    <span className={`text-sm text-error ${!!categoryValid && formSubmitted ? 'visible' : 'hidden'} font-bold`} >{categoryValid}*</span>
                    <button
                        onClick={() => inputFileRef.current.click()}
                        type="button"
                        className="text-left p-1 bg-transparent focus:outline-none focus:bg-purple-heart-800 focus:bg-opacity-60 placeholder:text-purple-heart-200 border-b-2 border-purple-heart-300 text-purple-heart-100 text-xs font-normal rounded-xl  bg-purple-heart-200 bg-opacity-20"
                    >
                        Thumbnails
                    </button>
                    <input
                        hidden
                        type="file"
                        ref={inputFileRef}
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="status"
                            checked={status}
                            onChange={(e) => onChange({ target: { name: 'status', value: e.target.checked } })}
                            className="mr-2"
                        />
                        <label htmlFor="isActive" className="text-purple-heart-100 text-xs">Status</label>
                    </div>
                    <span className={`text-sm text-error ${!!statusValid && formSubmitted ? 'visible' : 'hidden'} font-bold`} >{statusValid}*</span>

                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex flex-col gap-2 mt-2">
                            {selectedFiles.map(file => (
                                <div key={file.name} className="file-item flex justify-between items-center p-1 bg-purple-heart-800 text-purple-heart-100 text-xs rounded-lg">
                                    <span>{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(file.name)}
                                        className="button-remove flex items-center text-red-500"
                                        style={{ marginLeft: '8px', padding: '2px 8px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM4.118 1.5A1.5 1.5 0 0 1 5.5 1h5a1.5 1.5 0 0 1 1.382.5H14a1 1 0 0 1 1 1v1a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5V2.5a1 1 0 0 1 1-1h2.618zM14 4v10.5A1.5 1.5 0 0 1 12.5 16h-9A1.5 1.5 0 0 1 2 14.5V4h12zm-1 0H3v10.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="bg-purple-heart-500 text-purple-200 rounded-lg py-1 px-3 mt-2">Crear</button>
                </form>
            </div>
        </div>
    );
}
