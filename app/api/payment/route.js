// import {NextResponse} from 'next/server'
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// export async function POST(req) {
//     const params = {
//         submit_type: 'subscription',
//         payment_method_types: ['card'],
//         line_items: [
//             {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: 'Basic',
//                     },
//                     unit_amount: formatAmountForStripe(1.99),
//                     recurring: {
//                         interval: 'month',
//                         interval_count: 1,
//                     },
//                 },
//                 quantity: 1,
//             },
//             {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: 'Pro',
//                     },
//                     unit_amount: formatAmountForStripe(4.99),
//                     recurring: {
//                         interval: 'month',
//                         interval_count: 1,
//                     },
//                 },
//                 quantity: 1,
//             },
//         ],
//         success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//     }
//     const checkoutSession = await stripe.checkout.sessions.create(params)

//     return NextResponse.json(checkoutSession, {
//         status: 200,
//     })
// }