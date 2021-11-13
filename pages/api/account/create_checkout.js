import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body

    try {
      const params = {
        customer_email: email,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_PRICE,
            quantity: 1,
          },
        ],
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout`,
      }

      const checkoutSession = await stripe.checkout.sessions.create(params)

      return res.status(200).json(checkoutSession)
    } catch (err) {
      return res.status(500).json({
        error: 'チェックアウトに失敗しました',
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} now allowed` })
  }
}
