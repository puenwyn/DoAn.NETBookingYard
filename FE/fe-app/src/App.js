import React, { useContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/common.css';
import { AppRoutes } from './routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DetailPage from './pages/client/DetailPage';
// import { UserContext, UserProvider } from './context/UserContext';


const App = () => {
    return (
        // <UserProvider>
        //     <BrowserRouter>
        //         <Header />
        //         <Routes>
        //             {/* <Route path='/' element={<HomePage />} /> */}
        //             <Route path='/employees' element={<UserList />} />
        //         </Routes>
        //         <Footer />
        //     </BrowserRouter>
        // </UserProvider>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

// src/components/AddOwner.jsx

// const AddOwner = () => {
//     const [owner, setOwner] = useState({
//         username: '',
//         hashedPassword: '',
//         fullName: '',
//         dateOfBirth: '',
//         address: '',
//         phoneNumber: '',
//         gender: '',
//         isLocked: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setOwner({
//             ...owner,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Chuyển đổi giá trị của gender và isLocked từ chuỗi sang số
//             const ownerData = {
//                 ...owner,
//                 gender: parseInt(owner.gender), // Chuyển đổi thành số nguyên
//                 isLocked: parseInt(owner.isLocked), // Chuyển đổi thành số nguyên
//             };
    
//             console.log(ownerData); // In ra dữ liệu owner để kiểm tra
//             const response = await axios.post('https://localhost:7292/api/v1/owner', ownerData);
//             console.log(response.data);
    
//             // Reset form after submission
//             setOwner({
//                 username: '',
//                 hashedPassword: '',
//                 fullName: '',
//                 dateOfBirth: '',
//                 address: '',
//                 phoneNumber: '',
//                 gender: '',
//                 isLocked: '',
//             });
//             alert('Owner added successfully!');
//         } catch (error) {
//             console.error('There was an error adding the owner!', error);
//             alert('Error adding owner');
//         }
//     };

//     return (
//         <div>
//             <h2>Add New Owner</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         name="username"
//                         value={owner.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         name="hashedPassword"
//                         value={owner.hashedPassword}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Full Name:</label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={owner.fullName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Date of Birth:</label>
//                     <input
//                         type="date"
//                         name="dateOfBirth"
//                         value={owner.dateOfBirth}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Address:</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={owner.address}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Phone Number:</label>
//                     <input
//                         type="text"
//                         name="phoneNumber"
//                         value={owner.phoneNumber}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Gender (0 for Male, 1 for Female):</label>
//                     <input
//                         type="number"
//                         name="gender"
//                         value={owner.gender}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Is Locked (0 for No, 1 for Yes):</label>
//                     <input
//                         type="number"
//                         name="isLocked"
//                         value={owner.isLocked}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Add Owner</button>
//             </form>
//         </div>
//     );
// };


// const UserList = () => {
//     const { users, loading, error } = useContext(UserContext);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h1>Danh Sách Nhân Viên</h1>
//             <ul>
//                 {users.map(employee => (
//                     <li key={employee.id}>
//                         <strong>{employee.name}</strong> - {employee.position} ({employee.department}) - Ngày vào làm: {new Date(employee.dateOfJoining).toLocaleDateString()}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

export default App;
