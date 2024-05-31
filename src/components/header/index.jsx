import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
            <Link className='text-lg font-bold text-blue-800' to="/home">CarCheck </Link>
            {userLoggedIn ? (
                <>
                    <Link className='text-sm text-blue-600' to='/cars'>Перегляд Автомобілів</Link>
                    <Link className='text-sm text-blue-600' to='/add-car'>Додати Автомобіль</Link>
                    <Link className='text-sm text-blue-600' to='/car-check'>Перевірка Автомобілів</Link>
                    <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
                </>
            ) : (
                <>
                    <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                    <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                </>
            )}
        </nav>
    )
}

export default Header