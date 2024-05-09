import logo from '../assets/logo-b.svg';

const Header = () => {
    return (
        <header className='bg-principalColor  flex justify-center sm:justify-start   '>
            <img className='sm:p-2 pt-5 scale-75 ml-3 ' src={logo}/>
        </header>
    );  
};

export default Header;