import "@/styles/globals.css";
import AppHeaderBar from "@/components/ui/AppHeaderBar";
import ReactQuery from "@/components/ReactQuery";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeaderBar
        title="Dashboard"
        navLinks={[]}
      />

      <ReactQuery>
        <main>{children}</main>
      </ReactQuery>
    </>
  );
}
