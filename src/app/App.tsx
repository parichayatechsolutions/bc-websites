// src/app/App.tsx
// Demo mode: "/" lists every boutique, "/<slug>" and "/<slug>/about" etc. show one.
// Single-boutique mode (VITE_TENANT=<slug>): "/" is that boutique's site, used
// when building a signed boutique for its own domain.

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BoutiqueIndex from './BoutiqueIndex'
import BoutiquePage from './BoutiquePage'

const tenant = import.meta.env.VITE_TENANT as string | undefined

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {tenant ? (
          <Route path="*" element={<BoutiquePage slug={tenant} />} />
        ) : (
          <>
            <Route path="/" element={<BoutiqueIndex />} />
            <Route path="/:slug/*" element={<BoutiquePage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}
