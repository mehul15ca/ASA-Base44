import About from './pages/About';
import BookDemo from './pages/BookDemo';
import Coaches from './pages/Coaches';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Portal from './pages/Portal';
import Programs from './pages/Programs';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import AttendancePortal from './pages/AttendancePortal';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "BookDemo": BookDemo,
    "Coaches": Coaches,
    "Contact": Contact,
    "Gallery": Gallery,
    "Home": Home,
    "Portal": Portal,
    "Programs": Programs,
    "Registration": Registration,
    "ForgotPassword": ForgotPassword,
    "AttendancePortal": AttendancePortal,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};