/* eslint-disable react/prop-types */
const UserList = ({ users }) => {
    return (
        <ul>
            {users.map((user) => (
                <li className='font-popins pl-7 pt-2 text-lg' key={user.id}>
                    {user.name}
                    <hr className='w-full bg-black  sm:h-1 h-[0%]' />
                </li>
            ))}
        </ul>
    );
}

export default UserList;
