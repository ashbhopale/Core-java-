import { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Car } from "lucide-react";
import { motion } from "framer-motion";

export default function FareCalculator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState(0);
  const [fare, setFare] = useState(0);
  const [vehicleType, setVehicleType] = useState("4-seater");

  const calculateDistance = () => {
    const loader = new Loader({
      apiKey: "AIzaSyDVCneCjU0XDCmpJj01I8I0tGx1_wcq5rE",
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [start],
          destinations: [end],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            const distInMeters = response.rows[0].elements[0].distance.value;
            const distInKm = distInMeters / 1000;
            setDistance(distInKm);
            setFare(distInKm * 12);
          } else {
            alert("Distance calculation failed: " + status);
          }
        }
      );
    });
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-4">
      <h1 className="text-4xl font-bold text-center text-orange-800 mb-6">
        जय भोले Fare Calculator
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-2xl space-y-6">
        <div>
          <label className="text-lg">प्रारंभ ठिकाण:</label>
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="उदाहरण: पुणे स्टेशन"
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="text-lg">शेवटचे ठिकाण:</label>
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="उदाहरण: शिवाजीनगर"
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="text-lg">गाडीचा प्रकार:</label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {["4-seater", "7-seater", "12-seater"].map((type) => (
              <button
                key={type}
                onClick={() => setVehicleType(type)}
                className={
                  vehicleType === type
                    ? "bg-orange-700 text-white p-2 rounded"
                    : "border p-2 rounded"
                }
              >
                <Car className="inline-block mr-1" size={16} /> {type}
              </button>
            ))}
          </div>
        </div>

        <button
          className="w-full bg-orange-700 text-white hover:bg-orange-800 p-2 rounded"
          onClick={calculateDistance}
        >
          भाडा मोजा
        </button>

        <div className="text-center text-xl font-semibold text-orange-900">
          {fare > 0 && (
            <>
              अंदाजे अंतर: {distance.toFixed(2)} किमी <br />
              तुमचा अंदाजे भाडा: ₹{fare.toFixed(0)}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
