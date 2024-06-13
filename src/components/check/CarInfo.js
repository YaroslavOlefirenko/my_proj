import React, { useState, useEffect } from 'react';
import { Input, Card, Spin, Alert } from 'antd';

const { Search } = Input;

const CarInfo = () => {
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '04d91ac79055336ff3e6369ca39b7e16';

  const fetchCarData = async (plateNumber) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://baza-gai.com.ua/nomer/${plateNumber}`;
      const request = await fetch(url, { 
        headers: { 
          "Accept": "application/json", 
          "X-Api-Key": apiKey 
        } 
      });
      if (!request.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await request.json();
      setCarData(data);
    } catch (err) {
      console.error("Error fetching car data:", err);
      setError(`Не вдалося отримати дані про автомобіль. ${err.message || 'Будь ласка, спробуйте ще раз.'}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCarData('KA0007XB');
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <Search
        placeholder="Введіть державний номер автомобіля"
        enterButton="Перевірити"
        size="large"
        onSearch={fetchCarData}
        style={{ marginBottom: '20px' }}
      />
      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" />}
      {carData && (
        <Card title="Інформація про автомобіль" style={{ width: '70%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Державний номер:</strong> {carData.digits}</p>
              <p><strong>VIN:</strong> {carData.vin}</p>
              <p><strong>Регіон:</strong> {carData.region.name_ua}</p>
              <p><strong>Виробник:</strong> {carData.vendor}</p>
              <p><strong>Модель:</strong> {carData.model}</p>
              <p><strong>Рік:</strong> {carData.model_year}</p>
              <p><strong>Статус:</strong> {carData.is_stolen ? 'Викрадено' : 'Не викрадено'}</p>
              {carData.operations && carData.operations.length > 0 && (
                <div>
                  <p><strong>Остання реєстрація:</strong></p>
                  <p><strong>Дата реєстрації:</strong> {carData.operations[0].registered_at}</p>
                  <p><strong>Виробник:</strong> {carData.operations[0].vendor}</p>
                  <p><strong>Модель:</strong> {carData.operations[0].model}</p>
                  <p><strong>Рік випуску:</strong> {carData.operations[0].model_year}</p>
                  <p><strong>Колір:</strong> {carData.operations[0].color.ua}</p>
                  <p><strong>Тип:</strong> {carData.operations[0].kind.ua}</p>
                  <p><strong>Адреса:</strong> {carData.operations[0].address}</p>
                  <p><strong>Об'єм двигуна:</strong> {carData.operations[0].displacement}</p>
                </div>
              )}
            </div>
            {carData.photo_url && (
              <div style={{ textAlign: 'center', alignSelf: 'center' }}>
                <img src={carData.photo_url} alt="Автомобіль" style={{ width: '70%', marginLeft: '150px', marginTop :'10px' }} />
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CarInfo;
