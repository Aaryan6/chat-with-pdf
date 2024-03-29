"use client";

import { useAuth } from "@clerk/nextjs";
import { LampContainer } from "./lamp-container";
import Uploader from "./uploader";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const { userId } = useAuth();
  return (
    <LampContainer>
      <section className="w-full h-full pt-16">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          VectorPDF
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="grid gap-6 items-center"
        >
          <div className="flex flex-col justify-center space-y-4 mt-4 text-center">
            <p className="text-slate-400 mx-auto">
              Upload your PDFs and chat with it, No need to read full pdf.
            </p>
            {userId ? (
              <Uploader />
            ) : (
              <Link href="/sign-in" className="w-fit mx-auto pb-44">
                <Button className="w-fit mx-auto font-semibold flex gap-x-1 hover:gap-x-2 mt-4">
                  Get Started <ArrowRight size={18} />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </section>
    </LampContainer>
  );
}
