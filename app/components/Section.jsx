export default function Section({ children, className }) {
  return (
    <>
      <section className={`w-full mx-auto min-h-screen ` + className}>
        {children}
      </section>
    </>
  );
}
