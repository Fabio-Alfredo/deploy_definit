import ContainerQr from '../components/QrComponents/ContainerQr';
import Header from '../components/Header';


const GenerateQR = () => {
    return (
        <div className='h-screen'>
            <Header/>
            <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <ContainerQr/>
            </div>
        </div>
    );
};

export default GenerateQR;
