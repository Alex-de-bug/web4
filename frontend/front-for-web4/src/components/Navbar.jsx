import { Link } from "react-router-dom";

function removeTokenFromLocalStorage() {
    localStorage.removeItem('token');
    window.location.reload();
}

export default function WithSubnavigation() {
    const token = localStorage.getItem('token');


    return (
        <DesktopNav hasToken={!!token} />
    );
}

const DesktopNav = ({ hasToken }) => {
    const renderNavigation = () => {
        if (hasToken) {
            return (
                <div>
                    <div key="home">
                        <Link to="/home">Home</Link>
                    </div>
                    <div key="exit">
                        <Link to="/" onClick={removeTokenFromLocalStorage}>Exit</Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {NAV_ITEMS.map((navItem) => (
                        <div key={navItem.label}>
                            <Link to={navItem.href}>
                                {navItem.label}
                            </Link>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return renderNavigation();
};

const NAV_ITEMS = [
    {
        label: "Login",
        href: "/"
    },
    {
        label: "Sign Up",
        href: "/signUp"
    }
];
