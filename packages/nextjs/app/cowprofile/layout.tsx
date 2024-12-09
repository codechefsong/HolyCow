import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: " Cow Marketplace",
  description: "Buy the cow",
});

const CowMarketplaceLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CowMarketplaceLayout;
