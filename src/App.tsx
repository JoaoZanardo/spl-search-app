import { Route, Routes } from "react-router-dom"
import { SearchCarPage } from "./pages/SeachCar"

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SearchCarPage />} />
        </Routes>
    )
}