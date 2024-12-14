import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Player Cow",
  description: "Player cow",
});

const CowProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CowProfileLayout;
