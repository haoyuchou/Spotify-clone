// https://next-auth.js.org/tutorials/refresh-token-rotation

import SpotifyWebApi from "spotify-web-api-node";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If whatever reason, the refresh attemp broke
      if (session.error === "RefreshAccessTokenError") {
        signIn(); // Force sign in to hopefully resolve error
        //
      }

      // refresh the token
      console.log(
        "The refresh token process is somehow broken, we need to set the access token again"
      );

      // It is in if (session), so we definitely have session
      spotifyApi.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
