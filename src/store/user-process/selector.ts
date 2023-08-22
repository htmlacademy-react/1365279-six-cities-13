import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
	state[NameSpace.User].authorizationStatus;
export const getUserName = (state: State): string | undefined =>
	state[NameSpace.User].userData?.email;
