import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Spin, Descriptions, Carousel, Button, Flex } from 'antd';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      const carDoc = await getDoc(doc(db, 'cars', id));
      if (carDoc.exists()) {
        setCar(carDoc.data());
      }
      setLoading(false);
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!car) {
    return <p>Автомобіль не знайдено</p>;
  }

  return (
    <div style={{ padding: '30px' }}>
    {car.photos && (
      <div style={{ marginBottom: '20px', width: '60%', margin: '0 auto' }}>
        <Carousel autoplay style={{ width: '100%' }}>
          {car.photos.map((photo, index) => (
            <div key={index}>
              <img src={photo} alt={`car-${index}`} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>
      </div>
    )}

      <Descriptions title="Інформація про автомобіль" bordered>
        <Descriptions.Item label="Марка">{car.vendor}</Descriptions.Item>
        <Descriptions.Item label="Модель">{car.model}</Descriptions.Item>
        <Descriptions.Item label="Рік">{car.year}</Descriptions.Item>
        <Descriptions.Item label="Ціна">{car.price} грн</Descriptions.Item>
        <Descriptions.Item label="Коробка передач">{car.transmission}</Descriptions.Item>
        <Descriptions.Item label="Об'єм двигуна">{car.engineCapacity}</Descriptions.Item>
        <Descriptions.Item label="Пробіг">{car.mileage} км</Descriptions.Item>
        <Descriptions.Item label="Регіон">{car.region}</Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: '20px' }}>
        <Descriptions title="Опис" bordered>
          <Descriptions.Item>{car.description}</Descriptions.Item>
        </Descriptions>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Ім'я власника: {car.ownerName}</h3>
        <Button type="primary" href={`tel:${car.phoneNumber}`}>
          Дзвінок {car.phoneNumber}
        </Button>
      </div>
    </div>
  );
};

export default CarDetails;
