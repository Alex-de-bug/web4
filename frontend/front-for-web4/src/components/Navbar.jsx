import { Link } from "react-router-dom";

export default function WithSubnavigation() {

    return (
        <DesktopNav/>
    );
}

const DesktopNav = () => {
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
