import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/footer.css';
import { FaFacebook, FaInstagram, FaMailBulk, FaMailchimp, FaPhoneAlt, FaPhoneSlash, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { RiTiktokFill } from 'react-icons/ri';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import PropTypes from 'prop-types';
import { FaMapLocation } from 'react-icons/fa6';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Footer = () => {
    const footerLinks = [
        {
            title: 'Chính sách',
            links: [
                { text: 'Chính sách bảo mật', to: '/' },
                { text: 'Điều khoản sử dụng', to: '/' },
                { text: 'Hướng dẫn đổi trả', to: '/' },
                { text: 'Cam kết chất lượng', to: '/' },
                { text: 'Giao hàng & nhận hàng', to: '/' },
                { text: 'Đặt hàng & thanh toán', to: '/' },
                { text: 'Tuyển dụng', to: '/' },
            ],
        },
        {
            title: 'Hỗ trợ',
            links: [
                { text: 'Giới thiệu', to: '/' },
                { text: 'Liên hệ', to: '/' },
            ],
        },
        {
            title: 'Thông tin',
            links: [
                { text: 'Hợp tác', to: '/' },
                { text: 'Thiết kế & thi công', to: '/' },
                { text: 'Đầu tư và kinh doanh', to: '/' },
                { text: 'Tư vấn', to: '/' },
                { text: 'Luật thi đấu', to: '/' },
                { text: 'Luyện tập', to: '/' },
                { text: 'Sự kiện', to: '/' },
            ],
        },
        {
            title: 'Hợp tác',
            links: [
                { text: 'Hợp tác với nhà thầu', to: '/' },
                { text: 'Hợp tác các cụm thể thao', to: '/' },
                { text: 'Hợp tác các shop thể thao', to: '/' },
                { text: 'Hợp tác với các vận động viên', to: '/' },
                { text: 'Hợp tác với các giải đấu', to: '/' },
                { text: 'Hợp tác với các trường học', to: '/' },
                { text: 'Hợp tác với các hãng thể thao', to: '/' },
            ],
        },
    ];

    const socialLinks = [
        { icon: <FaFacebook size={25} />, to: '/' },
        { icon: <FaInstagram size={25} />, to: '/' },
        { icon: <FaTwitter size={25} />, to: '/' },
        { icon: <FaYoutube size={25} />, to: '/' },
        { icon: <BsFillChatDotsFill size={25} />, to: '/' },
        { icon: <TiTick size={25} />, to: '/' },
        { icon: <RiTiktokFill size={25} />, to: '/' },
    ];

    const contactAddress = [
        {
            area: 'Hà Nội',
            address: 'Số 56 Đăng Thùy Trâm - Dịch vọng - Cầu Giấy - Hà Nội',
            link: '',
            numberPhone: '0904.79.5885',
            mail: 'thongtindaotao@sgu.edu.vn',
            hotline: '0904.79.5885',
        },
        {
            area: 'Hồ Chí Minh',
            address: 'Số 57 Đăng Thùy Trâm - Dịch vọng - Cầu Giấy - Hà Nội',
            link: '',
            numberPhone: '0904.79.5885',
            mail: 'thongtindaotao@sgu.edu.vn',
            hotline: '0904.79.5885',
        },
        {
            area: 'Đà Nẵng',
            address: 'Số 58 Đăng Thùy Trâm - Dịch vọng - Cầu Giấy - Hà Nội',
            link: '',
            numberPhone: '0904.79.5885',
            mail: 'thongtindaotao@sgu.edu.vn',
            hotline: '0904.79.5885',
        },
        {
            area: 'Hải Dương',
            address: 'Số 59 Đăng Thùy Trâm - Dịch vọng - Cầu Giấy - Hà Nội',
            link: '',
            numberPhone: '0904.79.5885',
            mail: 'thongtindaotao@sgu.edu.vn',
            hotline: '0904.79.5885',
        },
        {
            area: 'Vũng Tàu',
            address: 'Số 59 Đăng Thùy Trâm - Dịch vọng - Cầu Giấy - Hà Nội',
            link: '',
            numberPhone: '0904.79.5885',
            mail: 'thongtindaotao@sgu.edu.vn',
            hotline: '0904.79.5885',
        }
    ]

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <footer style={{marginTop: '150px'}}>
            <div className='footer-contact bg-white'>
                <div className='form-contact' style={{ background: '#E21F1D' }}>
                    <h3 className='text-center text-white'>Bạn cần tư vấn xây dựng, bảo trì sân thi đấu hãy để lại thông tin</h3>
                    <div>
                        <form className='form-submit'>
                            <input name='phone' type='text' placeholder='Nhập số điện thoại...'/>
                            <Button variant="contained" type="submit">Gửi</Button>
                        </form>
                    </div>
                </div>
                <div className='container'>
                    <div className='row pb-2' style={{ paddingTop: '150px' }}>
                        <div className='d-flex'>
                            <div className='col-md-6 col-12'>
                                <div className='tab-office'>
                                    <h3>Kết nối với chúng tôi</h3>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }} // Thay đổi chiều cao ở đây
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            {
                                                contactAddress.map((item, index) => (
                                                    <Tab label={item.area} {...a11yProps(index)} key={index} />
                                                ))
                                            }
                                        </Tabs>
                                        <Box sx={{ flexGrow: 1 }}>
                                            {
                                                contactAddress.map((item, index) => (
                                                    <TabPanel value={value} index={index} key={index}>
                                                        <div className='d-flex flex-column'>
                                                            <p style={{ fontSize: '15px' }} className='address d-flex align-items-center'>
                                                                <FaMapLocation className='me-2' style={{ background: 'black', color: '#fff', padding: '8px', borderRadius: '50%', height: '30px', width: '30px' }} />
                                                                {item.address}
                                                            </p>
                                                            <p style={{ fontSize: '15px' }} className='address d-flex align-items-center'>
                                                                <FaPhone className='me-2' style={{ background: 'black', color: '#fff', padding: '8px', borderRadius: '50%', height: '30px', width: '30px' }} />
                                                                {item.numberPhone}
                                                            </p>
                                                            <p style={{ fontSize: '15px' }} className='address d-flex align-items-center'>
                                                                <FaMailBulk className='me-2' style={{ background: 'black', color: '#fff', padding: '8px', borderRadius: '50%', height: '30px', width: '30px' }} />
                                                                {item.mail}
                                                            </p>
                                                            <p style={{ fontSize: '15px' }} className='address d-flex align-items-center'>
                                                                <FaPhoneAlt className='me-2' style={{ background: 'black', color: '#fff', padding: '8px', borderRadius: '50%', height: '30px', width: '30px' }} />
                                                                {item.hotline}
                                                            </p>
                                                        </div>
                                                    </TabPanel>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <iframe
                                    title="Google Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2759739826475!2d106.6452723145719!3d10.767380892339662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f7f47bcb2b%3A0xe7cd6de7d55f5e62!2zMjczIEFuIER1b25nIFZ1b25nLCBRdeG7hW5nIDU!5e0!3m2!1svi!2s!4v1691955836751!5m2!1svi!2s"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-link py-5">
                <div className="container">
                    <div className="row">
                        {footerLinks.map((menu, index) => (
                            <div className="col-md-2 col-12" key={index}>
                                <div className="menu-footer">
                                    <div className="title mb-2">{menu.title}</div>
                                    <div className="links">
                                        <ul>
                                            {menu.links.map((link, i) => (
                                                <li key={i}>
                                                    <Link to={link.to}>{link.text}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-md-4 col-12">
                            <div className="menu-footer">
                                <div className="title mb-2">Cộng đồng</div>
                                <div className="links">
                                    <ul className="d-flex align-items-center justify-content-start">
                                        {socialLinks.map((social, i) => (
                                            <li key={i} className={i === 0 ? 'ms-0' : 'ms-3'}>
                                                <Link to={social.to}>{social.icon}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <hr />
            </div>
            <div className="footer-contact pb-5 pt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="footer-contact-info">
                                        <p>Copyright &copy; ThueSanTheThao.com.vn. Bản quyền dựa trên template có trước.</p>
                                        <p>Công ty TNHH MTV.</p>
                                        <p>Giấy phép kinh doanh số</p>
                                        <p>Được cấp vào ngày</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="transactions">
                                        <div className="title mb-2">Giao dịch an toàn</div>
                                        <div className="img">
                                            <img src="https://img.thegioithethao.vn/media/icon/giao_dich_at.png" alt="Giao dịch an toàn" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copy py-3" style={{ background: '#E21F1D' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <div className="text-center" style={{ color: 'white' }}>
                                Copyright © 2024 SportWorld. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
