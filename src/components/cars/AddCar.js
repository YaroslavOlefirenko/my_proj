import React, { useState, useEffect } from 'react';
import { Input, Button, Form, notification, Upload, Select, Spin, Progress, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';

const { Option } = Select;

const AddCar = () => {
  const [carData, setCarData] = useState({
    plateNumber: '',
    vin: '',
    region: '',
    vendor: '',
    model: '',
    year: '',
    description: '',
    phoneNumber: '',
    price: '',
    engineCapacity: '',
    mileage: '',
    ownerName: '',
    transmission: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsSnapshot = await getDocs(collection(db, 'brands'));
      const brandsList = brandsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBrands(brandsList);
      setLoadingBrands(false);
    };

    fetchBrands();
  }, []);

  const handleBrandChange = async (value) => {
    setCarData(prevData => ({ ...prevData, vendor: value }));
    setLoadingModels(true);
    const modelsQuery = query(collection(db, 'models'), where('brand', '==', value));
    const modelsSnapshot = await getDocs(modelsQuery);
    const modelsList = modelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setModels(modelsList);
    setLoadingModels(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = ({ fileList }) => {
    setFiles(fileList.map(file => file.originFileObj));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const photoUrls = await Promise.all(files.map(file => {
        const storageRef = ref(storage, `cars/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progressValue = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(prevProgress => ({
                ...prevProgress,
                [file.name]: progressValue
              }));
            },
            (error) => {
              console.log(error);
              reject(error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(`File URL: ${url}`); // Додаємо лог для перевірки URL
              resolve(url);
            }
          );
        });
      }));

      console.log(`Photo URLs: ${photoUrls}`); // Додаємо лог для перевірки всіх URL

      const carDataWithCorrectTypes = {
        ...carData,
        year: carData.year !== '' ? carData.year : null,
        price: carData.price !== '' ? parseFloat(carData.price) : null,
        engineCapacity: carData.engineCapacity !== '' ? parseFloat(carData.engineCapacity) : null,
        mileage: carData.mileage !== '' ? parseInt(carData.mileage, 10) : null,
        photos: photoUrls
      };

      await addDoc(collection(db, 'cars'), carDataWithCorrectTypes);
      notification.success({
        message: 'Успіх',
        description: 'Інформацію про автомобіль успішно додано!'
      });
      setCarData({
        plateNumber: '',
        vin: '',
        region: '',
        vendor: '',
        model: '',
        year: '',
        description: '',
        phoneNumber: '',
        price: '',
        engineCapacity: '',
        mileage: '',
        ownerName: '',
        transmission: ''
      });
      setFiles([]);
      setProgress({});
    } catch (error) {
      notification.error({
        message: 'Помилка',
        description: 'Не вдалося додати інформацію про автомобіль.'
      });
      console.error('Error adding document: ', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Державний номер">
              <Input name="plateNumber" value={carData.plateNumber} onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="VIN">
              <Input name="vin" value={carData.vin} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Коробка передач">
              <Input name="transmission" value={carData.transmission} onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Об'єм двигуна">
              <Input name="engineCapacity" value={carData.engineCapacity} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Марка">
              {loadingBrands ? <Spin /> : (
                <Select onChange={handleBrandChange} value={carData.vendor}>
                  {brands.map(brand => (
                    <Option key={brand.id} value={brand.name}>{brand.name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Модель">
              {loadingModels ? <Spin /> : (
                <Select onChange={(value) => setCarData(prevData => ({ ...prevData, model: value }))} value={carData.model}>
                  {models.map(model => (
                    <Option key={model.id} value={model.model}>{model.model}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Рік випуску">
              <Input name="year" value={carData.year} onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Пробіг">
              <Input name="mileage" value={carData.mileage} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ім'я власника">
              <Input name="ownerName" value={carData.ownerName} onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Номер телефону">
              <Input name="phoneNumber" value={carData.phoneNumber} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Регіон">
              <Input name="region" value={carData.region} onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ціна">
              <Input name="price" value={carData.price} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Опис">
          <Input.TextArea name="description" value={carData.description} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Фотографії">
          <Upload multiple beforeUpload={() => false} onChange={handleFileChange} showUploadList={true}>
            <Button icon={<UploadOutlined />}>Обрати фотографії</Button>
          </Upload>
          {files.length > 0 && <p>Обрані файли: {files.map(file => file.name).join(', ')}</p>}
          {Object.keys(progress).length > 0 && 
            Object.keys(progress).map(fileName => (
              <Progress key={fileName} percent={progress[fileName]} />
            ))
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}>
            Додати автомобіль
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
