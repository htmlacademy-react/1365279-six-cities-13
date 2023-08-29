import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();

	const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
	const isValidPassword = passwordRegex.test(password);
	const isNeedDisable = !email || !isValidPassword;

	const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setEmail(evt.target.value);
	};

	const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setPassword(evt.target.value);
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		dispatch(
			loginAction({
				email: email,
				password: password,
			})
		);
	};

	return (
		<form
			className="login__form form"
			action=""
			method="post"
			onSubmit={handleSubmit}
		>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">E-mail</label>
				<input
					value={email}
					onChange={handleLoginChange}
					className="login__input form__input"
					type="email"
					name="email"
					placeholder="Email"
					required
					data-testid="loginElement"
				/>
			</div>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">Password</label>
				<input
					value={password}
					onChange={handlePasswordChange}
					className="login__input form__input"
					type="password"
					name="password"
					placeholder="Password"
					required
					data-testid="passwordElement"
				/>
			</div>
			<button
				className="login__submit form__submit button"
				type="submit"
				disabled={isNeedDisable}
			>
				Sign in
			</button>
			{isNeedDisable && password !== '' && (
				<p style={{ color: 'red' }}>
					Password must contain at least one number and one letter
				</p>
			)}
		</form>
	);
}
