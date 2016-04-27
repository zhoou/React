var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('Hello');

require('Bootstrap/dist/css/bootstrap.min.css');
require('../Content/css/main.css');

var MainBody=React.createClass({
	render:function(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-6">
						<Hello name="Zhoou" />
					</div>
					<div className="col-xs-6">
						<a href="www.baidu.com">成功</a>
					</div>
				</div>
			</div>
			)
	}
});

ReactDOM.render(<MainBody />, document.getElementById('app'));