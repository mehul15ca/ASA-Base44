import About from './pages/About';
import AdminAttendance from './pages/AdminAttendance';
import AdminBatches from './pages/AdminBatches';
import AdminCoaches from './pages/AdminCoaches';
import AdminDashboard from './pages/AdminDashboard';
import AdminFinance from './pages/AdminFinance';
import AdminGrounds from './pages/AdminGrounds';
import AdminReports from './pages/AdminReports';
import AdminSchedule from './pages/AdminSchedule';
import AdminStudents from './pages/AdminStudents';
import AttendancePortal from './pages/AttendancePortal';
import BookDemo from './pages/BookDemo';
import CoachAttendance from './pages/CoachAttendance';
import CoachDashboard from './pages/CoachDashboard';
import CoachSessions from './pages/CoachSessions';
import Coaches from './pages/Coaches';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Portal from './pages/Portal';
import Programs from './pages/Programs';
import Registration from './pages/Registration';
import StudentDashboard from './pages/StudentDashboard';
import StudentSchedule from './pages/StudentSchedule';
import StudentAttendance from './pages/StudentAttendance';
import StudentEvaluations from './pages/StudentEvaluations';
import StudentInjuries from './pages/StudentInjuries';
import StudentFees from './pages/StudentFees';
import StudentStore from './pages/StudentStore';
import StudentAnnouncements from './pages/StudentAnnouncements';
import StudentProfile from './pages/StudentProfile';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import SuperAdminHealth from './pages/SuperAdminHealth';
import SuperAdminAPI from './pages/SuperAdminAPI';
import CoachStudents from './pages/CoachStudents';
import CoachSalary from './pages/CoachSalary';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminAttendance": AdminAttendance,
    "AdminBatches": AdminBatches,
    "AdminCoaches": AdminCoaches,
    "AdminDashboard": AdminDashboard,
    "AdminFinance": AdminFinance,
    "AdminGrounds": AdminGrounds,
    "AdminReports": AdminReports,
    "AdminSchedule": AdminSchedule,
    "AdminStudents": AdminStudents,
    "AttendancePortal": AttendancePortal,
    "BookDemo": BookDemo,
    "CoachAttendance": CoachAttendance,
    "CoachDashboard": CoachDashboard,
    "CoachSessions": CoachSessions,
    "Coaches": Coaches,
    "Contact": Contact,
    "ForgotPassword": ForgotPassword,
    "Gallery": Gallery,
    "Home": Home,
    "Portal": Portal,
    "Programs": Programs,
    "Registration": Registration,
    "StudentDashboard": StudentDashboard,
    "StudentSchedule": StudentSchedule,
    "StudentAttendance": StudentAttendance,
    "StudentEvaluations": StudentEvaluations,
    "StudentInjuries": StudentInjuries,
    "StudentFees": StudentFees,
    "StudentStore": StudentStore,
    "StudentAnnouncements": StudentAnnouncements,
    "StudentProfile": StudentProfile,
    "SuperAdminDashboard": SuperAdminDashboard,
    "SuperAdminHealth": SuperAdminHealth,
    "SuperAdminAPI": SuperAdminAPI,
    "CoachStudents": CoachStudents,
    "CoachSalary": CoachSalary,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};