import Filters from "../components/Filters"
export default function Home() {
  return (
    <div className="bg-[#e1e1e1] pb-16 pt-8 px">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:flex-row">
            <aside className="w-full shrink-0 lg:w-72">
                <Filters />
            </aside>


        </div>
    </div>
  )
}
