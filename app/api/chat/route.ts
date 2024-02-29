import { NextRequest } from "next/server";
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  LangChainStream,
} from "ai";

import { ChatOpenAI } from "@langchain/openai";
import {
  BytesOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { retrieveDoc } from "@/utils/retriever";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { updateMessages } from "@/app/actions";
import { auth } from "@clerk/nextjs";

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const ANSWER_TEMPLATE = `You are a helpful and enthusiastic support bot who can answer a given question about the context and conversation history. Try to find the answer in the context, If the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." Don't try to make up an answer. Always speak as if you were chatting to a friend.
context: {context}
conversation history: {chat_history}
question: {question}
answer: `;

// standlone question --->

// const STANDALONE_QUESTION_TEMPLATE = `Given some conversation history (if any) and a question, convert the question to a standalone question.
// conversation history: {chat_history}
// question: {input}
// standalone question:`;

// const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
//   STANDALONE_QUESTION_TEMPLATE
// );

// const standaloneQuestionChain = standaloneQuestionPrompt
//   .pipe(llm)
//   .pipe(new StringOutputParser());

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { document_id, chat_id, vector_key } = body;
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const llm = new ChatOpenAI({ openAIApiKey: vector_key });
  const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

  function combineDocuments(docs: any[]) {
    return docs.map((doc) => doc.pageContent).join("\n\n");
  }

  const retriever = await retrieveDoc(document_id, vector_key);

  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.original_input.input,
    retriever,
    combineDocuments,
  ]);

  const outputParser = new BytesOutputParser();

  const answerChain = answerPrompt.pipe(llm).pipe(outputParser);

  const chain = RunnableSequence.from([
    {
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.input,
      chat_history: ({ original_input }) => original_input.chat_history,
    },
    answerChain,
  ]);

  const stream = await chain.stream(
    {
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    },
    {
      callbacks: [
        {
          async handleLLMEnd(output) {
            const update_messages = [
              ...messages,
              {
                role: "assistant",
                content: output.generations[0][0].text,
              },
            ];
            await updateMessages(chat_id, update_messages);
          },
        },
      ],
    }
  );

  return new StreamingTextResponse(stream);
}
