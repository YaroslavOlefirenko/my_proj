import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const { Header: AntHeader } = Layout;

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
  
    const handleLogout = async () => {
      try {
        await doSignOut();
        navigate('/login');
      } catch (error) {
        console.error('Error logging out: ', error);
      }
    };
  
    return (
      <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/home" style={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold', marginRight: '20px' }}>
            CarCheck
          </Link>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="cars">
              <Link to="/cars">Перегляд Автомобілів</Link>
            </Menu.Item>
            <Menu.Item key="add-car">
              <Link to="/add-car">Додати Автомобіль</Link>
            </Menu.Item>
            <Menu.Item key="car-check">
              <Link to="/car-check">Перевірка Автомобілів</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          {userLoggedIn ? (
            <Button type="primary" onClick={handleLogout} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button type="link">Login</Button>
              </Link>
              <Link to="/register">
                <Button type="link">Register New Account</Button>
              </Link>
            </>
          )}
        </div>
      </AntHeader>
    );
  };
  
  export default Header;
  