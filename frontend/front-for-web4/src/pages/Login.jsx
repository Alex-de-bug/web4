import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, loginSelector, clearState } from '../store/slices/LoginSlice.jsx';
import {useEffect, useState} from "react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register} = useForm();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    loginSelector
  );
  const [formData, setFormData] = useState({
    name: '',
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
      console.error('Error submitting form:', error);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate('/home');
    }
  }, [isError, isSuccess]);
  return (
        <form onSubmit={handleFormSubmit}>
          <h1>Sign in to your account</h1>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            <label >Password</label>
            <input type="password" name="password" value={formData.password} {...register('password', { required: true })} onChange={handleChange} />
          {isFetching ? (
              <button type="submit" disabled={isFetching}>
                Signing in...
              </button>
          ) : (
              <button type="submit">
                Sign in
              </button>
          )}
        </form>
  );
}

export default Login;
