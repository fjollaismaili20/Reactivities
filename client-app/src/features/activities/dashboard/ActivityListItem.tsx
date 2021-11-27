import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item,  Label,  Segment } from 'semantic-ui-react';

import {Activity} from '../../../app/models/activity';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props{
    activity: Activity
}

export default function ActivityListItem({activity} : Props) {

    return(
        <Segment.Group>
            <Segment>
                {activity.isCancelled &&
                   <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}} />

                }
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                         <Item.Content>
                             <Item.Header as={Link} to={`/activities/${activity.id}`}> 
                             {activity.title}
                             </Item.Header>
                             <Item.Description>Hosted by {activity.host?.displayName} </Item.Description>
                             {activity.isHost && (
                                 <Item.Description>
                                     <Label basic color='orange'>
                                    You are hosting this course
                                     </Label>
                                     </Item.Description>
                             )}

                             {activity.isGoing && !activity.isHost && (
                                 <Item.Description>
                                     <Label basic color='green'>
                                    You are going to this course
                                     </Label>
                                     </Item.Description>
                             )}
                         </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date! , 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.form}
                </span>
            </Segment>
            <Segment secondary>
               <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>

    )
}