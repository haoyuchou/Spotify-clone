// http://localhost:3000/api/auth/callback/spotify
import { getProviders, signIn } from "next-auth/react";
import { Fragment } from "react";

const Login = (props) => {
  const { providers } = props;

  return (
    <Fragment>
      {/* justify-center: vertical axis, item-center: horizontal axis */}
      <div className="flex flex-col items-center bg-black w-full min-h-screen justify-center">
        <img
          className="w-52 mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png"
          alt="spotify logo"
        />
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button
                className="bg-[#18D860] p-5 text-white rounded-lg"
                onClick={() => {
                  signIn(provider.id, { callbackUrl: "/" });
                }}
              >
                Login With {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Login;

//server side render
export const getServerSideProps = async () => {
  const providers = await getProviders();
  console.log("Providers", providers);

  return {
    props: {
      providers,
    },
  };
};
