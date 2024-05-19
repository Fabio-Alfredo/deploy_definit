import logo from '../assets/logo-b.svg';

const Header = () => {
    return (
        <header className='bg-principalColor flex justify-center sm:justify-start h-[10vh] '>
            <img className='sm:p-2 sm:scale-75 ml-3 pt-10' src={logo}/>    
        </header>
        
    );  
};

export default Header;