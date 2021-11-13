import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detail_checkout } from '../actions/auth'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Result = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const checkout_detail = useSelector((state) => state.auth.checkout_detail)
  const session_id = router.query.session_id

  useEffect(() => {
    const fn = async () => {
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        await dispatch(detail_checkout(session_id))
      }
    }
    if (session_id) {
      fn()
    }
  }, [session_id])

  return (
    <>
      <Head>
        <title>有料会員サイト | お支払い完了</title>
      </Head>

      {session_id && (
        <div className="text-center">
          <div className="text-2xl mb-3">{checkout_detail && checkout_detail.customer.name}様</div>
          <div className="text-3xl">お支払いが完了しました</div>
        </div>
      )}
    </>
  )
}

export default Result
