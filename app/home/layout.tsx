import { BtAppBar } from "@/lib/components/BtAppBar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <BtAppBar />
      {children}
    </>
  );
}
