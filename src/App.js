import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'


function App() {

  // useEffect(() => {
  //   fetchApi()
  // }, [])
  // const REACT_API_URI_BACKEND = 'http://localhost:3001/api' || process.env.REACT_API_URI_BACKEND
  const fetchApi = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/get-all`)
    return res.data
  }
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  console.log('query = ', query)
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {

            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App