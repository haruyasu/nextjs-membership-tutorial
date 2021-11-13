import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

export default async (req, res) => {
  if (req.method === 'POST') {
    const { session_id } = req.body

    if (!session_id.startsWith('cs_')) {
      return res.status(401).json({
        error: 'セッションIDがありません',
      })
    }

    try {
      const checkout_session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['customer'],
      })

      return res.status(200).json(checkout_session)
    } catch (err) {
      return res.status(500).json({
        error: 'チェックアウト詳細取得に失敗しました',
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} now allowed` })
  }
}
