const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { items, success_url, cancel_url } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: success_url,
        cancel_url: cancel_url,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
