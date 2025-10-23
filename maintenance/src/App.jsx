
import Sidebar from './components/Sidebar'
import { AppProvider } from './contexts/Appcontext';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Dashboard, Workorders, WorkOrderDetail, MachineInventory, MachineDetails} from './pages';
import Topbar from './components/Topbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex flex-col w-full">
          <Topbar />
          <div className="flex flex-row w-full">
            {/* Sidebar fixed width */}
            <div className="w-20 md:w-64">
              <Sidebar />
            </div>

            {/* Main content grows */}
            <div className="flex-1 overflow-y-auto h-screen mt-20">
              <AppProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/work-orders" element={<Workorders />} />
                  <Route
                    path="/work-orders/:id"
                    element={<WorkOrderDetail />}
                  />
                  <Route
                    path="/machine-inventory"
                    element={<MachineInventory />}
                  />
                  <Route path="/machines/:id" element={<MachineDetails />} />
                </Routes>
              </AppProvider>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;