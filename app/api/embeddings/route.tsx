import {
  createChat,
  createMessage,
  getFileUrl,
  uploadFile,
} from "@/app/actions";
import { generateEmbeddings } from "@/utils/generate-embeddings";
import { loadPdf } from "@/utils/pdf-loader";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.formData();
    const document_id = body.get("document_id");
    const file_name = body.get("file_name");
    const pdf = body.get(document_id as string);
    const openai_key = body.get("key");

    if (!openai_key) {
      return NextResponse.json(
        {
          message: "OpenAI key not found!",
        },
        {
          status: 400,
        }
      );
    }

    // loading pdf
    const docs = await loadPdf(pdf as Blob, document_id as string);

    // generating embeddings
    const { success, res, error } = await generateEmbeddings(
      docs,
      openai_key as string
    );
    if (!success) {
      return NextResponse.json(
        {
          message: "OpenAI Api key is invalid!",
          error,
        },
        {
          status: 500,
        }
      );
    }

    const storedFile = await uploadFile(pdf as File, document_id as string);
    const fileUrl = await getFileUrl(storedFile!.path);

    // create chat
    const chat = await createChat(
      userId as string,
      fileUrl?.data?.publicUrl!,
      file_name as string,
      document_id as string
    );
    const chat_message = await createMessage(chat![0]?.id, userId as string);
    return NextResponse.json(
      {
        success: true,
        message: "File embedded successfully!",
        data: chat_message,
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
