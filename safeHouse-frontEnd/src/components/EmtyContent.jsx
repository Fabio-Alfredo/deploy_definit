import { FiAlertCircle } from "react-icons/fi";

const EmptyReport = ({message}) => {
    return(
        <div className="w-full h-72 lg:h-96  sm:my-20 flex flex-col justify-center items-center">
            <FiAlertCircle className="text-gray-400 text-8xl sm:text-9xl text-center pb-8"/>
            <p className="text-gray-400 font-popins text-2xl md:text-4xl xl:text-5xl px-16 lg:px-40 text-center">{message}</p>
        </div>
    )
}

export default EmptyReport;