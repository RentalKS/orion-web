import { ConfigProvider } from "antd";
import Navbar from "../components/Navbar";

function App() {
    return (
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#722ed1",
                    "colorInfo": "#722ed1"
                }
            }}
        >
            <div style={{
                height: '100vh',
                width: '100vw'
            }}>
                <Navbar />
            </div>
        </ConfigProvider>
    )
}

export default App
