import React, { useState } from 'react';
import CarFilters from './FilterBar';
import CarList from './CarsList';
import '../../css/CarListPage.css';

const CarListPage = () => {
  const [filters, setFilters] = useState({ make: '', model: '', year: '', price: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="car-list-page">
      
      <div className="main-content">
        <CarList filters={filters} />
      </div>
    </div>
  );
};

export default CarListPage;
