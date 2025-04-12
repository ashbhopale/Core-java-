// FareCalculator.js import { useState } from 'react';

export default function FareCalculator() { const [startLocation, setStartLocation] = useState(''); const [endLocation, setEndLocation] = useState(''); const [vehicleType, setVehicleType] = useState(null); const [fare, setFare] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState('');

const ratePerKm = 12;

const vehicleTypes = { 4: '4-seater', 7: '7-seater', 12: '12-seater' };

const getCoordinates = async (place) => { const response = await fetch(https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}); const data = await response.json(); if (data && data.length > 0) { return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }; } else { throw new Error(स्थान सापडले नाही: ${place}); } };

const calculateDistance = (coord1, coord2) => { const R = 6371; // Earth radius in km const dLat = (coord2.lat - coord1.lat) * Math.PI / 180; const dLon = (coord2.lon - coord1.lon) * Math.PI / 180; const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2); const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); return R * c; // Distance in km };

const handleCalculate = async () => { setFare(null); setError(''); setLoading(true); try { const coord1 = await getCoordinates(startLocation); const coord2 = await getCoordinates(endLocation); const distance = calculateDistance(coord1, coord2); const totalFare = Math.round(distance * ratePerKm); setFare(totalFare); } catch (err) { setError(err.message); } setLoading(false); };

return ( <div className="max-w-md mx-auto p-4 space-y-4"> <h1 className="text-2xl font-bold text-center">जय भोले Fare Calculator</h1>

<div>
    <label>प्रारंभ ठिकाण:</label>
    <input
      type="text"
      value={startLocation}
      onChange={(e) => setStartLocation(e.target.value)}
      className="w-full p-2 border rounded"
      placeholder="उदाहरण: पुणे स्टेशन"
    />
  </div>

  <div>
    <label>शेवटचे ठिकाण:</label>
    <input
      type="text"
      value={endLocation}
      onChange={(e) => setEndLocation(e.target.value)}
      className="w-full p-2 border rounded"
      placeholder="उदाहरण: शिवाजीनगर"
    />
  </div>

  <div>
    <label>गाडीचा प्रकार:</label>
    <div className="flex space-x-2 mt-2">
      {Object.entries(vehicleTypes).map(([seats, label]) => (
        <button
          key={seats}
          className={`px-3 py-1 border rounded ${vehicleType === seats ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setVehicleType(seats)}
        >
          {label}
        </button>
      ))}
    </div>
  </div>

  <button
    onClick={handleCalculate}
    className="bg-green-600 text-white px-4 py-2 rounded shadow"
  >
    भाडा मोजा
  </button>

  {loading && <p>थांबा... गणना होते आहे</p>}
  {fare !== null && <p className="text-xl font-semibold">एकूण भाडा: ₹{fare}</p>}
  {error && <p className="text-red-600">त्रुटी: {error}</p>}
</div>

); }

   
