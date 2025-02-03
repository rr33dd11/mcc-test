import { createRoot } from 'react-dom/client'
import App from './App/App.tsx'
import {IdProvider} from "./context/IdContext.tsx";

createRoot(document.getElementById('root')!).render(
    <IdProvider>
        <App />
    </IdProvider>
)
