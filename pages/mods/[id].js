/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";

import { useSelector } from "react-redux";
import { modData } from "../../src/mod-slice";

import styles from "../../styles/Home.module.css";
import useMod from "../../src/hooks/use-mod";

function Mod({ id }) {
  const { isLoading, isError, error, status } = useMod(id);
  const { data } = useSelector(modData);

  if (!id) {
    return <p>Generating...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (status !== "success") {
    return <p>Some kind of error</p>;
  }

  //I'm not proud of this
  const screenshot = data.screenshots[0].url;

  return (
    <div className={styles.main}>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.shortDescriptionh} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href={"/"}>
        <a>Back</a>
      </Link>
      <div className={styles.container}>
        <div key={data.id} className={styles.image}>
          <img alt={data.title} src={screenshot} />
          <h2>{data.title}</h2>
        </div>
      </div>
    </div>
  );
}

//We don't ant these pages to be rendered by the server
export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: "10111" } }],
    fallback: true, //use blocking to remove the need for early returns
  };
};

export async function getStaticProps(ctx) {
  const { params } = ctx;

  if (!params || !params.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: params.id,
    },
    revalidate: 3600,
  };
}

export default Mod;
