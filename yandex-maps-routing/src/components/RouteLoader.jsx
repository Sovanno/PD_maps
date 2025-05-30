import { useState } from 'react';

function RouteLoader({ onPointsLoaded }) {
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const points = JSON.parse(e.target.result);
        
        if (!Array.isArray(points)) {
          throw new Error("Данные должны быть массивом");
        }
        
        points.forEach((point, index) => {
          if (!point.address) {
            throw new Error(`Точка ${index + 1} имеет некорректный формат адреса`);
          }

          if (!point.name){
            throw new Error(`Точка ${index + 1} должна имететь поле name`);
          }
        });
        
        onPointsLoaded(points);
        setError(null);
      } catch (err) {
        setError(`Ошибка при обработке файла: ${err.message}`);
        console.error(err);
      }
    };
    
    reader.onerror = () => {
      setError("Ошибка при чтении файла");
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="route-loader">
      <h3>Загрузить маршрут из JSON</h3>
      <p>
        Выберите JSON-файл с точками маршрута в формате:
      </p>
      <pre>
        {`[
  {
    "id": 1,
    "name": "Название точки 1",
    "address": "улица Такая 12"
  }
]`}
      </pre>
      
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default RouteLoader;
