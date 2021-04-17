import { Gender } from "../user/entities/gender";
import { User } from "../user/entities/user.entity";

export function submitNotificationMessage(triggerer: User): string {
    const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';
    return `${first} ${triggerer.firstname} ${triggerer.lastname} Submit To Your Carpool!`;
}


export function acceptNotificationMessage(triggerer: User): string {
    const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';
    return `${first} ${triggerer.firstname} ${triggerer.lastname} Accepts Your Submission To The Carpool!`;
}


export function rejectNotificationMessage(triggerer: User): string {
    const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';
    return `${first} ${triggerer.firstname} ${triggerer.lastname} Rejects Your Submission To The Carpool!`;
}