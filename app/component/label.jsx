import React from "react";
import PropTypes from "prop-types";

class Label extends React.Component {
    render() {
        return (
            <label htmlFor={this.props.htmlFor}>{this.props.value}</label>
        )
    }
}
export default Label;