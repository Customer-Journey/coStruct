import { SignInButton } from "./_components/sign-in-button";
import { CTALinkButton } from "./_components/buttons";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F8F9FA] px-6 py-12 text-[#111111] md:px-12 lg:px-24 dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Sign In Button */}
      <div className="absolute top-6 right-6 z-10 md:right-12 lg:right-24">
        <SignInButton />
      </div>

      <div className="animate-fade-in relative mx-auto max-w-3xl space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight">coStruct</h1>
          <h2 className="text-2xl font-medium text-[#4B8DF8] dark:text-[#00FFD1]">
            The Coordination Execution Layer of the Internet
          </h2>
        </div>

        {/* Hero Text */}
        <p className="text-lg leading-relaxed">
          A new layer is emerging — one that turns decisions into action.
          <br />
          Secure. Composable. Inevitable.
        </p>

        <hr className="border-[#EAECEF] dark:border-[#2C2C2C]" />

        {/* Quote Block */}
        <blockquote className="border-l-4 border-[#4B8DF8] pl-6 text-lg italic dark:border-[#00FFD1]">
          &ldquo;They&rsquo;ll say it&rsquo;s too early. But whoever defines the
          flow becomes the standard.&rdquo;
        </blockquote>

        {/* Vision */}
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            Infrastructure is shifting.
            <br />
            What TCP/IP did for information, this will do for coordination.
          </p>

          <p className="text-lg font-medium">
            This isn&rsquo;t an app. It&rsquo;s infrastructure.
          </p>

          <p className="text-lg">
            This is how coordination becomes native to the network.
          </p>
        </div>

        <hr className="border-[#EAECEF] dark:border-[#2C2C2C]" />

        {/* CTA */}
        <div className="space-y-6">
          <p className="text-lg">
            Curious? Building? Watching the ground shift?
            <br />
            This is your signal.
          </p>

          <CTALinkButton
            href="https://x.com/ChristofferOle5"
            target="_blank"
            rel="noopener noreferrer"
          >
            DM me on X
          </CTALinkButton>
        </div>

        <p className="mt-8 text-center text-sm text-[#666] italic dark:text-[#999]">
          This page may age well.
        </p>
      </div>
    </main>
  );
}
