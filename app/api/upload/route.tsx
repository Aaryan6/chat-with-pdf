import { uploadFile } from "@/actions/upload";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const pdf = body.get("pdf");

    const res = await uploadFile(pdf as File);
    console.log(res);
    // {
    //     path: 'pdfs',
    //     id: '2afb8aee-c719-4dc2-b558-7ca404863eec',
    //     fullPath: 'files/pdfs'
    //   }
    return NextResponse.json(
      {
        body: "Success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        body: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
