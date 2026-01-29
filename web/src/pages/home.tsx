import { FilterBar } from "@/components/home/FilterBar";
import { SearchBar } from "@/components/home/SearchBar";
import { useState } from "react";

export default function HomePage() {
  const [city, setCity] = useState("Paris");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-20 bg-background py-4 px-4 shadow-sm space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
        <SearchBar />
        <div className="md:w-auto overflow-hidden">
          <FilterBar city={city} setCity={setCity} date={date} setDate={setDate} />
        </div>
      </div>
    </div>
  );
}
