import { registerLicense } from "@syncfusion/ej2-base";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF1cXGdCf1NpRGZGfV5ycEVBal9WTnRdUj0eQnxTdEFjUH5bcX1RRGFVVEZwVw==")

function App() {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}

export default App
