import Navigation from "../Navigation";
import EmptyReport from "../EmptyContent";
import CardReport from "./CardReport";
import { VscGraph } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetEntrys } from "../../service/RequestService";
import Swal from "sweetalert2";

const TabView = ({ title, reports = [] }) => {
    const [entrys, setEntrys] = useState([]);


    const nav = useNavigate();

    const handleGraph = () => {
        nav('/graphics');
    }
    useEffect(() => {
        try {
            const getEntrys = async () => {
                const response = await GetEntrys();
                setEntrys(response.data);
            }
            getEntrys();
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: `${e.data}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }, [])

    return (
        <div className='w-full p-4 absolute sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2'>
            <Navigation title={title} className='bg-slate-500' />
            <hr className='h-0.5 bg-black mx-4' />
            < VscGraph className="relative left-[80%] md:left-[87%] text-4xl rounded-sm p-1 bottom-[3rem] md:bottom-[5.3rem] cursor-pointer hover:bg-slate-200 hover:-translate-y-1 duration-500" onClick={handleGraph} />
            <div className="flex justify-center">
                {Object.keys(entrys).length === 0 ?
                    (<EmptyReport message={'No hay entradas que reportar'} />)
                    :
                    (
                        <div className="w-full max-h-fit">
                            <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>

                                {entrys.map((entry, index) => (
                                    <CardReport key={index} name={entry.visitor.name} dateVisit={entry.usedAt} />
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