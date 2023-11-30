import Navbar from "../components/Navbar.jsx";
import Table from "../components/Table.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearState, deleteTry, getTry, homeSelector, sendTry} from "../store/slices/HomeSlice.jsx";
import {useEffect, useState} from "react";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, isSuccess, isError, errorMessage} = useSelector(
        homeSelector
    );
    const [selectedItemX, setSelectedItemX] = useState();
    const [selectedItemR, setSelectedItemR] = useState();
    const [formData, setFormData] = useState({
        x: '',
        y: '',
        r: '',
        token: localStorage.getItem('token')
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if(name==="x"){
            setSelectedItemX(e.target.value);
        }
        if(name==="r"){
            setSelectedItemR(e.target.value);
        }
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
        dispatch(sendTry(data)).then(() => {
            dispatch(getTry());
        });
    };

    const onDelete = () => {
        dispatch(deleteTry()).then(() => {
            dispatch(getTry());
        });
    };


    useEffect(() => {
        return () => {
            dispatch(clearState());
            dispatch(getTry());
        };
    }, [isSuccess]);

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
            <div>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Координата по оси X:
                        <div>
                            {['-3','-2','-1','0','1','2','3','4','5'].map((value) => (
                                <label key={`x_${value}`}>
                                    <input
                                        type="checkbox"
                                        name="x"
                                        value={value}
                                        onChange={handleChange}
                                        checked={selectedItemX === value}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </label>
                    <label>
                        Координата по оси Y:
                        <input
                            type="number"
                            name="y"
                            value={formData.y}
                            onChange={handleChange}
                            min={-5}
                            max={5}
                            required
                        />
                    </label>
                    <br/>
                    <label>
                        Размер графика R:
                        <div>
                            {['0','1','2','3','4','5'].map((value) => (
                                <label key={`r_${value}`}>
                                    <input
                                        type="checkbox"
                                        name="r"
                                        value={value}
                                        onChange={handleChange}
                                        checked={selectedItemR === value}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </label>
                    {isFetching ? (
                        <button type="submit" disabled={isFetching}>
                            Sending...
                        </button>
                    ) : (
                        <button type="submit">
                            Send
                        </button>
                    )}
                </form>
                {isFetching ? (
                    <button disabled={isFetching}>
                        Delete...
                    </button>
                ) : (
                    <button onClick={onDelete}>
                        Delete
                    </button>
                )}
                {errorMessage}
            </div>
            <Table />
        </div>
    );
}

export default Home;
