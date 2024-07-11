import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import Main from "@/app/components/sold-report/print/Main";
import { getSoldReportByDate } from "@/utils/app/sold-report/main";
import { FormatRupiah } from "@arismun/format-rupiah";
import crypto from "crypto";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Print({ searchParams }) {
  const cookieStore = cookies();

  const datas = await getSoldReportByDate(
    cookieStore.get("access_token")?.value,
    searchParams,
    (err, data) => {
      return data;
    }
  );
  if (!datas) return notFound();
  let total_ammount = 0;
  return (
    <>
      <Section>
        <Container>
          <div className="bg-white rounded-md  mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Laporan Penjualan</h1>
              <p className="text-gray-600">Invoice #{crypto.randomUUID()}</p>
              <p className="text-gray-600">
                Tanggal :{" "}
                {`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
              </p>
            </div>

            <div className="my-6">
              <h2 className="text-lg font-semibold mb-2">Alamat Perusahaan:</h2>
              <p>Coffee App</p>
              <p>Jl. Mustafa Sari</p>
              <p>Pekanbaru, ID</p>
            </div>

            <div className="my-6">
              <h2 className="text-lg font-semibold mb-2">Detail Transaksi:</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Order id
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Tanggal
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => {
                    total_ammount += data.total_amount;
                    return (
                      <tr>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {data.id}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {`${new Date(data.date).getDate()}-${new Date(
                            data.date
                          ).getMonth()}-${new Date(data.date).getFullYear()}`}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          <FormatRupiah value={data.total_amount} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="my-6">
              <h2 className="text-lg font-semibold mb-2">Total:</h2>
              <p className="text-gray-600">
                <FormatRupiah value={total_ammount} />
              </p>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600">Thank you for your business!</p>
            </div>
          </div>
          <Main data={datas} />
        </Container>
      </Section>
    </>
  );
}
