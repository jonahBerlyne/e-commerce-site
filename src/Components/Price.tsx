export default function calculatePriceOf(the) {
 let dollars = Math.round(the.price);
 let cents;
 the.id % 10 === 0 ? cents = ((the.id + 5) / 100) : cents = (((the.id * 3) + 20) / 100);
 let price = dollars + cents;
 return price;
}