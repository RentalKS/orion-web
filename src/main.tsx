import { createRoot } from 'react-dom/client'
import App from './app/index.tsx'
import './index.css'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <ReactQueryProvider>
        <App />
    </ReactQueryProvider>
)
