import { useState } from "react";
import Navigation from "../Navigation";

const TabView = ({ title, tabs = {} }) => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const activateTab = (index) => {
        setActiveTabIndex(index);
    }

    return (
        <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2'>
            <Navigation title={title} />
            <div className="body">
                {Object.keys(tabs).length === 0 ?
                    (<div> No tabs </div>)
                    :
                    (
                    <div>
                        <div className="tabs">
                            {tabs.map((tab, index) => (
                                <label
                                key={index}
                                className={index === activeTabIndex ? "active-tab" : "tab"}
                                onClick={()=> activateTab(index)}>
                                    {tab.name}
                                </label>
                                )
                            )}
                        </div>
                        <div> {tabs[activeTabIndex].content} </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default TabView;