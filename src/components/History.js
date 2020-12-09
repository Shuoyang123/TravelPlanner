import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HistoryCard from "./HistoryCard";
import axios from 'axios';
import { API_SERVER } from "../const/constant";
import {message} from "antd";
import Marker from "./Marker";

const instance = axios.create({
    withCredentials: true,
    baseURL: API_SERVER
})

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

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        instance.post("get_history", {
            startDate: "2018-02-01",
            endDate: "2025-05-07"
        })
            .then(response => {
                this.setState({
                    places: response.data
                })
                message.success('Fetch History Succeed!');
            })
            .catch((err) => {
                console.error(err);
                message.error('Fetch History failed.');
            });
    }

    render() {
        const places = this.state.places
        return (
            <div>
                <Grid container spacing={1}>
                    {[...Array(places.length).keys()].map(i => (
                        <Grid key={i} item xs>
                            <HistoryCard
                                index={ i + 1 }
                                itineraryId={ places[i].itineraryId }
                                avatar_background_color={"red"}
                                title={places[i].city}
                                date={places[i].date}
                                center_address={places[i].city}
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
        )
    }
}

export default History;

