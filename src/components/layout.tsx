import { Provider } from "react-redux";
import { store } from "../store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Layout = (props) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </Provider>
  );
};

export default Layout;
