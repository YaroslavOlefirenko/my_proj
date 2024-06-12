import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import MiniCarCard from './MiniCarCard';
import FilterBar from './FilterBar';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = await getDocs(collection(db, 'cars'));
      const carsList = carsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carsList);
      setFilteredCars(carsList);
      setLoading(false);
    };

    const fetchBrandsAndModels = async () => {
      const brandsCollection = await getDocs(collection(db, 'brands'));
      const brandsList = brandsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBrands(brandsList);

      const modelsCollection = await getDocs(collection(db, 'models'));
      const modelsList = modelsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setModels(modelsList);
    };

    fetchCars();
    fetchBrandsAndModels();
  }, []);

  const handleSearch = (value) => {
    const filtered = cars.filter(car => 
      car.vendor.toLowerCase().includes(value.toLowerCase()) || 
      car.model.toLowerCase().includes(value.toLowerCase()) ||
      car.year.toString().includes(value) ||
      car.price.toString().includes(value)
    );
    setFilteredCars(filtered);
  };

  const handleFilterChange = (key, value) => {
    const filtered = cars.filter(car => car[key].toLowerCase() === value.toLowerCase());
    setFilteredCars(filtered);
  };

  return (
    <div style={{ padding: '30px' }}>
      <FilterBar 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange} 
        brands={brands} 
        models={models} 
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredCars.map(car => (
            <Col key={car.id} span={6}>
              <MiniCarCard car={car} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CarList;
