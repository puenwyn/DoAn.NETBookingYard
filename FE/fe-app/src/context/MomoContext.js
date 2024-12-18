import React, { createContext, useState, useContext } from 'react';

const MomoContext = createContext();
export const MomoProvider = ({ children }) => {
    const [paymentStatus, setPaymentStatus] = useState(null); 
    const [paymentUrl, setPaymentUrl] = useState(null); 

    const initiatePayment = async (payment) => {
        try {
            const response = await fetch('https://localhost:7071/api/v1/payment/momo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payment),
            });

            const data = await response.json();
            console.log(data);
            if (data.resultCode === '0') {
                setPaymentUrl(data.payUrl);
            } else {
                setPaymentStatus('failed');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            setPaymentStatus('failed');
        }
    };

    const verifyPayment = async (params) => {
        try {
            const response = await fetch('https://localhost:7071/api/v1/payment/notify', {
                method: 'POST',
                body: new URLSearchParams(params).toString(),
            });
            const data = await response.json();
            if (data.status === 'success') {
                setPaymentStatus('success');
            } else {
                setPaymentStatus('failed');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            setPaymentStatus('failed');
        }
    };

    return (
        <MomoContext.Provider value={{ paymentStatus, paymentUrl, initiatePayment, verifyPayment }}>
            {children}
        </MomoContext.Provider>
    );
};

// Hook để sử dụng Context
export const useMomoContext = () => {
    return useContext(MomoContext);
};
