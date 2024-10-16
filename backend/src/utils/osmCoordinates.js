import fetch from "node-fetch";

async function getCoordinates(state, city, area) {
  const location = `${area}, ${city}, ${state}`;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`
  );
  const data = await response.json();

  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } else {
    throw new Error(`Coordinates not found for area: ${area}`);
  }
}

function haversineDistance(coords1, coords2) {
  const toRadians = (angle) => (angle * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const latDiff = toRadians(coords2.lat - coords1.lat);
  const lonDiff = toRadians(coords2.lon - coords1.lon);
  const lat1 = toRadians(coords1.lat);
  const lat2 = toRadians(coords2.lat);

  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

export { getCoordinates, haversineDistance };
