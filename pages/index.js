import { getSession } from "next-auth/react";

import Sidebar from "../components/UI/Sidebar";
import Center from "../components/UI Center/Center";
import Player from "../components/UI Center/Player";
//import styles from "../styles/Home.module.css";

export default function Home(props) {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <title>Spotify Clone</title>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
