import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { refresh } from '../actions/auth'
import Head from 'next/head'
import Navigation from './Navigation'

const Layout = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fn = async () => {
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        await dispatch(refresh())
      }
    }
    fn()
  }, [dispatch])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navigation />
      <div className="max-w-7xl mx-auto px-8 py-6">{props.children}</div>
    </>
  )
}

export default Layout
