import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { withDb } from '../commons/DB';


const styles = theme => ({
	container: {
		height: "100vh",
	},
	title: {
	  flexGrow: 1,
	  display: 'none',
	  [theme.breakpoints.up('sm')]: {
		display: 'block',
	  },
	},
	link: {
		padding: "0 1rem",
	}
	
});


class Layout extends Component {

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>

				<header>
		
					<AppBar position="static">
						<Toolbar>
						
						<Typography className={classes.title} variant="h6" noWrap>
							Sketch To Icon
						</Typography>

					
						<a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer" className={classes.link} >
							<Typography variant="subtitle1">
								Font Awesome
							</Typography>
						</a>
						<a href={this.props.db.getGithubPath()} target="_blank" rel="noopener noreferrer" className={classes.link} >
							<Typography variant="subtitle1">
								Github
							</Typography>
						</a>

						
						
						</Toolbar>
					</AppBar>
				
							
				</header>

				<section>
					{this.props.children}
				</section>
				

			</div>
		);
	}
}

export default withStyles(styles)(withDb(Layout));
