import { BsGoogle } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Layout from '../../src/components/layout/Layout';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, user, signInWithGoogle, isLoading } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    logIn(email, password);
    router.push('/account');
    reset();
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  useLayoutEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  return (
    <>
      {!user && (
        <Layout name="Iniciar Sesión en tu cuenta">
          <section className="max-w-md mx-auto py-10">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900 text-center  pb-5">Iniciar sesión en tu cuenta</h3>
            <button onClick={handleGoogleSignIn} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-normal  justify-center  items-center py-2.5 text-center gap-2 flex dark:focus:ring-[#4285F4]/55 w-full">
              <BsGoogle /> Acceder con Google
            </button>
            <p className="text-center text-gray-400 text-sm mt-5 mb-5">
              O con tu cuenta de <span className="font-bold">Puffin Case</span>
            </p>
            <div className="mt-4">
              <form className="" onSubmit={handleSubmit(onSubmit)} id="login">
                <input type="hidden" name="remember" value="true" />
                <div className=" shadow-sm  flex flex-col gap-4">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Correo electrónico
                    </label>
                    <label className="text-sm opacity-60 " htmlFor="email-address">
                      Correo electrónico
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                      // placeholder="Correo electrónico"
                      {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">Se requiere el correo electrónico</p>}
                    {errors.email && errors.email.type === 'pattern' && <p className="text-red-500 text-sm">Debe ingresar un correo válido que incluya el signo @</p>}
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="sr-only">
                      Contraseña
                    </label>
                    <label className="text-sm opacity-60 " htmlFor="password">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900    sm:text-sm"
                      // placeholder="Contraseña"
                      {...register('password', { required: true })}
                    />
                    <span className="text-xl absolute top-8 right-5  cursor-pointer">{showPassword ? <AiOutlineEyeInvisible onClick={togglePassword} title="Esconder contraseña" /> : <AiOutlineEye onClick={togglePassword} title="Mostrar contraseña" />}</span>
                    {errors.password && <p className="text-red-500 text-sm">Se requiere la contraseña</p>}
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-4">
              <button type="submit" form="login" className="group relative w-full flex justify-center py-2 px-4 border border-transparent items-center font-medium  text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 gap-2">
                <FaLock className="text-orange-400" />
                Iniciar Sesión
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <p className="text-gray-500 text-base">
                ¿No tienes una cuenta?{' '}
                <Link href={'register'}>
                  <a className="text-orange-500 hover:text-orange-700 font-medium hover:cursor-pointer">Crear una cuenta</a>
                </Link>
              </p>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

export default Login;
