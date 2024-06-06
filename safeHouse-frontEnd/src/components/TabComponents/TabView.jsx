import Navigation from "../Navigation";
import EmptyReport from "../EmptyContent";
import CardReport from "./CardReport";

const TabView = ({ title, reports = {} }) => {

    return (
        <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2'>
            <Navigation title={title} />
            <hr className='h-0.5 bg-black mb-8 mx-4' />
            <div className="flex justify-center">
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