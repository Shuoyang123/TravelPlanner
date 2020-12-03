import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Timeline } from 'antd';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import {GOOGLE_MAP_KEY} from "../const/constant";
import * as Prototypes from "prop-types";

const randomColor = Math.floor(Math.random() * 16777215).toString(16);

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#' + randomColor
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    cardContent: {
        textAlign: 'left',
        padding: '6px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const HistoryCard = (card) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} >
                        {card.index}
                    </Avatar>
                }
                action={
                    <>
                        <IconButton aria-label="settings" onClick={handleOpen}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <Timeline>
                                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="red">
                                            <p>Solve initial network problems 1</p>
                                            <p>Solve initial network problems 2</p>
                                            <p>Solve initial network problems 3 2015-09-01</p>
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            <p>Technical testing 1</p>
                                            <p>Technical testing 2</p>
                                            <p>Technical testing 3 2015-09-01</p>
                                        </Timeline.Item>
                                        <Timeline.Item color="gray">
                                            <p>Technical testing 1</p>
                                            <p>Technical testing 2</p>
                                            <p>Technical testing 3 2015-09-01</p>
                                        </Timeline.Item>
                                        <Timeline.Item color="gray">
                                            <p>Technical testing 1</p>
                                            <p>Technical testing 2</p>
                                            <p>Technical testing 3 2015-09-01</p>
                                        </Timeline.Item>
                                    </Timeline>
                                </div>
                            </Fade>
                        </Modal>
                    </>
                }
                title={card.title}
                subheader={card.date}
            />
            <CardMedia
                className={classes.media}
                image={"https://maps.googleapis.com/maps/api/staticmap?center=" + card.center_address + "&zoom=13&size=600x300&maptype=roadmap&language=en&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=" + GOOGLE_MAP_KEY}
                title={card.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {card.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.cardContent}>
                    <Timeline>
                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>Solve initial network problems 1</p>
                            <p>Solve initial network problems 2</p>
                            <p>Solve initial network problems 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>Technical testing 1</p>
                            <p>Technical testing 2</p>
                            <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                            <p>Technical testing 1</p>
                            <p>Technical testing 2</p>
                            <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                            <p>Technical testing 1</p>
                            <p>Technical testing 2</p>
                            <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                    </Timeline>
                </CardContent>
            </Collapse>
        </Card>
    );
}

HistoryCard.propTypes = {
    index: Prototypes.number.isRequired,
    avatar_background_color: Prototypes.string.isRequired,
    title: Prototypes.string.isRequired,
    date: Prototypes.string.isRequired,
    center_address: Prototypes.string.isRequired,
    marker_lead: Prototypes.string.isRequired,
    marker_tail: Prototypes.string.isRequired,
    description: Prototypes.string.isRequired
}

export default HistoryCard;