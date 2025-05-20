export async function geocodeAddress(address) {
  const apiKey = '6d5bfb69-89f0-46e7-b335-0ebd68b143d3';
  const url = new URL('https://geocode-maps.yandex.ru/1.x/');
  url.search = new URLSearchParams({
    format: 'json',
    apikey: apiKey,
    geocode: address,
    results: 1,
  }).toString();

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Geocoder error: ${resp.status}`);
  }
  const data = await resp.json();
  const featureMember = data.response.GeoObjectCollection.featureMember;
  if (featureMember.length === 0) {
    throw new Error('Адрес не найден');
  }

  const pos = featureMember[0].GeoObject.Point.pos.split(' ');
  const [lon, lat] = pos.map(Number);
  return [lat, lon];
}
