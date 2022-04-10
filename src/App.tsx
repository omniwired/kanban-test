import {DataProvider} from "./data/DataProvider";
import Board from "./components/Board";
import TopBar from "./components/layout/Top/TopBar";

const App = () => {

    return (
        <DataProvider>
            <div className="container mx-auto">
                <TopBar/>
                <Board/>
            </div>
        </DataProvider>
    )
}

export default App;