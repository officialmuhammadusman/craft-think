import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="ct-section">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
            Page not found
          </p>
          <h1 className="ct-h1 mt-4">This page does not exist yet.</h1>
          <p className="ct-body mt-4 text-[#475569]">
            The link may be old, or the page may have moved. Tell us what you
            were looking for — our AI guide can point you to the right service.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/">Go Home</Button>
            <Button href="/guide" variant="secondary">
              Ask Our AI Guide
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
