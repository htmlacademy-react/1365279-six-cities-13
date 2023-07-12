import Main from '../../pages/main/main';
import type { MainProps } from '../../pages/main/main';

type AppProps = MainProps;

function App({offersCount}: AppProps): JSX.Element {
	return (
		<Main offersCount={offersCount} />
	);
}

export default App;
