CREATE TABLE IF NOT EXISTS "chatpdf-chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"pdf_url" text NOT NULL,
	"pdf_name" text NOT NULL,
	"document_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chatpdf-messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"messages" jsonb,
	"chat_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chatpdf-messages" ADD CONSTRAINT "chatpdf-messages_chat_id_chatpdf-chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chatpdf-chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
