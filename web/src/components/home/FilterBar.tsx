import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CITIES } from "@/data/city";
import { format, nextSaturday } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Filter, MapPin } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  city: string;
  setCity: (city: string) => void;
}

export function FilterBar({ date, setDate, city, setCity }: FilterBarProps) {
  const [cityOpen, setCityOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const handleCitySelect = (c: string) => {
    setCity(c);
    setCityOpen(false);
  };

  const selectWeekend = () => {
    const nextSat = nextSaturday(new Date());
    setDate(nextSat);
    setDateOpen(false);
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide w-full">
      <Popover open={cityOpen} onOpenChange={setCityOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className={
              "rounded-full h-9 px-4 border-0 gap-2 shrink-0 font-medium transition-colors"
            }
          >
            <MapPin className="w-4 h-4" />
            {city}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <div className="flex flex-col">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => handleCitySelect(c)}
                className={
                  "px-4 py-2 text-sm text-left transition-colors hover:bg-accent hover:text-accent-foreground"
                }
              >
                {c}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className={
              "rounded-full h-9 px-3 border-0 gap-2 shrink-0 font-medium transition-colors"
            }
          >
            <CalendarIcon className={"w-4 h-4"} />
            {date ? format(date, "EEE d MMM", { locale: fr }) : ""}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2 border-b">
            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={selectWeekend}>
              Ce week-end
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              if (d) setDateOpen(false);
            }}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="secondary"
        size="sm"
        className="rounded-full h-9 px-4 border-0 gap-2 shrink-0 font-medium"
      >
        <Filter className="w-4 h-4" />
        Filtres
      </Button>
    </div>
  );
}
