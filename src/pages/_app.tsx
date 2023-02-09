import { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";
import { wrapper } from "../store";

const WrappedApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default WrappedApp;
