import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mocks/mock-component';
import { BookmarkButtonMemo } from './bookmark-button';
import { makeMockFullOffer } from '../../mocks/offers';
import { extractActionsTypes, makeFakeStore } from '../../mocks/utils';
import { APIRoute, AuthorizationStatus, FavoriteStatus } from '../../const';
import {
	addFavoriteAction,
	deleteFavoriteAction,
} from '../../store/api-actions';

describe('Component: BookmarkButton', () => {
	const mockOffer = makeMockFullOffer;
	const mockHandleBookmarkButtonClick = vi.fn();
	const initialState = {
		user: {
			authorizationStatus: AuthorizationStatus.Auth,
			userData: null,
		},
	};

	it('should render correct with "isFavorite" = true', () => {
		const withHistoryComponent = withHistory(
			<BookmarkButtonMemo
				id={mockOffer.id}
				isFavorite
				block={'place-card'}
				onClick={mockHandleBookmarkButtonClick}
			/>
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);

		render(withStoreComponent);

		expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveClass(
			'place-card__bookmark-button--active'
		);
		expect(screen.getByText('In bookmarks')).toBeInTheDocument();
	});

	it('should render correct with "isFavorite" = false', () => {
		const withHistoryComponent = withHistory(
			<BookmarkButtonMemo
				id={mockOffer.id}
				isFavorite={false}
				block={'place-card'}
				onClick={mockHandleBookmarkButtonClick}
			/>
		);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);

		render(withStoreComponent);

		expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).not.toHaveClass(
			'place-card__bookmark-button--active'
		);
		expect(screen.getByText('To bookmarks')).toBeInTheDocument();
	});

	it('should dispatch "addFavoriteAction" when user clicked on inactive bookmark button', async () => {
		const withHistoryComponent = withHistory(
			<BookmarkButtonMemo
				id={mockOffer.id}
				isFavorite={false}
				block={'place-card'}
				onClick={mockHandleBookmarkButtonClick}
			/>
		);
		const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);
		mockAxiosAdapter
			.onPost(`${APIRoute.Favorite}/${mockOffer.id}/${FavoriteStatus.Add}`)
			.reply(200, mockOffer.id);

		render(withStoreComponent);
		await userEvent.click(screen.getByRole('button'));
		const actions = extractActionsTypes(mockStore.getActions());

		expect(actions).toEqual([
			addFavoriteAction.pending.type,
			addFavoriteAction.fulfilled.type,
		]);
	});

	it('should dispatch "deleteFavoriteAction" when user clicked on active bookmark button', async () => {
		const withHistoryComponent = withHistory(
			<BookmarkButtonMemo
				id={mockOffer.id}
				isFavorite
				block={'place-card'}
				onClick={mockHandleBookmarkButtonClick}
			/>
		);
		const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
			withHistoryComponent,
			makeFakeStore(initialState)
		);
		mockAxiosAdapter
			.onPost(`${APIRoute.Favorite}/${mockOffer.id}/${FavoriteStatus.Delete}`)
			.reply(200, mockOffer.id);

		render(withStoreComponent);
		await userEvent.click(screen.getByRole('button'));
		const actions = extractActionsTypes(mockStore.getActions());

		expect(actions).toEqual([
			deleteFavoriteAction.pending.type,
			deleteFavoriteAction.fulfilled.type,
		]);
	});
});
