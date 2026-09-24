// src/app/App.tsx
// Demo mode:
//   /                      every boutique, filtered by state, city, pincode, area
//   /<slug>/designs        that boutique in each of our designs, as cards
//   /<slug>/d/<design>     that boutique in one design — the link we send them
//   /<slug>                the same site in the design settled for them
// Single-boutique mode (VITE_TENANT=<slug>): "/" is that boutique's site, used
// when building a signed boutique for its own domain.

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BoutiquePage from './BoutiquePage'
import DesignChooser from './DesignChooser'
import Directory from './Directory'

const tenant = import.meta.env.VITE_TENANT as string | undefined

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {tenant ? (
          <Route path="*" element={<BoutiquePage slug={tenant} />} />
        ) : (
          <>
            <Route path="/" element={<Directory />} />
            <Route path="/:slug/designs" element={<DesignChooser />} />
            <Route path="/:slug/d/:design/*" element={<BoutiquePage />} />
            <Route path="/:slug/*" element={<BoutiquePage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}
