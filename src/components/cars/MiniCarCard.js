import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const MiniCarCard = ({ car }) => {
  const { id, vendor, model, year, price, photos } = car;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${id}`);
  };

  return (
    <Card
      hoverable
      style={{ width: 240, margin: '10px' }}
      cover={<img alt="car" src={photos[0]} />}
      onClick={handleCardClick}
    >
      <Meta title={`${vendor} ${model}`} description={`Рік: ${year} | Ціна: ${price} грн`} />
    </Card>
  );
};

export default MiniCarCard;
