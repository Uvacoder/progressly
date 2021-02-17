import "../styles/globals.css";
import { AuthProvider } from "../src/authProvider";
import Layout from "../src/components/Layout.js";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
