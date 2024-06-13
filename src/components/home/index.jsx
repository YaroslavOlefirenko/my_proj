import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import CarInfo from '../check/CarInfo';
import { notification } from 'antd';

const Home = () => {
    const { currentUser } = useAuth();
  
    useEffect(() => {
      const firstLogin = localStorage.getItem('firstLogin');
  
      if (currentUser && !firstLogin) {
        notification.success({
          message: 'Авторизовано',
          description: `Hello ${currentUser.displayName || currentUser.email}, you are now logged in.`,
          duration: 2,
        });
        localStorage.setItem('firstLogin', 'true');
      }
    }, [currentUser]);
  
    return (
      <div>
        
        <CarInfo />
      </div>
    );
  };
  
  export default Home;
  