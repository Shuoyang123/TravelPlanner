import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HistoryCard from "./HistoryCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 50
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function AutoGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                {[1, 2, 3].map((value) => (
                    <Grid key={value} item xs>
                        <HistoryCard
                            index={ value }
                            avatar_background_color={"red"}
                            title={"Los Angeles"}
                            date={"Sep.16 - Oct.02, 2019"}
                            center_address={"8284 Melrose Ave, Los Angeles, CA 90046, USA"}
                            marker_lead={""}
                            marker_tail={""}
                            description={ "" }
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={1}>
                {[4, 5, 6].map((value) => (
                    <Grid key={value} item xs>
                        <HistoryCard
                            index={ value }
                            avatar_background_color={"red"}
                            title={"Los Angeles"}
                            date={"Sep.16 - Oct.02, 2019"}
                            center_address={"8284 Melrose Ave, Los Angeles, CA 90046, USA"}
                            marker_lead={""}
                            marker_tail={""}
                            description={ "" }
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs>

                </Grid>
            </Grid>
        </div>
    );
}
