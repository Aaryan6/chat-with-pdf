import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function KeyDialog({
  setOpenai_key,
}: {
  setOpenai_key: (key: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("vector_key", inputValue);
    setOpenai_key(inputValue);
    setInputValue("");
    router.refresh();
  };
  return (
    <form
      onSubmit={onSubmit}
      className="mt-12 rounded-2xl border py-12 px-8 max-w-md mx-auto w-full"
    >
      <div className="w-full flex flex-col gap-y-2">
        <h1 className="font-medium text-lg text-center mx-auto mb-4">
          You Need An OpenAI Api Key : {")"}
        </h1>
        <div className="flex gap-x-2">
          <Input
            id="key"
            placeholder="sk-..."
            type="key"
            className="w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type="submit"
            className="w-fit mt-1"
            size={"sm"}
            variant={"default"}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
