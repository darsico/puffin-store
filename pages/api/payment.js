// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(req.body);
  const request = req.body;
  const { order, payer, payerEmail } = request;

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
    statement_descriptor: 'Puffin Case',
    // shipments: {
    //   cost: order.deliveryPrice,
    //   mode: 'not_specified',
    // },
    // payer: {
    //   name: payer.name,
    //   surname: payer.surname,
    //   email: payerEmail,
    //   phone: {
    //     area_code: Number(payer.area_code),
    //     number: Number(payer.number),
    //   },
    //   address: {
    //     street_name: payer.address,
    //   },
    // },
  };

  order.products.map(({ productId, name, price, quantity, color, device }) => {
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
