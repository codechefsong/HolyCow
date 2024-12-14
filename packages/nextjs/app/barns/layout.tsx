import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Barn",
  description: "See cows",
});

const BarnLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BarnLayout;
