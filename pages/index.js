import Head from "next/head";
import Image from "next/image";
import Mypage from "../component/mypage";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>my page</title>
      </Head>
      <div>
        <Mypage />
      </div>
    </>
  );
}
