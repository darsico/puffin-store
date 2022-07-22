// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const request = req.body;
  const mercadoPago = require('mercadopago');

  mercadoPago.configure({
    access_token: process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN,
  });

  let baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  let backURL = `${baseURL}/api/feedback`;
  let redirectURL = `${baseURL}/feedback`;

  let preference = {
    items: [],
    back_urls: {
      success: backURL,
      failure: backURL,
      pending: backURL,
    },
    auto_return: 'approved',
    redirect_urls: {
      success: redirectURL,
      failure: redirectURL,
      pending: redirectURL,
    },
  };

  request.map(({ productId, name, price, quantity, color, device }) => {
    preference.items.push({
      id: productId,
      title: name,
      unit_price: Number(price),
      quantity: Number(quantity),
      description: `Color: ${color}, Device: ${device}`,
    });
  });

  mercadoPago.preferences
    .create(preference)
    .then((response) => {
      console.log(response.body, 'response');
      res.status(200).json(response.body);
    })
    .catch((error) => {
      res.json(error);
      console.log(error, 'error');
    });
}
