'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { setCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Por favor, insira um email válido.'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

interface IForm {
  email: string;
  senha: string;
}

export default function LoginPageComponente() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<IForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  async function onSubmit(values: IForm) {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });

      const resJson = await res.json();

      if (res.ok) {
        const usuario = resJson.usuario;
        const { token, expiration } = resJson.value;

        setCookie('token', token, {
          expires: new Date(expiration),
          path: '/',
          // secure: process.env.NODE_ENV === 'production',
          secure: false,
          // sameSite: 'none',
          sameSite: 'lax',
        });

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('usuarioEmail', usuario.email);

        toast.success('Login realizado');
        router.push('/dashboards');
      } else {
        toast.error(`Autenticação falhou: ${resJson?.erro}`);
      }
    } catch {
      toast.error(`Autenticação falhou`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4'>
      <div className='w-full max-w-md space-y-6 bg-white dark:bg-zinc-950 shadow-xl rounded-xl p-8'>
        <h1 className='text-2xl font-bold text-center text-zinc-800 dark:text-white'>
          Acesse sua conta
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Digite seu email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='senha'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Digite sua senha'
                        {...field}
                        className='pr-10'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-2 top-2.5 text-gray-500 dark:text-gray-400'
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <Loader2 className='animate-spin' size={20} />
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </Form>

        <div className='flex justify-between text-sm text-zinc-600 dark:text-zinc-400'>
          <Link
            href='/register'
            className='hover:underline text-blue-600 dark:text-blue-400'
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
