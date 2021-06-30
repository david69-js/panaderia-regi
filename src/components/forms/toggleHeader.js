import { Link } from "prismic-reactjs";
import React, { Fragment } from "react"
const ToggleHeader = ({
    data
}) => {
    console.log(data.header_navigation);
    return (
        <Fragment>
            {
                data.header_navigation.map((itemNav, indexNav) => (
                    <Link className="header-container_link" key={indexNav} to={itemNav.navigation_link}>{itemNav.navigation_name.text}</Link>
                ))

            }
        </Fragment>
    )
}

export default ToggleHeader