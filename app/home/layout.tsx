import { BtAppBar } from "@/lib/components/BtAppBar";
import { BtContainer } from "@/lib/components/BtContainer";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <BtAppBar />
      <BtContainer>{children}</BtContainer>
    </>
  );
}
