import {useSelector} from "react-redux";
import {homeSelector} from "../store/slices/HomeSlice.jsx";
import {useEffect} from "react";

export default function Table() {
    const token = localStorage.getItem('token');
    const {array} = useSelector(
        homeSelector
    );
    useEffect(() => {
        console.log(array);
    }, [array]);

    if (!!token && array!=="") {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {array.map((item, index) => (
                        <tr key={index}>
                            <td>{item.x}</td>
                            <td>{item.y}</td>
                            <td>{item.r}</td>
                            <td>{item.result.toString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>
                Нет доступных попыток
            </div>
        );
    }
}


