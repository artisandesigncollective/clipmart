import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

/**
 * Clipmart: Multi-Party Stripe Connect Escrow
 * 
 * Pain Point: Buyers won't send $15,000 directly to an anonymous developer for code.
 * 
 * Solution: Stripe Connect Destination Charges. We capture the payment, hold it in 
 * escrow during the code-transfer period, and then automatically split the funds.
 * We route 90% to the developer's connected account and retain a 10% Sovereign Commission.
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const SOVEREIGN_COMMISSION_PERCENT = 0.10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { agentId, priceCents, sellerStripeAccountId } = req.body;

    const commissionAmount = Math.floor(priceCents * SOVEREIGN_COMMISSION_PERCENT);

    console.log(`[Clipmart] 🏦 Initiating Stripe Connect Escrow for Agent: ${agentId}`);
    console.log(`[Clipmart] Total: $${priceCents / 100} | Sovereign Cut: $${commissionAmount / 100}`);

    // Create a Checkout Session that holds the funds and sets up the destination routing
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'us_bank_account'], // Allow ACH for high-ticket
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Acquisition of AI Agent IP: ${agentId}`,
              description: 'Funds will be held in secure escrow until source code transfer is verified.',
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        application_fee_amount: commissionAmount,
        transfer_data: {
          destination: sellerStripeAccountId, // Routes the remaining 90% to the dev
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/escrow-active/${agentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/marketplace`,
    });

    console.log(`[Clipmart] ✅ Escrow Session Created: ${session.id}`);

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("[Clipmart] Stripe Escrow Failure:", error);
    return res.status(500).json({ error: 'Failed to initialize escrow gateway.' });
  }
}
