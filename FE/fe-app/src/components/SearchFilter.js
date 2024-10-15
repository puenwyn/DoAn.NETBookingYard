import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';
import '../styles/components/searchFilter.css';
import { IoIosSearch, IoMdRefresh } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const category = [
    { id: 1, category_name: 'Sân bóng đá' },
    { id: 2, category_name: 'Sân cầu lông' },
    { id: 3, category_name: 'Sân đá cầu' },
    { id: 4, category_name: 'Sân pickleball' },
    { id: 5, category_name: 'Sân bóng bàn' },
    { id: 6, category_name: 'Sân bóng rổ' },
    { id: 7, category_name: 'Sân tennis' },
    { id: 8, category_name: 'Sân bóng chuyền' },
    { id: 9, category_name: 'Sân golf' },
];

const rating = [
    { id: 1, rating_select: 'Từ 1 sao đến 3 sao' },
    { id: 2, rating_select: 'Từ 3 sao đến 4 sao' },
    { id: 3, rating_select: 'Từ 4 sao đến 5 sao' },
];

const priceRange = [
    { id: 1, price_range: 'Dưới 100.000' },
    { id: 2, price_range: 'Từ 100.000 - 300.000' },
    { id: 3, price_range: 'Từ 300.000 - 500.000' },
    { id: 4, price_range: 'Trên 500.000' },
];

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const SearchFilter = () => {
    const fullText = 'Tìm kiếm sân thể thao...';
    const [placeholder, setPlaceholder] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [checkedCategory, setCheckedCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Danh mục sân');
    const [checkedRating, setCheckedRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState('Tất cả');
    const [checkedPrice, setCheckedPrice] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState('Tất cả');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertInformation, setAlertInformation] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-dropdown')) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isDeleting) {
                setPlaceholder((prev) => prev.slice(0, -1));
                if (placeholder.length === 0) {
                    setIsDeleting(false);
                }
            } else {
                setPlaceholder(fullText.slice(0, placeholder.length + 1));
                if (placeholder.length === fullText.length) {
                    setIsDeleting(true);
                }
            }
        }, isDeleting ? 50 : 50);

        return () => clearTimeout(timeout);
    }, [placeholder, isDeleting]);

    const handleToggleDropdown = (dropdownId) => {
        if (dropdownId === 'area' && (selectedCategory === 'Danh mục sân' || selectedRating === 'Tất cả' || selectedPrice === 'Tất cả')) {
            if(dropdownId === 'area') setOpenDropdown(dropdownId);
            return; 
        }
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const handleReset = () => {
        setCheckedCategory(null);
        setCheckedRating(null);
        setCheckedPrice(null);
        setOpenDropdown(null);
        setSelectedCategory('Danh mục sân');
        setSelectedRating('Tất cả');
        setSelectedPrice('Tất cả');
        setAlertInformation('Làm mới thành công!');
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleToggle = (value, type) => () => {
        if (type === 'category') {
            setCheckedCategory(value);
            setSelectedCategory(value ? category.find(r => r.id === value).category_name : 'Danh mục sân');
        } else if (type === 'rating') {
            setCheckedRating(value);
            setSelectedRating(value ? rating.find(r => r.id === value).rating_select : 'Tất cả');
        } else if (type === 'price') {
            setCheckedPrice(value);
            setSelectedPrice(value ? priceRange.find(r => r.id === value).price_range : 'Tất cả');
        }
        setOpenDropdown(null);
    };

    return (
        <div style={{ background: '#f3f4f7' }} className='py-3'>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {alertInformation}
                </Alert>
            </Snackbar>
            <div className="container">
                <div className="row" style={{ background: '#fff', borderRadius: '12px' }}>
                    <div className="col-md-12 col-12">
                        <form method="GET" autoComplete="off" className='w-100 py-2'>
                            <div className="search-content w-100 d-flex align-items-center justify-content-between">
                                <div className='search-item search-dropdown'>
                                    <Button onClick={() => handleToggleDropdown('category')} className='search-category d-flex align-items-center justify-content-start ps-3' aria-expanded={openDropdown === 'category'}>
                                        <FaChevronDown /><span className='ms-2'>{selectedCategory}</span>
                                    </Button>
                                    <List sx={{ width: '100%', maxWidth: 360 }} className={`dropdown-list shadow ${openDropdown === 'category' ? 'open' : ''}`}>
                                        {category.map((value) => (
                                            <ListItem key={value.id} disablePadding>
                                                <ListItemButton role={undefined} onClick={handleToggle(value.id, 'category')} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checkedCategory === value.id}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${value.id}` }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={`checkbox-list-label-${value.id}`} primary={value.category_name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                                <div className='search-item search-input ps-2'>
                                    <div className='search-input'>
                                        <IoIosSearch />
                                        <input type='text' placeholder={placeholder} aria-label="Tìm kiếm sân thể thao" />
                                    </div>
                                </div>
                                <div className='separator-search'></div>
                                <div className='search-item search-dropdown'>
                                    <Button onClick={() => handleToggleDropdown('area')} className='category d-flex flex-column align-items-start' aria-expanded={openDropdown === 'area'}>
                                        <span className='d-flex align-items-center'>Khu vực<FaChevronDown className='ms-2' /></span>
                                        <span>Tất cả</span>
                                    </Button>
                                    <List sx={{ width: '100%', minWidth: '300px' }} className={`dropdown-list shadow ${openDropdown === 'area' ? 'open' : ''}`}>
                                        <ListItem>
                                            <FormControl fullWidth size="small">
                                                {/* <InputLabel id="province-select-label" sx={{ backgroundColor: 'white', padding: '0 4px' }}>Tỉnh/Thành</InputLabel>
                                                <Select
                                                    labelId="province-select-label"
                                                    id="province-select"
                                                // value={selectedProvince}
                                                // onChange={handleProvinceChange}
                                                >
                                                    <MenuItem value={1}>Hà Nội</MenuItem>
                                                    <MenuItem value={2}>TP. Hồ Chí Minh</MenuItem>
                                                    <MenuItem value={3}>Đà Nẵng</MenuItem>
                                                </Select> */}
                                            </FormControl>
                                        </ListItem>

                                        <ListItem>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="district-select-label" sx={{ backgroundColor: 'white', padding: '0 4px' }}>Quận</InputLabel>
                                                {/* <Select
                                                    labelId="district-select-label"
                                                    id="district-select"
                                                // value={selectedDistrict}
                                                // onChange={handleDistrictChange}
                                                >
                                                    <MenuItem value={1}>Quận 1</MenuItem>
                                                    <MenuItem value={2}>Quận 2</MenuItem>
                                                    <MenuItem value={3}>Quận 3</MenuItem>
                                                </Select> */}
                                            </FormControl>
                                        </ListItem>

                                        <ListItem>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="ward-select-label" sx={{ backgroundColor: 'white', padding: '0 4px' }}>Phường</InputLabel>
                                                {/* <Select
                                                    labelId="ward-select-label"
                                                    id="ward-select"
                                                // value={selectedWard}
                                                // onChange={handleWardChange}
                                                >
                                                    <MenuItem value={1}>Phường 1</MenuItem>
                                                    <MenuItem value={2}>Phường 2</MenuItem>
                                                    <MenuItem value={3}>Phường 3</MenuItem>
                                                </Select> */}
                                            </FormControl>
                                        </ListItem>

                                        <ListItem>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="street-select-label" sx={{ backgroundColor: 'white', padding: '0 4px' }}>Đường</InputLabel>
                                                {/* <Select
                                                    labelId="street-select-label"
                                                    id="street-select"
                                                // value={selectedStreet}
                                                // onChange={handleStreetChange}
                                                >
                                                    <MenuItem value={1}>Đường Lê Lợi</MenuItem>
                                                    <MenuItem value={2}>Đường Nguyễn Huệ</MenuItem>
                                                    <MenuItem value={3}>Đường Trần Hưng Đạo</MenuItem>
                                                </Select> */}
                                            </FormControl>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className='separator-search'></div>
                                <div className='search-item search-dropdown'>
                                    <Button onClick={() => handleToggleDropdown('rating')} className='d-flex flex-column align-items-start' aria-expanded={openDropdown === 'rating'}>
                                        <span className='d-flex align-items-center'>Đánh giá<FaChevronDown className='ms-2' /></span>
                                        <span>{selectedRating}</span>
                                    </Button>
                                    <List sx={{ width: '100%', maxWidth: 360 }} className={`dropdown-list shadow ${openDropdown === 'rating' ? 'open' : ''}`}>
                                        {rating.map((value) => (
                                            <ListItem key={value.id} disablePadding>
                                                <ListItemButton role={undefined} onClick={handleToggle(value.id, 'rating')} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checkedRating === value.id}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${value.id}` }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={`checkbox-list-label-${value.id}`} primary={value.rating_select} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                                <div className='separator-search'></div>
                                <div className='search-item search-dropdown'>
                                    <Button onClick={() => handleToggleDropdown('price')} className='d-flex flex-column align-items-start' aria-expanded={openDropdown === 'price'}>
                                        <span className='d-flex align-items-center'>Mức giá<FaChevronDown className='ms-2' /></span>
                                        <span>{selectedPrice}</span>
                                    </Button>
                                    <List sx={{ width: '100%', maxWidth: 360 }} className={`dropdown-list shadow ${openDropdown === 'price' ? 'open' : ''}`}>
                                        {priceRange.map((value) => (
                                            <ListItem key={value.id} disablePadding>
                                                <ListItemButton role={undefined} onClick={handleToggle(value.id, 'price')} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checkedPrice === value.id}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${value.id}` }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={`checkbox-list-label-${value.id}`} primary={value.price_range} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                                <div className='separator-search'></div>
                                <div className='search-item search-action d-flex align-items-center justify-content-between'>
                                    <Button variant="outlined"><span>Tìm sân</span></Button>
                                    <div className='btn-refresh d-flex align-items-center justify-content-around'>
                                        <Button className='w-20' onClick={handleReset}><span><IoMdRefresh /></span></Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
