import React from "react";
import { FaCar } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { MdElectricCar } from "react-icons/md";
import { MdElectricalServices } from "react-icons/md";
import { MdElectricMeter } from "react-icons/md";

const EVStats = ({ data }) => {
  const totalVehicles = data.length;

  const totalBEV = data.filter(
    (vehicle) => vehicle["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)"
  ).length;
  const totalPHEV = data.filter(
    (vehicle) => vehicle["Electric Vehicle Type"] === "Plug-in Hybrid Electric Vehicle (PHEV)"
  ).length;

  const totalElectricRange = data.reduce(
    (sum, vehicle) => sum + (vehicle["Electric Range"] ? parseFloat(vehicle["Electric Range"]) : 0),
    0
  );
  const averageElectricRange = totalVehicles > 0 ? (totalElectricRange / totalVehicles).toFixed(2) : 0;

  const eligibleCount = data.filter(
    (vehicle) => vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === "Clean Alternative Fuel Vehicle Eligible"
  ).length;
  const eligiblePercentage = totalVehicles > 0 ? ((eligibleCount / totalVehicles) * 100).toFixed(2) : 0;

  return (
    <div className="flex flex-col md:flex-row justify-around gap-4 text-white">
      <div className="flex-1 relative flex flex-col bg-red-400 p-4 rounded-lg shadow-md justify-between">
        <h3 className="text-sm font-semibold">Total Vehicles</h3>
        <p className="text-2xl">{totalVehicles}+</p>

        <div className="absolute right-4 items-center flex justify-center h-full top-0">
          <FaCar size={30} />
        </div>
      </div>

      <div className="relative flex-1 flex flex-col bg-emerald-400 p-4 rounded-lg shadow-md justify-between">
        <h3 className="text-sm font-semibold">Battery Electric Vehicles (BEV)</h3>
        <p className="text-2xl">{totalBEV}+</p>

        <div className="absolute right-4 items-center flex justify-center h-full top-0">
          <MdElectricBolt size={30} />
        </div>
      </div>

      <div className="relative flex-1 bg-violet-400 p-4 rounded-lg shadow-md justify-between">
        <h3 className="text-sm font-semibold">Plug-in Hybrid Electric Vehicles (PHEV)</h3>
        <p className="text-2xl">{totalPHEV}+</p>

        <div className="absolute right-4 items-center flex justify-center h-full top-0">
          <MdElectricCar size={30} />
        </div>
      </div>

      <div className="relative flex-1 bg-blue-400 p-4 rounded-lg shadow-md justify-between">
        <h3 className="text-sm font-semibold">Average Electric Range</h3>
        <p className="text-2xl">{averageElectricRange} miles</p>

        <div className="absolute right-4 items-center flex justify-center h-full top-0">
          <MdElectricalServices size={30} />
        </div>
      </div>

      <div className="relative flex-1 bg-green-400 p-4 rounded-lg shadow-md justify-between">
        <h3 className="text-sm font-semibold">Eligible CAFV Percentage</h3>
        <p className="text-2xl">{eligiblePercentage}%</p>

        <div className="absolute right-4 items-center flex justify-center h-full top-0">
          <MdElectricMeter size={30} />
        </div>
      </div>
    </div>
  );
};

export default EVStats;
