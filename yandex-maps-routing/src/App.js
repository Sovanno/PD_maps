import React, { useState } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';
import MapComponent from './components/MapComponent';
import RouteLoader from './components/RouteLoader';

function App() {
  const [points, setPoints] = useState([]);

  return (
    <YMaps query={{ apikey: '6d5bfb69-89f0-46e7-b335-0ebd68b143d3', load: 'package.full' }}>
      <div className="App">
        <header className="App-header">
          <h1>Построение маршрута на Яндекс Картах</h1>
        </header>

        <main>
          <RouteLoader onPointsLoaded={setPoints} />
          {/* Теперь MapComponent будет внутри <YMaps> */}
          <MapComponent points={points} />
        </main>
      </div>
    </YMaps>
  );
}

export default App;
