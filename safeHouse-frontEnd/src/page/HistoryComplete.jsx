import Header from '../components/Header';
import ContainerHistory from '../components/requestComponents/ContainerHistory';

const HistoryComplete = () => {
    
    return(
        <div className='h-screen'>
        <Header />
        <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
            <ContainerHistory/>
        </div>
    </div>
    );
};

export default HistoryComplete;