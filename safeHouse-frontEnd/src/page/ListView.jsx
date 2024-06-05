import Header from "../components/Header";
import ListContainer from "../components/ListViewComponents/ListContainer";
import { Navigation } from "../components/registerComponents";


const ListView = () => {
    return (
        <>
            <Header />
            <div className='bg-color-primary w-full flex-col h-[90vh] flex justify-center items-center'>
                <div className='w-11/12 lg:w-3/4 md:w-3/4 md:h-5/6 xl:w-1/2 bg-white sm:h-3/4 h-[90%] shadow-2xl br-20 p-8  rounded-3xl'>
                    <Navigation title={"Usuarios"} />
                    <div className=" sm:h-3/4 md:h-5/6 h-5/6">
                        <ListContainer />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListView;