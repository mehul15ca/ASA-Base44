import About from './pages/About';
import AdminAttendance from './pages/AdminAttendance';
import AdminBatches from './pages/AdminBatches';
import AdminCoaches from './pages/AdminCoaches';
import AdminDashboard from './pages/AdminDashboard';
import AdminGrounds from './pages/AdminGrounds';
import AdminSchedule from './pages/AdminSchedule';
import AdminStudents from './pages/AdminStudents';
import AttendancePortal from './pages/AttendancePortal';
import BookDemo from './pages/BookDemo';
import Coaches from './pages/Coaches';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Portal from './pages/Portal';
import Programs from './pages/Programs';
import Registration from './pages/Registration';
import AdminReports from './pages/AdminReports';
import AdminFinance from './pages/AdminFinance';
import CoachDashboard from './pages/CoachDashboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminAttendance": AdminAttendance,
    "AdminBatches": AdminBatches,
    "AdminCoaches": AdminCoaches,
    "AdminDashboard": AdminDashboard,
    "AdminGrounds": AdminGrounds,
    "AdminSchedule": AdminSchedule,
    "AdminStudents": AdminStudents,
    "AttendancePortal": AttendancePortal,
    "BookDemo": BookDemo,
    "Coaches": Coaches,
    "Contact": Contact,
    "ForgotPassword": ForgotPassword,
    "Gallery": Gallery,
    "Home": Home,
    "Portal": Portal,
    "Programs": Programs,
    "Registration": Registration,
    "AdminReports": AdminReports,
    "AdminFinance": AdminFinance,
    "CoachDashboard": CoachDashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};