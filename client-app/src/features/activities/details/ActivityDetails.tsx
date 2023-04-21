import { Grid } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedInfo from './ActivityDetailedInfo';

const ActivityDetails = () => {

    const { activityStore } = useStore();
    const { selectedActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !selectedActivity) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={selectedActivity} />
                <ActivityDetailedInfo activity={selectedActivity}/>
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6} >
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);