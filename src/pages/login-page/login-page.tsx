import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { RandomCityButton } from '../../components/random-city-button/random-city-button';
import { LoginForm } from '../../components/login-form/login-form';

function LoginPage(): JSX.Element {
	return (
		<div className="page page--gray page--login">
			<Helmet>
				<title>Authorization</title>
			</Helmet>
			<Header withNavigation={false} />

			<main data-testid="login-page" className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<LoginForm />
					</section>
					<section className="locations locations--login locations--current">
						<RandomCityButton />
					</section>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
