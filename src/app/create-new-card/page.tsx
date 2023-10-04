"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  challenge: z.string(),
  ifNot: z.string(),
  section: z.string(),
  points: z.number(),
  type: z.string(),
});

export default function CreateNewCard() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      challenge: "",
      ifNot: "",
      section: "",
      type: "",
      points: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/");
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-between py-3 mb-3">
        <h3 className="text-neutral-50 font-bold text-xl">Card Quest</h3>

        <Button variant="outline" size="sm" onClick={() => router.push("/")}>
          Voltar
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Fotinha no insta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="challenge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desafio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dê o seu telefone para sua frente e dixe ela postar uma de sua galeria no Instagram"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ifNot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ou</FormLabel>
                <FormControl>
                  <Input placeholder="Beba 2 shots da sua bebida" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seção de criação</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione qual tipo será criada" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Crítico">Crítico</SelectItem>
                    <SelectItem value="Votação">Votação</SelectItem>
                    <SelectItem value="Sorteado">Sorteado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seção de criação</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione qual seção será criada" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="amigos">Com amigos +18</SelectItem>
                    <SelectItem value="casais">Com amigos -18</SelectItem>
                    <SelectItem value="familia">Com a familia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Criar novo card</Button>
        </form>
      </Form>
    </>
  );
}
