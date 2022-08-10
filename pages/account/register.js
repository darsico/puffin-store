import { BsGoogle } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Layout from '../../src/components/layout/Layout';
import { useLayoutEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import TinyLoader from '../../src/components/Loaders/TinyLoader';
import { useRouter } from 'next/router';
import Container from '../../src/components/UI/Container';

const Register = () => {
  const { user, signUp, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const user = await signUp(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    reset();
    router.push('/account');
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleRepeatedPassword = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  };

  useLayoutEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user]);

  return (
    <>
      {!user && (
        <Layout name="Registra tu cuenta">
          <Container>
            <section className="max-w-md mx-auto py-10">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900 text-center  pb-5">Regístrate</h3>
              <div className="mt-4">
                <form className="" onSubmit={handleSubmit(onSubmit)} id="register">
                  <div className=" shadow-sm flex flex-col gap-4">
                    <div className="">
                      <label htmlFor="name" className="sr-only">
                        Nombre y apellido
                      </label>
                      <label className="text-sm opacity-60 " htmlFor="name">
                        Nombre y apellido
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                        // placeholder="Correo electrónico"
                        {...register('name', { required: true, minLength: 3, regex: /^[a-zA-Z ]+$/ })}
                      />
                      {errors.email && <p className="text-red-500 text-sm">Se requiere el nombre y apellido</p>}
                      {errors.email && errors.email.type === 'minLength' && <p className="text-red-500 text-sm">El campo tiene que ser mayor a 3 letras</p>}
                      {errors.email && errors.email.type === 'regex' && <p className="text-red-500 text-sm">No se aceptan números</p>}
                    </div>
                    <div className="">
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
                    <div className=" relative">
                      <label htmlFor="password-repeated" className="sr-only">
                        Repetir contraseña
                      </label>
                      <label className="text-sm opacity-60 " htmlFor="password-repeated">
                        Repetir contraseña
                      </label>
                      <input
                        id="password-repeated"
                        name="password-repeated"
                        type={showRepeatedPassword ? 'text' : 'password'}
                        autoComplete="current-password-repeated"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900    sm:text-sm"
                        // placeholder="Repetir contraseña"
                        {...register('repeatedPassword', { required: true, validate: (value) => value === watch('password') })}
                      />
                      <span className="text-xl absolute top-8 right-5  cursor-pointer">{showRepeatedPassword ? <AiOutlineEyeInvisible onClick={toggleRepeatedPassword} title="Esconder contraseña" /> : <AiOutlineEye onClick={toggleRepeatedPassword} title="Mostrar contraseña" />}</span>
                      {errors.repeatedPassword && errors.repeatedPassword.type === 'validate' && <p className="text-red-500 text-sm">Las contraseñas no coinciden</p>}
                    </div>
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <button type="submit" form="register" className="group relative w-full flex justify-center py-2 px-4 border border-transparent items-center font-medium  text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 gap-2">
                  <FaLock className="text-orange-400" />
                  Registrar Cuenta {isLoading ? <TinyLoader /> : ''}
                </button>
                <div className="mt-4 flex justify-center gap-2">
                  <p className="text-gray-500 text-base">
                    ¿Ya tienes cuenta?{' '}
                    <Link href={'login'}>
                      <a className="text-orange-500 hover:text-orange-700 font-medium hover:cursor-pointer">Inicia sesión</a>
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default Register;
