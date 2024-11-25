import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Search from './Search';
import '../styles/components/header.css';
import HeaderAction from './HeaderAction';
import Navigation from './Navigation';
import { YardTypeProvider } from '../context/YardTypeContext';

const Header = () => {
    return (
        <header className="header">
            <div className='header-top'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className='col-md-4 col-12'>
                            <Link to='/'>
                                <div className='logo'>
                                    <img
                                        src='https://img.thegioithethao.vn/media/logo/logo.svg'
                                        alt='Logo Thể Thao'
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className='col-md-4 col-12'>
                            <Search />
                        </div>
                        <div className='col-md-4 col-12'>
                            <HeaderAction />
                        </div>
                    </div>
                </div>
            </div>
            <YardTypeProvider>
                <Navigation />
            </YardTypeProvider>
        </header>
    );
};

export default Header;