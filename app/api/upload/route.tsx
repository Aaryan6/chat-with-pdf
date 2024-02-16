import { getFileUrl, uploadFile } from "@/actions/upload";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const file_name = body.get("file_name");
    const pdf = body.get(file_name as string);
    const res = await uploadFile(pdf as File, file_name as string);
    const fileUrl = await getFileUrl(res!.path);
    return NextResponse.json(
      {
        success: true,
        fileUrl: fileUrl?.data.publicUrl,
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
