import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus =>
	state[NameSpace.User].authorizationStatus;
export const getUserName = (state: Pick<State, NameSpace.User>): string | undefined =>
	state[NameSpace.User].userData?.email;
