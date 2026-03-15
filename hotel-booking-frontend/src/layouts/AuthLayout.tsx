import Footer from "../components/Footer";
import Header from "../components/Header";
import WaveDivider from "../components/WaveDivider";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <WaveDivider />
      <Footer />
    </div>
  );
};

export default AuthLayout;
