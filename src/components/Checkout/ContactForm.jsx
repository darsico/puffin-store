import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { useAuth } from '../../../context/AuthContext';
import { useCheckout } from '../../store';
import { AiOutlineCheck } from 'react-icons/ai';

const ContactForm = ({ goToDeliverySection }) => {
  const { setPayer } = useCheckout((state) => state);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();
  // const [defaultValues, setDefaultValues] = useState({});

  const onSubmit = (data) => {
    if (user) {
      data.email = user.email;
    }
    goToDeliverySection(data);
    setPayer(data);
    console.log(data);
  };
  const getStoredData = (key) => {
    const storedData = window.localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };

  useEffect(() => {
    let defaultValues = {};
    defaultValues.country = 'Peru';
    reset({ ...defaultValues });
  }, []);

  useFormPersist('payer', {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="contact">
      <section className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="text-2xl  font-medium ">Datos de Contacto</h2>
          <div className="">
            {user ? (
              <>
                {/* <input type="text" className='hidden' value={user.email}  /> */}
                <p className="text-sm text-gray-600">Has iniciado sesión</p>
                <p className="text-xl font-medium flex gap-3 items-center">
                  {user.email} <AiOutlineCheck />
                </p>
              </>
            ) : (
              <>
                <label className="text-sm opacity-60 ">Correo electrónico</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                  {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                />
              </>
            )}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-2xl  font-medium">Dirección de envío</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row w-full">
              <div className="w-full">
                <label className="text-sm opacity-60 ">Nombres</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                  {...register(
                    'name'
                    // , { required: true, minLength: 3, regex: /^[a-zA-Z ]+$/ }
                  )}
                />
              </div>
              <div className="w-full">
                <label className="text-sm opacity-60 ">Apellidos</label>
                <input
                  type="text"
                  autoComplete="lastname"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                  {...register(
                    'surname'
                    // , { required: true, minLength: 3, regex: /^[a-zA-Z ]+$/ }
                  )}
                />
              </div>
            </div>
            <div>
              <label className="text-sm opacity-60 ">Dirección</label>
              <input
                type="text"
                autoComplete="address"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                {...register(
                  'address'
                  // , { required: true, minLength: 3 }
                )}
              />
            </div>
            <div>
              <label className="text-sm opacity-60 ">¿Alguna referencia? (Opcional)</label>
              <input type="text" autoComplete="reference" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm" {...register('reference', { required: false })} />
            </div>
            <div className="flex flex-col gap-3 md:flex-row ">
              <div className="w-full">
                <label className="text-sm opacity-60 ">Ciudad</label>
                <input
                  type="text"
                  autoComplete="city"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                  {...register(
                    'city'
                    // , { required: true, minLength: 3, regex: /^[a-zA-Z ]+$/ }
                  )}
                />
              </div>
              <div className="w-full">
                <label className="text-sm opacity-60 ">Departamento</label>
                <input
                  type="text"
                  autoComplete="state"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                  {...register(
                    'state'
                    // , { required: true, minLength: 3, regex: /^[a-zA-Z ]+$/ }
                  )}
                />
              </div>
              <div className="w-full">
                <label className="text-sm opacity-60 ">Ditrito</label>
                <input
                  type="text"
                  autoComplete="district"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                  {...register(
                    'district'
                    // , { required: true, minLength: 3, regex: /^[a-zA-Z ]+$/ }
                  )}
                />
              </div>
            </div>
            <div>
              <label className="text-sm opacity-60 ">País</label>
              <input type="text" autoComplete="country" placeholder={'Perú'} disabled className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm" {...register('country')} />
            </div>
            <div>
              <label className="text-sm opacity-60 ">Celular</label>
              <div className="flex items-center ">
                <input type="text" placeholder="+51" value="+51" {...register('area_code', { required: true })} className="appearance-none rounded-none  w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm" />
                <input
                  type="number"
                  autoComplete="phone"
                  className="appearance-none rounded-none px-3 py-2 border border-gray-300 w-full  placeholder-gray-500 text-gray-900  focus:outline-none  sm:text-sm"
                  {...register(
                    'number'
                    // , { required: true, maxLength: 20, valueAsNumber: true, regex: /^[0-9]+$/ }
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        <button type="submit" form="contact" className="p-3 text-white bg-black mt-4">
          Métodos de delivery
        </button>
      </section>
    </form>
  );
};

export default ContactForm;
