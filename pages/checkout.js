import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { create_checkout } from '../actions/auth'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Loader from 'react-loader-spinner'

const Checkout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const checkout_url = useSelector((state) => state.auth.checkout_url)
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    if (checkout_url) {
      router.push(checkout_url)
    }
  }, [checkout_url])

  const checkoutHandle = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined && user) {
      await dispatch(create_checkout(user.email))
    }
  }

  return (
    <>
      <Head>
        <title>有料会員サイト | お支払い</title>
      </Head>

      <div className="border rounded w-1/3 mx-auto text-center shadow-sm">
        <div className="p-4">
          <h2 className="text-2xl font-medium mb-4">有料会員</h2>
          <div className="text-gray-500 mb-4">有効コンテンツをご利用頂けます。</div>
          <div className="mb-4">
            <span className="text-4xl font-extrabold">1000円</span>
            <span className="font-medium">/月</span>
          </div>

          <div className="flex justify-center">
            {loading ? (
              <Loader type="Oval" color="#F59E00" width={50} height={50} />
            ) : (
              <div className="button-yellow cursor-pointer" onClick={checkoutHandle}>
                お支払い
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
