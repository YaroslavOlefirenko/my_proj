import React from 'react';
import { Input, Select, Row, Col } from 'antd';

const { Search } = Input;
const { Option } = Select;

const FilterBar = ({ onSearch, onFilterChange, brands = [], models = [] }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Search placeholder="Шукати авто..." enterButton="Пошук" onSearch={onSearch} />
        </Col>
        <Col span={8}>
          <Select placeholder="Виберіть марку" style={{ width: '100%' }} onChange={(value) => onFilterChange('vendor', value)}>
            {brands.length > 0 ? brands.map(brand => (
              <Option key={brand.id} value={brand.name}>{brand.name}</Option>
            )) : null}
          </Select>
        </Col>
        <Col span={8}>
          <Select placeholder="Виберіть модель" style={{ width: '100%' }} onChange={(value) => onFilterChange('model', value)}>
            {models.length > 0 ? models.map(model => (
              <Option key={model.id} value={model.model}>{model.model}</Option>
            )) : null}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;
