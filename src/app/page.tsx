"use client";

import FetchCards from "@/components/FetchCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-between">
        <h3 className="text-neutral-50 font-bold text-xl">Card Quest</h3>
        <Link href="/create-new-card">
          <Button>Criar novo card</Button>
        </Link>
      </div>

      <FetchCards />
      {/* <Teste /> */}
    </QueryClientProvider>
  );
}
