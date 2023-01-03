import { Router, Route } from 'electron-router-dom'

import { Blank } from '../screens/Blank'
import { Document } from '../screens/Document'
import { Default } from '../screens/Layouts/Default'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      }
    />
  )
}
