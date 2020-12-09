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
import {message, Timeline} from 'antd';

import {API_SERVER, GOOGLE_MAP_KEY} from "../const/constant";
import * as Prototypes from "prop-types";
import axios from "axios";

const randomColor = Math.floor(Math.random() * 16777215).toString(16);

const instance = axios.create({
    withCredentials: true,
    baseURL: API_SERVER
})

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
    const [itineryDetail, setItineryDetail] = React.useState([{date: "", names: [""]}]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExpandClick = () => {
        if (!expanded) {
            instance.post("get_attractions", {
                "itineraryId": card.itineraryId
            })
                .then(response => {
                    // itineryDetail = response.data;
                    while (itineryDetail.length > 0) {
                        itineryDetail.pop()
                    }
                    setItineryDetail(itineryDetail => itineryDetail.concat(response.data));
                    setExpanded(true);
                    message.success('Fetch History Succeed!');
                })
                .catch((err) => {
                    console.error(err);
                    message.error('Fetch History failed.');
                });
        } else {
            setExpanded(false);
        }
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
                        <Timeline.Item color="Orange"></Timeline.Item>
                        {[...Array(itineryDetail.length).keys()].map(i => (
                            <Timeline.Item color="green">
                                <p> { itineryDetail[i].date } </p>
                                {
                                    itineryDetail[i].names.map( name => (
                                        <p> { name } </p>
                                    ))
                                }
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </CardContent>
            </Collapse>
        </Card>
    );
}

HistoryCard.propTypes = {
    index: Prototypes.number.isRequired,
    avatar_background_color: Prototypes.string.isRequired,
    itineraryId: Prototypes.number.isRequired,
    title: Prototypes.string.isRequired,
    date: Prototypes.string.isRequired,
    center_address: Prototypes.string.isRequired,
    marker_lead: Prototypes.string.isRequired,
    marker_tail: Prototypes.string.isRequired,
    description: Prototypes.string.isRequired
}

export default HistoryCard;