import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";

const CustomTextField = ({ label, placeholder, password, regex, error, width, multiline, text, readOnly, onChange, type, confirmPassword, hashedPassword, setValid = null }) => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(null);

    React.useEffect(() => {
        setInputValue(text);
    }, [text]);

    React.useEffect(() => {
        if (confirmPassword && inputValue) { // Kiểm tra khi có confirmPassword và inputValue không rỗng
            // alert(isValid)
            setIsValid(inputValue === hashedPassword);
        }
    }, [hashedPassword, confirmPassword, inputValue]);


    useEffect(() => {
        setIsValid(setValid);
    }, [setValid])

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const valid = regex?.test(value);

        if (!confirmPassword) {
            setIsValid(valid);
        }

        if (onChange) {
            onChange(value, valid);  // Truyền cả giá trị và trạng thái hợp lệ lên component cha
        }
    };

    return (
        <div className="d-flex flex-column px-2 mt-3" style={{ width: width }}>
            <span className="mb-1 fw-bold" style={{ fontSize: '14px' }}>{label}</span>
            <TextField
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                variant="outlined"
                type={type || (password ? 'password' : 'text')}
                multiline={multiline || false}
                rows={multiline ? 3 : 1}
                InputProps={{
                    sx: {
                        padding: `${multiline ? '12px 0 12px 12px' : '0'}`,
                        height: multiline ? 'auto' : '40px',
                        fontSize: '15px',
                    },
                    readOnly: readOnly || false,
                    endAdornment: (
                        <InputAdornment position="end">
                            {isValid === null ? null : (
                                isValid ? (
                                    <FaCheck style={{ color: 'rgb(102, 212, 50)', marginRight: '8px' }} />
                                ) : (
                                    <MdOutlineErrorOutline style={{ color: 'rgb(253, 92, 112)', marginRight: '8px' }} />
                                )
                            )}
                        </InputAdornment>
                    )
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: isValid === null ? "rgb(244, 244, 244)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"),
borderWidth: '2px',
                        },
                        "&:hover fieldset": {
                            borderColor: isValid === null ? "rgb(244, 244, 244)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"),
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: isValid === null ? "rgb(53, 202, 238)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"),
                            boxShadow: isValid === null ? "0 0 3px rgba(53, 202, 238, 0.9)" : (isValid ? "0 0 3px rgba(102, 212, 50, 0.9)" : "0 0 3px rgba(253, 92, 112, 0.9)"),
                            borderWidth: '2px',
                        },
                        borderRadius: '0.5rem',
                    },
                }}
            />
            {isValid === null ? '' : (!isValid ? <span className="mt-1 fw-bold" style={{ display: 'block', color: 'rgb(253, 92, 112)', fontSize: '13px' }}>{error}</span> : '')}
        </div>
    );
};

export default CustomTextField;