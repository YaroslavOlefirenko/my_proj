import React, { useState } from 'react';
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
const url = `https://cors-anywhere.herokuapp.com/https://baza-gai.com.ua/api/v1/check/auto/${plateNumber}`;

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
      setCarData(data.result);
    } catch (err) {
      console.error("Error fetching car data:", err);
      setError(`Failed to fetch car data. ${err.message || 'Please try again.'}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '30px' }}>
      <Search
        placeholder="Enter car plate number"
        enterButton="Check"
        size="large"
        onSearch={fetchCarData}
        style={{ marginBottom: '20px' }}
      />
      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" />}
      {carData && (
        <Card title="Car Information" style={{ width: 400, margin: '0 auto' }}>
          <p><strong>Plate Number:</strong> {carData.plate}</p>
          <p><strong>VIN:</strong> {carData.vin}</p>
          <p><strong>Region:</strong> {carData.region.name_ua}</p>
          <p><strong>Vendor:</strong> {carData.vendor}</p>
          <p><strong>Model:</strong> {carData.model}</p>
          <p><strong>Year:</strong> {carData.year}</p>
          <p><strong>Status:</strong> {carData.is_stolen ? 'Stolen' : 'Not Stolen'}</p>
          {carData.photo ? (
            <div>
              <img src={carData.photo_url} alt="Car" style={{ width: '100%', marginTop: '20px' }} />
            </div>
          ) : (
            <p>No photo available</p>
          )}
        </Card>
      )}
    </div>
  );
};

export default CarInfo;
