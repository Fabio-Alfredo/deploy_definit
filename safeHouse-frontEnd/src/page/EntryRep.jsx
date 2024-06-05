import { Component } from "react";
import Header from "../components/Header";
import TabView from "../components/TabComponents/TabView";

const user = (<p>Hola</p>)

const email = (<p>
    que tal
</p>)

class EntryRep extends Component {

    render() {
        return (
            <div className="min-w-screen min-h-screen">
                <Header />
                <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                    <TabView title={"Registros"}
                        tabs={[
                            { name: "Visitantes", content: user },
                            { name: "Anonimo", content: email }
                        ]} />
                </div>
            </div>
        )
    }
}

export default EntryRep;