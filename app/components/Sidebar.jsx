import { Card, Typography } from "./material-components";

export default function Sidebar({ children }) {
  return (
    <>
      <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed left-0 top-0 bottom-0">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Cofee App
          </Typography>
        </div>
        {children}
      </Card>
    </>
  );
}
