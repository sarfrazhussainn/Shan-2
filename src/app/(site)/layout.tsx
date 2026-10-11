import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSettings } from "@/lib/repositories";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  return (
    <>
      <Navbar phone={settings.phone} />
      <main className="flex-1">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer s={settings} />
      <WhatsAppButton number={settings.whatsapp} />
    </>
  );
}
