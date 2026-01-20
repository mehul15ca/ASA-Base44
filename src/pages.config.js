import About from './pages/About';
import Coaches from './pages/Coaches';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Registration from './pages/Registration';
import BookDemo from './pages/BookDemo';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Coaches": Coaches,
    "Contact": Contact,
    "Gallery": Gallery,
    "Home": Home,
    "Programs": Programs,
    "Registration": Registration,
    "BookDemo": BookDemo,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};