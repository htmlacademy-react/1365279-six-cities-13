import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: Pick<State, NameSpace.Reviews>): Review[] =>
	state[NameSpace.Reviews].reviews;
export const getReviewsLoadingStatus = (
	state: Pick<State, NameSpace.Reviews>
): boolean => state[NameSpace.Reviews].isReviewsLoading;
export const getReviewSendingStatus = (
	state: Pick<State, NameSpace.Reviews>
): boolean => state[NameSpace.Reviews].isReviewSending;
export const getSuccessPostStatus = (state: State): boolean =>
	state[NameSpace.Reviews].isSuccessPost;
export const getErrorReviewsLoadingStatus = (state: State): boolean =>
	state[NameSpace.Reviews].hasErrorReviewsLoading;
