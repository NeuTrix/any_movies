//  Should abstract out view from logic for Cards
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material UI components
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentsBarContainer from './CommentsBarContainer';
import { CommentableForm } from '.';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comment: PropTypes.instanceOf(Object).isRequired, // raw comments from api
	deleteComment: PropTypes.instanceOf(Function).isRequired,
	subComments: PropTypes.instanceOf(Array).isRequired, // subComments filtered
};

class CommentCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			editMode: false
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit(e) {
		e.preventDefault();
		const { comment, editComment } = this.props;
		// editComment(comment.id);
	};

	handleDelete(e) {
		e.preventDefault();
		const { comment, deleteComment } = this.props;
		window.confirm(`Delete comment: ${comment.id}?`);
		deleteComment(comment.id);
	};

	render() {
		const { classes, comment, subComments } = this.props;
		return (
			<Card className={classes.grid}>
				<div className={classes.title}>
					<h3>{comment.title}</h3>
					<p>{comment.id}</p>
					<p>{comment.type}</p>
				</div>
				<div className={classes.body}>
					<p>{comment.body}</p>
				</div>
				<div className={classes.author}>
					{comment.author}
				</div>

				<div className={classes.actions}>
					<CardActions>
						<Button onClick={this.handeEdit}>edit</Button>
						<Button onClick={this.handleDelete}>del</Button>
					</CardActions>
				</div>

				<div className={classes.replies}>
					<CommentsBarContainer
						commentableID={comment.id} // parent info for adding comments
						commentableType="Comment" // parent info for adding comments
						comments={subComments}
					/>
				</div>
			</Card>
		);
	}
}

const styles = theme => ({
	actions: {
		display: 'inherit',
		gridArea: 'actions',
	},
	body: {
		gridArea: 'body',
		width: '100%',
	},
	form: {
		gridArea: 'form',
		marginTop: theme.spacing.unit * 10,
	},
	grid: {
		border: '1px solid lime',
		display: 'grid',
		gridTemplateAreas: `
			"title title"
			"author author"
			"body body"
			"actions actions"
			"replies replies"
		`,
		marginBottom: theme.spacing.unit * 2,
		padding: theme.spacing.unit * 0.5,
	},
	replies: { gridArea: 'replies' },

	title: {
		gridArea: 'title',
		width: '100%',
	},
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
