import Navbar from "../components/Navbar/navbar";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";

function App() {
    return (
        <AppProvider>
            <Navbar />
            <AppRouter />
        </AppProvider>
    )
}

export default App
