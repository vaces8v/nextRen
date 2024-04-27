import "@/styles/globals.css";
import { Content } from './../../components/Content/Content';
import { Provider } from 'react-redux';
import store from '../../components/store/store';

export default function App({ Component, pageProps }) {
  return (
      <Provider store={store}>
          <Content>
            <Component {...pageProps} />
          </Content>
      </Provider>
  );
}