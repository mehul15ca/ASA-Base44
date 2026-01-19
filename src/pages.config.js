import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Coaches from './pages/Coaches';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "Programs": Programs,
    "Coaches": Coaches,
    "Gallery": Gallery,
    "Contact": Contact,
    "Registration": Registration,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};