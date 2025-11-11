import React from 'react'

const currency = new Intl.NumberFormat("en-US", {
    style:"currency",
    currency:"USD",
    maximumFractionDigits: 2,
});
export default function ProductModal() {
  return (
    <div>ProductModal</div>
  )
}
