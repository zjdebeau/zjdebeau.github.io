const tax_rate = prompt('Enter tax rate (e.g., 0.10 for 10%)', '0.10');
const shipping_threshold = prompt('Enter shipping threshold (e.g., 1000)', '1000');

let subtotal = 0;

for (let i = 0; i < cart.length; i++) {
  let item = cart[i];
  let total = calculateTotal(item.quantity, item.product.price);
  outputCartRow(item, total);
  subtotal += total;
}

const taxRateNum = parseFloat(tax_rate);
const shippingThresholdNum = parseFloat(shipping_threshold);

let tax = subtotal * taxRateNum;
let shipping = subtotal > shippingThresholdNum ? 0 : 40;
let grandTotal = subtotal + tax + shipping;

document.write(`<tr class="totals"><td colspan="4">Subtotal</td><td class="right">$${subtotal.toFixed(2)}</td></tr>`);
document.write(`<tr class="totals"><td colspan="4">Tax (${(taxRateNum * 100).toFixed(0)}%)</td><td class="right">$${tax.toFixed(2)}</td></tr>`);
document.write(`<tr class="totals"><td colspan="4">Shipping</td><td class="right">$${shipping.toFixed(2)}</td></tr>`);
document.write(`<tr class="totals"><td colspan="4" class="focus">Grand Total</td><td class="right focus">$${grandTotal.toFixed(2)}</td></tr>`);
