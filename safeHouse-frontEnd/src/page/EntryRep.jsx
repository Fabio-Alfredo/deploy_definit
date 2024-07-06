import { Component } from "react";
import Header from "../components/Header";
import CardReport from "../components/TabComponents/CardReport";
import TabView from "../components/TabComponents/TabView";
import EmptyReport from "../components/EmptyContent";

const user = (<EmptyReport />)

const email = (<p>
    que tal
</p>)

class EntryRep extends Component {



    render() {
        return (
            <div className="min-w-screen min-h-screen">
                <Header />
                <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                    <TabView title={"Entradas"} />
                </div>
            </div>
        )
    }
}

export default EntryRep;