import { Planet, planets } from "@/utils/planets";
import { Listbox } from "@headlessui/react";

export default function PlanetSelect({
  planet,
  addStop,
  stops,
  label,
}: {
  planet: Planet;
  addStop: (planet: Planet) => void;
  stops: Planet[];
  label: string;
}) {
  return (
    <Listbox as="div" className="relative" onChange={addStop}>
      <Listbox.Button
        className={`border-2 border-violet-500 hover:bg-violet-950 transition-colors hover:text-white px-5 py-3 lg:px-10 lg:py-4 rounded-full appearance-none bg-black w-full lg:w-52 text-center ${
          planet ? "text-white" : "text-neutral-700"
        }`}
      >
        {planet ? planet.name : label}
      </Listbox.Button>
      <Listbox.Options className="absolute w-full border-2 border-violet-500 p-4 rounded-3xl bg-black mt-3 z-40  transition-colors">
        {planets
          .filter((planet) => !stops.includes(planet))
          .map((planet) => {
            return (
              <Listbox.Option
                key={planet.name}
                value={planet}
                className="cursor-pointer hover:text-violet-500 rounded-full"
              >
                {planet.name}
              </Listbox.Option>
            );
          })}
      </Listbox.Options>
    </Listbox>
  );
}
