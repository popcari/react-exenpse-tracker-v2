import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./index.css"

import { store } from "./store.js"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"

import App from "./App"
import Start from "./views/Start"
import NotFound from "./views/404.jsx"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<Toaster />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Start />} />
					<Route path='app/*' element={<App />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>,
)
