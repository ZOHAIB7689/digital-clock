"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export default function DigitalClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, set24Hour] = useState<boolean>(false);
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!isMounted) return "";
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");

    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, isMounted]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-8 shadow-lg rounded-2xl ">
        <div className="flex flex-col items-center justify-center" >
            <div className="text-2xl font-bold tracking-tight">
                Digital Clock
            </div>
            <div className="text-sm text-gray-500 mb-4" >
                Display current time in hours, minutes , and seconds
            </div>
            <div className="text-6xl font-bold tracking-tight">{formattedTime}</div>
            <div className="mt-4 flex items-center">
                <Button
                variant={is24Hour? "default" : "outline"}
                onClick={()=>set24Hour(true)}
                className="mr-2 font-bold"
                >24-Hour Format</Button>
                 <Button
            variant={!is24Hour ? "default" : "outline"}
            onClick={() => set24Hour(false)}
            className="mr-2 font-bold"
          >
            12-Hour Format
          </Button>
     
            </div>
        </div>

      </Card>
    </div>
  );
}