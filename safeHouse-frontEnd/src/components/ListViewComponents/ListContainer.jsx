import { useState, useEffect } from 'react';
import fetchUsers from '../../service/fetchUsers';
import VisitorsList from '../adminHousesComponents/VisitorsList';
import TabOpt from './TabOpt';
import { GetUsersInfo } from '../../service/UserService';
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from 'sweetalert2'


const ListContainer = () => {
    const [users, setUser] = useState([]);
    const [toggle, setToggle] = useState(1);

    const resetScroll = () => {
        const scrollContainer = document.getElementById('scroll-container');
        scrollContainer.scrollTop = 0;
    };

    useEffect(() => {
        resetScroll();
    }, [toggle]);

    useEffect(() => {
        const getUser = async () => {
            const res = await GetUsersInfo();
            setUser(res.data);
        };

        getUser();
    }, []);

    const handdleDelete = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }


    return (
        <div className="flex flex-col justify-center h-fit ">
            <div className="list-header">
                <TabOpt toggle={toggle} setToggle={setToggle} />
            </div>

            <div className="overflow-y-auto min-h-[50vh] max-h-[50vh] sn:mx-3 " id="scroll-container">
                {toggle === 1 && (
                    <div id="visitors">
                        {users.filter(user => user.roles.map(r => r.id).includes("VIST")).map((user) => (
                            <VisitorsList key={user.id} user={user} >
                                <Link to='/assingrole' state={user}>
                                    <div className='flex items-center cursor-pointer sm:pr-3'>
                                        <p className='flex font-xs font-popins font-xs '> Editar  </p>
                                        <IoMdSettings className='text-3xl pl-2 ' />
                                    </div>
                                </Link>
                            </VisitorsList>
                        ))}
                    </div>
                )}
                {toggle === 2 && (
                    <div id="employees">
                        {users.filter(user => user.roles.map(r => r.id).includes("EMPL")).map((user) => (
                            <VisitorsList key={user.id} user={user} >
                                <div onClick={handdleDelete} className='flex items-center   sm:pr-3 cursor-pointer'>
                                    <p className='flex font-xs font-popins font-xs '> Eliminar  </p>
                                    <AiTwotoneDelete className='text-3xl pl-2 ' />
                                </div>
                            </VisitorsList>
                        ))}
                    </div>
                )}
                {toggle === 3 && (
                    <div id="residents">
                        {
                            users.filter(user => user.roles.map(r => r.id).includes("RESD", "RSAD")).map((user) => (
                                <VisitorsList key={user.id} user={user} >
                                    <div onClick={handdleDelete} className='flex items-center   sm:pr-3 cursor-pointer'>
                                        <p className='flex font-xs font-popins font-xs '> Eliminar  </p>
                                        <AiTwotoneDelete className='text-3xl pl-2 ' />
                                    </div>
                                </VisitorsList>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListContainer;
