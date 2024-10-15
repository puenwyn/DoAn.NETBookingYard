import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/common.css';
import { AppRoutes } from './routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
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
