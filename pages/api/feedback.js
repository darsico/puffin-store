export default function handler(req, res) {
  console.log(req.previewData, 'res feedback');
  console.log(req.preview, 'res feedback');
  console.log(req.query, 'res feedback');
  res.json({
    payment: req.query.payment_id,
    status: 'approved',
    merchantOrder: req.query.merchant_order_id,
  });
}
