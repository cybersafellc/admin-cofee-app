export default function Container({ children, className }) {
  return (
    <>
      <div className={`container mx-auto p-4 ` + className}>{children}</div>
    </>
  );
}
