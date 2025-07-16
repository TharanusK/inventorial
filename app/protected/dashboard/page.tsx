import Header from "@/components/header";

export default async function DashBoardPage() {
  return (
    <div className="flex w-full flex-col min-h-screen p-9 border-2 border-gray-200 ">
      <Header title="Dashboard" />
    </div>
  );
}
