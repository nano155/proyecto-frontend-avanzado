import { Provider } from "react-redux"
import { AppRouter } from "./router/AppRouter"
import { store } from "./store"
import { Canva } from "./background/Canva"


export const ShopApp = () => {
    return (
        <>
            <Provider store={store}>
                <Canva/>
                <AppRouter />
            </Provider>
        </>
    )
}
