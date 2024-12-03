import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Play Wheel",
  description: "Spin the wheel",
});

const SpinWheelLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SpinWheelLayout;
