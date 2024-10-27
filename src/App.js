
import './App.css';
import { CSVDataProvider } from './context/CSVDataContext';
import Dashboard from './components/Dashboard';

// Reference to the CSV file in the public directory
const csvData = "/data/Electric_Vehicle_Population_Data.csv";

function App() {
  return (

    <CSVDataProvider url={csvData}>
      <div className="App">
        <Dashboard />
      </div>
    </CSVDataProvider>
  );
}

export default App;
