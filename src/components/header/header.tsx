import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import {
	getAuthorizationStatus,
	getUserName,
} from '../../store/user-process/selector';

type HeaderProps = {
	withNavigation?: boolean;
};

function Header({ withNavigation = true }: HeaderProps): JSX.Element {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const userName = useAppSelector(getUserName);

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Link
							className={classNames('header__logo-link', {
								'header__logo-link--active': pathname === AppRoute.Main,
							})}
							to={AppRoute.Main}
						>
							<img
								className="header__logo"
								src="img/logo.svg"
								alt="6 cities logo"
								width={81}
								height={41}
							/>
						</Link>
					</div>
					{withNavigation && (
						<nav className="header__nav">
							{authorizationStatus === AuthorizationStatus.Auth ? (
								<ul className="header__nav-list">
									<li className="header__nav-item user">
										<Link
											className="header__nav-link header__nav-link--profile"
											to={AppRoute.Favorites}
										>
											<div className="header__avatar-wrapper user__avatar-wrapper"></div>
											<span className="header__user-name user__name">
												{userName}
											</span>
											<span className="header__favorite-count">3</span>
										</Link>
									</li>
									<li className="header__nav-item">
										<Link
											className="header__nav-link"
											to={AppRoute.Main}
											onClick={(evt) => {
												evt.preventDefault();
												dispatch(logoutAction());
											}}
										>
											<span className="header__signout">Sign out</span>
										</Link>
									</li>
								</ul>
							) : (
								<ul className="header__nav-list">
									<li className="header__nav-item user">
										<Link
											className="header__nav-link header__nav-link--profile"
											to={AppRoute.Login}
										>
											<div className="header__avatar-wrapper user__avatar-wrapper"></div>
											<span className="header__login">Sign in</span>
										</Link>
									</li>
								</ul>
							)}
						</nav>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
