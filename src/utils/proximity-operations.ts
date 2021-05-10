// import { haversineDistance } from 'haversine-distance'
export function calculateViewBox(lon: number, lat: number, radius: number): {
    minLat: number,
    maxLat: number,
    minLon: number,
    maxLon: number
} {
    const KmInOneLongitude = 111.320 * Math.cos(lat / 180.0 * Math.PI);
    const deltaLat = radius / 111.1;
    const deltaLong = radius / KmInOneLongitude;
    const minLat = lat - deltaLat;
    const maxLat = lat + deltaLat;
    const minLon = lon - deltaLong;
    const maxLon = lon + deltaLong;
    return {
        minLat, maxLat, minLon, maxLon
    }
}