/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../src/store";
import { getData, rehydrate, searchData } from "../src/dovetailSlice";

import styles from "../styles/Home.module.css";

//provide current state and 'hydrate'
function Home({ initialState }) {
  const dispatch = useDispatch();
  const { data: hydrationError } = useSelector(searchData);

  useEffect(() => {
    dispatch(rehydrate(initialState.dovetail));
  }, [dispatch, initialState]);

  // console.log("data", hydrationError);

  //I had an error with hydration - an onClick in Link I believe / so why I am using the passed initialState
  const { dovetail } = initialState;
  //I wan't data from data :(
  const { data: responseData } = dovetail;
  const { data } = responseData;
  // if (!data) return <p>??</p>;

  return (
    <div className={styles.main}>
      <Head>
        <title>Dovetail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* Ordinarily wouldn't have this kind of logic here - use a function or a const - keep your jsx simple */}
        {data.map((p) => (
          <Link key={p.id} href={`/mods/${p.id}`}>
            <a className={styles.image}>
              <img alt={p.title} src={`${p.thumbnail}`} />
              <h2>{p.name}</h2>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  //get our data from the redux store
  await store.dispatch(getData()); //if !exist?
  return {
    props: {
      initialState: store.getState(),
    },
  };
}

export default Home;