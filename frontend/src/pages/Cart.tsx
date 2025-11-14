
const currency = new Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD",
    maximumFractionDigits:2,
});

export default function Cart() {
  return (
    <div>Cart</div>
  )
}
