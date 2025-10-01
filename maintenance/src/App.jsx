
import Sidebar from './components/Sidebar'
import { AppProvider } from './contexts/Appcontext';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Dashboard, Workorders, WorkOrderDetail } from './pages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex flex-row w-full">
          {/* Sidebar fixed width */}
          <div className="w-64">
            <Sidebar />
          </div>

          {/* Main content grows */}
          <div className="flex-1 overflow-y-auto h-screen">
            <AppProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/work-orders" element={<Workorders />} />
                <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
              </Routes>
            </AppProvider>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;