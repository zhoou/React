var React = require('react');

class Hello extends React.Component {
    render(){
        return(
            <h1>hello , {this.props.name}</h1>
            )
    }
};

module.exports = Hello;
