import Image from "next/dist/client/image";
import { useCallback, useRef, useState } from "react";
import Styles from "../../styles/Home.module.css";
const Mypage = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const inputRef = useRef();

  const handleInput = useCallback(() => {
    setInput(inputRef.current.value);
    console.log(input);
  }, [inputRef]);

  const handleSearchBtn = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/users/${inputRef.current.value}`
    );
    const data = await response.json();
    if (response?.ok === true) {
      setUserData(data);
    } else {
      setUserData(404);
    }
    setLoading(false);
  }, []);
  return (
    <div className={Styles.main}>
      <div className={Styles.desc}>
        <h1>welcome to my page</h1>
        <h2 className={Styles.descHead}>you can search by user name </h2>
      </div>
      <div className={Styles.search_container}>
        <input
          type="text"
          placeholder="username"
          className={Styles.input}
          onChange={handleInput}
          ref={inputRef}
        />
        <button className={Styles.button} onClick={handleSearchBtn}>
          search
        </button>
      </div>
      {loading === true && <h2 className={Styles.loading}>loading ....</h2>}
      {!loading && userData === null && (
        <div className={Styles.alert}>
          Please type username to search field to show content .
        </div>
      )}
      {!loading && userData === 404 && (
        <div className={Styles.alert + " " + Styles.error}>
          User not found. Please search for correct username
        </div>
      )}
      {!loading && userData !== null && (
        <div className={Styles.output}>
          <Image src={userData?.avatar_url} width={200} height={200} />
          <div className={Styles.username}>{userData?.login}</div>
          <div className={Styles.name}>{userData?.name}</div>
          <div className={Styles.bio}>
            {userData?.bio ? userData?.bio : "Bio is empty"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
