import { createContext, useContext } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const createPayment = async (payment) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payment),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Thanh toán không thành công!");
            }
            const createdPayment = await response.json();
            return createdPayment;
        } catch (err) {
            return { message: err.message };
        }
    };
    return (
        <PaymentContext.Provider value={{ createPayment }}>
            {children}
        </PaymentContext.Provider>
    )
}

export const usePaymentContext = () => {
    return useContext(PaymentContext);
}
