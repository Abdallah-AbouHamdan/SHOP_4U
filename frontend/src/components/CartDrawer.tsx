
const currency = new Intl.NumberFormat("en-US",{
  style:"currency",
  currency:"USD",
  maximumFractionDigits:2,
});
type Props= {
  open:boolean;
  onClose:() => void;
};

export default function CartDrawer() {
  return (
    <div>CartDrawer</div>
  )
}
