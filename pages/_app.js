//Video I used for hydration example
//https://www.youtube.com/watch?v=_gRxCvDjWjs&t=1577s
//Argument more akin to why use redux in this instance
//My preference depends on are you going to change the data? If so redux - If not useQuery/SWR will do fine

import "../styles/globals.css";
import Layout from "../src/components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
