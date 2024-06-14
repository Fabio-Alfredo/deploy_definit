import Navigation from "../Navigation";
import EmptyReport from "../EmptyContent";
import CardReport from "./CardReport";
import { VscGraph } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const TabView = ({ title, reports = {} }) => {

    const nav = useNavigate();

    const handleGraph = () => {
        nav('/graphics');
    }

    return (
        <div className='w-full p-4 absolute sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2'>
            <Navigation title={title} />
            <hr className='h-0.5 bg-black mb-3 mx-4' />
            <div className="flex justify-center">
                < VscGraph className="relative left-[90%] text-5xl rounded-xl p-2 bottom-[6.3rem] cursor-pointer hover:bg-slate-200 hover:-translate-y-1 duration-500" onClick={handleGraph} />
                {Object.keys(reports).length === 0 ?
                    (<EmptyReport message={'No hay entradas que reportar'} />)
                    :
                    (
                        <div className="w-full max-h-fit">
                            <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                                {reports.map((tab, index) => (
                                    <CardReport key={index} name={tab.name} dateVisit={tab.date} hourVisit={tab.hour} />
                                )
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
            <hr className='h-0.5 bg-black mb-8 mx-4' />
        </div>
    )
}

export default TabView;