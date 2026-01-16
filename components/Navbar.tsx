import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import AdminMenu from "./AdminMenu";


export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 glass">
      <div className="container-app flex items-center justify-between py-4">
        <h1 className="text-xl font-bold">
          Prompt<span className="text-indigo-400">Verse</span>
        </h1>

        <div className="flex w-full max-w-xl items-center gap-4">
          <SearchBar />
          <FilterBar />
        </div>

        <AdminMenu />

      </div>
    </div>
  );
}

