import {Logger} from '@nestjs/common';
import {Carpool} from '../carpool/entities/carpool.entity';
import {Gender} from '../user/entities/gender';
import {User} from '../user/entities/user.entity';

const carpoolNotificationPart = (carpool: Carpool) => {
  const departureAdress = carpool.departureLocation.address;
  const departureName =
    (departureAdress.town || departureAdress.city || departureAdress.village) ??
    '';
  const destinationAdress = carpool.destinationLocation.address;
  const departureComa =
    departureAdress.state != undefined && departureName ? ',' : '';
  const destinationName =
    (destinationAdress.town ||
      destinationAdress.city ||
      destinationAdress.village) ??
    '';
  const destinationComa =
    destinationAdress.state != undefined && destinationName ? ',' : '';

  return `[Carpool](/carpool/${carpool.id}) going from ***${departureAdress.state}${departureComa}${departureName}*** to ***${destinationAdress.state}${destinationComa}${destinationName}***`;
};

export function submitNotificationMessage(
  triggerer: User,
  carpool: Carpool,
): string {
  const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';

  return `[${first} ${triggerer.firstname} ${triggerer.lastname}](/user/${
    triggerer.id
  })  Submit To Your ${carpoolNotificationPart(carpool)}`;
}

export function acceptNotificationMessage(
  triggerer: User,
  carpool: Carpool,
): string {
  const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';
  return `[${first} ${triggerer.firstname} ${triggerer.lastname}](/user/${
    triggerer.id
  }) Accepts Your Submission To The ${carpoolNotificationPart(carpool)}`;
}

export function rejectNotificationMessage(
  triggerer: User,
  carpool: Carpool,
): string {
  const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';

  return `[${first} ${triggerer.firstname} ${triggerer.lastname}](/user/${
    triggerer.id
  }) Rejects Your Submission To The ${carpoolNotificationPart(carpool)}`;
}

export function sendInvitationNotificationMessage(triggerer: User): string {
  const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';
  return `[${first} ${triggerer.firstname} ${triggerer.lastname}](/user/${triggerer.id}) Sent you a friend request.`;
}
export function acceptInvitationNotificationMessage(triggerer: User): string {
  const first = triggerer.gender === Gender.MALE ? 'Mr' : 'Mrs';
  return `[${first} ${triggerer.firstname} ${triggerer.lastname}](/user/${triggerer.id}) Accepted your friend request.`;
}
