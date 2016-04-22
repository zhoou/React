var CommentBox=React.createClass({
	render:function(){
		return(
			<div className="commentBox">
				<h1>Hello,world! I am a CommentBox.</h1>
				<CommentList />
				<CommentForm />
			</div>
			);
	}
});

var CommentList=React.createClass({
	render:function(){
		return(
			<div className="commentList">
				<h2>Hello,world! I am a CommentList.</h2>
				<Comment author='Pete Hunt'>This is one comment</Comment>
				<Comment author='Jordan Walke'>This is *another* comment</Comment>
			</div>
			)
	}
});

var CommentForm=React.createClass({
	render:function(){
		return (
			<div className="commentForm">
				Hello,world! I am a CommentForm.
			</div>
			)
	}
});

var Comment=React.createClass({
	rawMarkup:function(){
		var rawMarkup=marked(this.props.children.toString(),{sanitize:true});
		return {__html:rawMarkup};
	},
	render:function(){
		return(
			<div className='comment'>
				<h2 className='commentAuthor'>
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
			)
	}
})

ReactDOM.render(<CommentBox />,document.getElementById('app'));

