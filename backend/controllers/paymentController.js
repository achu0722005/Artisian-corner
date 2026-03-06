import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // amount in dollars

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 5% platform commission
    const platformFee = Math.round(amount * 0.05 * 100) / 100;
    const vendorPayout = Math.round((amount - platformFee) * 100) / 100;

    // Stripe expects amount in cents
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: {
        platformFee: platformFee.toString(),
        vendorPayout: vendorPayout.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      platformFee,
      vendorPayout,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
