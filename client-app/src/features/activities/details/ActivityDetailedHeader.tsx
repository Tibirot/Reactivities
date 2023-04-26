import { observer } from 'mobx-react-lite';
import { Segment, Item, Header, Button, Image, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

const ActivityDetailedHeader = ({ activity }: Props) => {
    const { activityStore: { updateAttendance, cancelActivityToggle, loading } } = useStore();

    const renderManagingButtons = (activity: Activity) => {
        if (activity.isHost) {
            return (
                <>
                    <Button color={activity.isCancelled ? 'green' : 'red'}
                        floated='left' basic
                        content={activity.isCancelled ? 'Re-activate activity' : 'Cancel Activity'}
                        onClick={cancelActivityToggle} loading={loading} />
                    <Button as={Link} to={`/manage/${activity.id}`} color='orange'
                        floated='right' disabled={activity.isCancelled} >
                        Manage Event
                    </Button>
                </>

            );
        } else if (activity.isGoing) {
            return <Button loading={loading} onClick={updateAttendance} >Cancel attendance</Button>
        }
        return (
            <Button
                loading={loading} onClick={updateAttendance} color='teal'
                disabled={activity.isCancelled} >
                Join Activity
            </Button>
        );
    }

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.isCancelled && (
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon color='red' content='Cancelled' />
                )}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {renderManagingButtons(activity)}
            </Segment>
        </Segment.Group>
    );
}

export default observer(ActivityDetailedHeader);