import logo from '../assets/logo-b.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='bg-color-primary flex justify-center sm:justify-start h-[10vh] '>
            <Link to='/home' className='inline-block'>
                <img className='sm:p-2 scale-50 sm:scale-75 ml-3 pt-10' src={logo} />
            </Link>
        </header>

    );
};

export default Header;