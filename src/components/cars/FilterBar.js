import React, { useState } from 'react';
import { Row, Col, Select, Input } from 'antd';

const { Option } = Select;

const FilterBar = ({ onFilterChange, brands, models }) => {
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    year: '',
    priceFrom: '',
    priceTo: '',
    mileage: '',
    region: '',
    transmission: ''
  });

  const handleChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Row gutter={16}>
        <Col span={6}>
          <Select
            placeholder="Марка"
            style={{ width: '100%' }}
            onChange={value => handleChange('brand', value)}
          >
            <Option value="">Всі марки</Option>
            {brands.map(brand => (
              <Option key={brand.id} value={brand.name}>{brand.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Модель"
            style={{ width: '100%' }}
            onChange={value => handleChange('model', value)}
          >
            <Option value="">Всі моделі</Option>
            {models.map(model => (
              <Option key={model.id} value={model.model}>{model.model}</Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Рік"
            style={{ width: '100%' }}
            onChange={value => handleChange('year', value)}
          >
            <Option value="">Всі роки</Option>
            {[...new Set(models.map(model => model.year))].map(year => (
              <Option key={year} value={year}>{year}</Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                placeholder="Ціна від"
                style={{ width: '100%' }}
                onChange={e => handleChange('priceFrom', e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder="Ціна до"
                style={{ width: '100%' }}
                onChange={e => handleChange('priceTo', e.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Input
            placeholder="Пробіг до"
            style={{ width: '100%' }}
            onChange={e => handleChange('mileage', e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Регіон"
            style={{ width: '100%' }}
            onChange={e => handleChange('region', e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Коробка передач"
            style={{ width: '100%' }}
            onChange={value => handleChange('transmission', value)}
          >
            <Option value="">Всі типи</Option>
            {[...new Set(models.map(model => model.transmission))].map(transmission => (
              <Option key={transmission} value={transmission}>{transmission}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;
