import About from './pages/About';
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
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
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
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};