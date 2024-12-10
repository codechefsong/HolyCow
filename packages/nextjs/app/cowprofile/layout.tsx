import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "My Cows",
  description: "My cows",
});

const CowProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CowProfileLayout;
