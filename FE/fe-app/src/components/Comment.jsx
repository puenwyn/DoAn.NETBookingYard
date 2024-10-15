import { React, useState } from 'react';
import Button from '@mui/material/Button';
import { FaStar, FaRegStar } from "react-icons/fa";
import '../styles/common.css';

const Comment = () => {
    const [showDiv, setShowDiv] = useState(false);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [reply, setReply] = useState({ id: null, text: '' });
    const [comments, setComments] = useState([
        {
            id: 1,
            fullname: "Nguyễn Văn A",
            time: "2 giờ trước",
            text: "Sân rất đẹp và sạch sẽ!",
            rating: 5,
            replies: [],
            avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            id: 2,
            fullname: "Lê Văn C",
            time: "3 giờ trước",
            text: "Dịch vụ tốt, tôi hài lòng.",
            rating: 4,
            replies: [],
            avatar: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        // Thêm nhiều bình luận cho ví dụ
    ]);

    const handleToggleDiv = () => {
        setShowDiv(!showDiv);
    };

    const handleRating = (value) => {
        setRating(value);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        const newCommentObject = {
            id: comments.length + 1,
            fullname: "Bạn",
            time: "Vừa xong",
            text: newComment,
            rating: rating,
            replies: [],
            avatar: "https://randomuser.me/api/portraits/men/3.jpg"
        };
        setComments([...comments, newCommentObject]);
        setNewComment('');
        setRating(0);
        setShowDiv(false);
    };

    const handleReplyChange = (e) => {
        setReply({ ...reply, text: e.target.value });
    };

    const handleReplySubmit = (e, commentId) => {
        e.preventDefault();
        const commentIndex = comments.findIndex(c => c.id === commentId);
        const updatedComments = [...comments];
        updatedComments[commentIndex].replies.push({
            id: Math.random(),
            fullname: "Bạn",
            time: "Vừa xong",
            text: reply.text,
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        });
        setComments(updatedComments);
        setReply({ id: null, text: '' });
    };

    const toggleShowMoreComments = () => {
        setShowMoreComments(!showMoreComments);
    };

    return (
        <div className='container mb-5'>
            <div className='row bg-white mt-4 me-0 p-3' style={{ borderRadius: '8px' }}>
                <div className='comment-title'>
                    <h5>Đánh giá sân thể thao</h5>
                </div>
                <div className='comment-info d-flex mt-3 p-2'>
                    <div className='comment-point col-lg-2 col-5 d-flex flex-column text-center'>
                        <span className='fw-bolder'>Trung bình</span>
                        <div className='star-average d-flex justify-content-center align-items-center text-center'>
                            <span className='fs-1 fw-bolder'>5.0</span>
                            <FaStar color='yellow' className='ms-2 fs-2' />
                        </div>
                        <Button variant="text" onClick={handleToggleDiv}>Đánh giá và nhận xét</Button>
                    </div>
                </div>

                <div className={`mt-4 me-0 p-3 ${showDiv ? 'slide-down slide-down-active' : 'd-none'}`}>
                    <div className='post-comment p-3' style={{ backgroundColor: 'rgb(243, 244, 247)' }}>
                        <h4>Gửi nhận xét của bạn ở đây</h4>
                        <h6 className='mt-2'>Đánh giá của bạn về sản phẩm này</h6>
                        <div className='star-post'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span key={value} onClick={() => handleRating(value)}>
                                    {rating >= value ? <FaStar className='fs-5' color='yellow' /> : <FaRegStar className='fs-5' />}
                                </span>
                            ))}
                        </div>
                        <h6 className='mt-3'>Viết nhận xét của bạn vào bên dưới</h6>
                        <form onSubmit={handleSubmitComment}>
                            <textarea
                                className="form-control"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows="8"
                                required
                            />
                            <button type="submit" className="btn btn-primary mt-2 mb-3" style={{ borderRadius: '20px' }}>Gửi đánh giá</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='row bg-white mt-4 me-0 p-3' style={{ borderRadius: '8px' }}>
                <div className='comments-title'>
                    <h5>Bình luận</h5>
                </div>
                {comments.slice(0, showMoreComments ? comments.length : 5).map(comment => (
                    <div key={comment.id} className='comment-item mt-3 p-2 d-flex align-items-start'>
                        <img src={comment.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <div className='ms-2'>
                            <div className='d-flex align-items-center'>
                                <strong>{comment.fullname}</strong>
                                <span className='ms-2 text-muted'>{comment.time}</span>
                            </div>
                            <p>{comment.text}</p>
                            <Button variant="text" onClick={() => setReply({ id: comment.id, text: '' })}>Trả lời</Button>
                            
                            {reply.id === comment.id && (
                                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className='mt-2'>
                                    <textarea
                                        className="form-control"
                                        value={reply.text}
                                        onChange={handleReplyChange}
                                        rows="3"
                                        required
                                    />
                                    <Button type="submit" className="btn btn-primary mt-2">Gửi</Button>
                                </form>
                            )}

                            {comment.replies.length > 0 && (
                                <div className='replies-section mt-2'>
                                    {comment.replies.map(reply => (
                                        <div key={reply.id} className='reply-item ms-4 mt-2 p-2 d-flex align-items-start'>
                                            <img src={reply.avatar} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                            <div className='ms-2'>
                                                <div className='d-flex align-items-center'>
                                                    <strong>{reply.fullname}</strong>
                                                    <span className='ms-2 text-muted'>{reply.time}</span>
                                                </div>
                                                <p>{reply.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {comments.length > 5 && !showMoreComments && (
                    <Button variant="text" onClick={toggleShowMoreComments}>Xem thêm</Button>
                )}
            </div>
        </div>
    );
};

export default Comment;
