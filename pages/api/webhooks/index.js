import { buffer } from 'micro'
import Cors from 'micro-cors'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const handleUpdate = async (email, customer_id, created) => {
  const body = JSON.stringify({
    email,
    customer_id,
    created,
  })

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/subscription/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
  } catch (err) {
    console.log(err)
  }
}

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']
    const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    let event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    try {
      if (event.type === 'invoice.payment_succeeded') {
        console.log("invoice.payment_succeeded")
        const data = event.data.object
        const customer_id = data.customer
        const email = data.customer_email
        const created = data.created
        await handleUpdate(email, customer_id, created)
      }
    } catch (error) {
      return res.status(400).send('Webhook error: "Webhook handler failed. View logs."')
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(webhookHandler)
