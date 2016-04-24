var Data=[
{id:1,author:'Pete Hunt',text:'This is one comment'},
{id:2,author:'Jordan Walke',text:'This is *another* comment'}
];

var CommentBox=React.createClass({
	render:function(){
		return(
			<div className="commentBox">
				<h1>Hello,world! I am a CommentBox.</h1>
				<CommentList data={this.props.data}/>
				<CommentForm />
			</div>
			);
	}
});

var CommentList=React.createClass({
	render:function(){
		var commentNode=this.props.data.map(function(comment){
			return(
				<Comment key={comment.id} author={comment.author}>
					{comment.text}
				</Comment>
			)
		});

		return(
			<div className="commentList" >
				<h2>Hello,world! I am a CommentList.</h2>
				{commentNode}
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

ReactDOM.render(<CommentBox data={Data}/>,document.getElementById('app'));

