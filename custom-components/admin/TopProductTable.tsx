import { columns, Payment } from "./Columns";
import { DataTable } from "./Data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "a8c9d2f1",
      amount: 250,
      status: "pending",
      email: "john.doe@example.com",
    },
    {
      id: "bf73e98d",
      amount: 75,
      status: "failed",
      email: "jane.smith@example.com",
    },
    {
      id: "d8f15a4c",
      amount: 430,
      status: "pending",
      email: "user123@example.com",
    },
    {
      id: "e35b19a7",
      amount: 150,
      status: "pending",
      email: "alice@example.com",
    },
    {
      id: "f29ce1b4",
      amount: 320,
      status: "pending",
      email: "bob@example.com",
    },
    {
      id: "g471ac9e",
      amount: 60,
      status: "pending",
      email: "eve@example.com",
    },
    {
      id: "h9d13b8f",
      amount: 500,
      status: "failed",
      email: "charlie@example.com",
    },
    {
      id: "i83d21b7",
      amount: 275,
      status: "pending",
      email: "dave@example.com",
    },
    {
      id: "j7a9b6c2",
      amount: 120,
      status: "pending",
      email: "mallory@example.com",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
