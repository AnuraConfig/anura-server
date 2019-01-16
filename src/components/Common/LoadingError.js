import React from "react";
import ErrorImage from "./../../views/svg/error.png";

export default class LoadingError extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"loadingError"}>
                <div className={"loadingError__container"}>
                    <img className={"loadingError__img"} src={ErrorImage}/>
                    <h2 className={"loadingError__header"}>Hey.</h2><p className={"loadingError__text"}>Sorry we
                    couldn't load the configuration.</p>
                </div>
            </div>
        )
    }
}