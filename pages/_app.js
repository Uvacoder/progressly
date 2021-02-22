import "../styles/globals.css";
// import { ProvideAuth } from "../src/buggyAuthProvider";
import { AuthProvider } from "../src/authProvider";
import Layout from "../src/components/Layout.js";

function MyApp({ Component, pageProps }) {
  return (
    // <ProvideAuth>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
    // </ProvideAuth>
  );
}

export default MyApp;
