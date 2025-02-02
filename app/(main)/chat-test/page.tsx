import { generateId } from "ai";
import { TestMessages } from "./test-messages";
import { TestInput } from "./test-input";

export default function ChatTestPage() {
  const id = generateId();
  return (
    <div className="relative flex h-full -0 flex-1 flex-col">
      <div className="flex-1 overflow-hidden  @container/thread">
        <TestMessages modelId="gemini-1.5-pro" id={id} />
      </div>
      <div className="flex flex-1 gap-4 text-base md:gap-5 mx-auto w-full lg:gap-6 md:max-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
        <TestInput modelId="gemini-1.5-pro" id={id} />
      </div>
    </div>
  );
}
