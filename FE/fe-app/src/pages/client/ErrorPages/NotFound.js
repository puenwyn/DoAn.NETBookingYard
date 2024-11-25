import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center" style={{ marginTop: '100px' }}>
            <h1 className="display-1 text-danger">404</h1>
            <h2 className="text-muted">Trang không tìm thấy!</h2>
            <p className="lead">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <Link to="/" className="btn btn-primary">Quay về Trang Chủ</Link>
        </div>
    );
};

export default NotFound;