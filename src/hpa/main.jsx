import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { installLinkInterceptor, migrateHashUrl } from './router.js'
import { installTracking } from './track.js'
import './index.css'
import './hero.css'
import './products.css'
import './about.css'
import './about-page.css'
import './brands.css'
import './shop.css'
import './sand.css'
import './theme.css'
import './polish.css'

migrateHashUrl()
installLinkInterceptor()
installTracking()
createRoot(document.getElementById('root')).render(<App />)
