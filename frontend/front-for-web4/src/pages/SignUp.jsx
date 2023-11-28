import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser, signupSelector, clearState } from '../store/slices/SignUpSlice.jsx';
import Navbar from "../components/Navbar.jsx";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        signupSelector
    );
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
        } catch (error) {
            console.log('Error submitting form: ' + error.message);
        }
    };
    const onSubmit = (data) => {
        console.log(data);
        dispatch(signupUser(data));
    };


    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            navigate('/');
        }
    }, [isError, isSuccess]);
    return (
        <div>
            <Navbar />
        <form onSubmit={handleFormSubmit}>
            <h2>Sign up</h2>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
            </button>
            {isFetching ? (
                <button type="submit" disabled={isFetching}>
                    Signing up...
                </button>
            ) : (
                <button type="submit">
                    Sign up
                </button>
            )}
        </form>
            {errorMessage}
        </div>
    );
}

export default Signup;
