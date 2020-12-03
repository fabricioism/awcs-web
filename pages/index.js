import Head from "next/head";
import styles from "../styles/Home.module.css";
import { HomeView } from "../components/views";
import { PrivateRoute } from "../components/routing";

export default function Home() {
  return (
    <PrivateRoute>
      <HomeView />
    </PrivateRoute>
  );
}
