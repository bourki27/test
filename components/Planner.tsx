"use client";
import { useEffect, useState } from "react";
import PlanetSelect from "@/components/PlanetSelect";
import DatePicker from "@/components/DatePicker";
import { type Planet } from "@/utils/planets";

function Planner({ content }: { content: any }) {
  const [stops, setStops] = useState<Planet[]>([]);
  const [date, setDate] = useState<Date | null>(new Date());
  const [distance, setDistance] = useState<number>();

  const setFrom = (planet: Planet) => {
    const planets = [...stops];
    planets[0] = planet;
    setStops(planets);
  };

  const setTo = (planet: Planet) => {
    const planets = [...stops];
    planets[1] = planet;
    setStops(planets);
  };

  useEffect(() => {
    if (stops.length == 2 && date)
      fetch(
        `/api?from=${stops[0].name}&to=${stops[1].name}&date=${date?.getTime()}`
      )
        .then((res) => res.json())
        .then((json) => {
          setDistance(json.distance);
        });
  }, [stops, date]);

  return (
    <>
      <div className="bg-gradient-to-b from-black to-violet-950 text-center ">
        <div className="bg-gradient-to-tr from-pink-950 via-violet-950 to-transparent absolute bottom-0 left-0 w-full h-full"></div>
        <div className="bg-gradient-to-tl from-pink-950 via-violet-950 to-transparent absolute bottom-0 right-0 w-full h-full"></div>
        <div className="bg-gradient-to-b from-black via-black to-transprent w-full h-full absolute "></div>
        <div className="min-h-screen  text-white relative  px-10 xl:px-24 bg-gradient-to-r from-transparent via-black to-transparent z-20 flex flex-col justify-center">
          <div className="mt-10  mx-auto  flex flex-col lg:flex-row lg:items-center  gap-y-6">
            <span className="px-3">{content.leaving}</span>
            <PlanetSelect
              planet={stops[0]}
              label={content.departure}
              addStop={setFrom}
              stops={stops}
            />
            <span className="px-3">{content.going}</span>
            <PlanetSelect
              planet={stops[1]}
              label={content.destination}
              addStop={setTo}
              stops={stops}
            />
            <span className="px-3"> {content.on} </span>
            <DatePicker
              date={date}
              setDate={setDate}
              label={content.datepicker}
            />
          </div>
        </div>
      </div>
      {distance && (
        <div className="fixed bottom-0 text-center w-full left-0 flex z-20 px-5">
          <div
            className={`mx-auto lg:min-w-96 border-t-2 border-x-2 bg-black ${
              distance <= 200000
                ? `border-lime-500 text-lime-500`
                : `border-red-400 text-red-400`
            } rounded-t-3xl z-50 p-5`}
          >
            {distance}km
            <span className="text-lg lg:text-2xl block uppercase font-bold tracking-widest my-3">
              {distance <= 200000 && content.success}
              {distance > 200000 && content.failure}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Planner;
