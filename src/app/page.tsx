"use client";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import questionIcon from "@/assets/question.svg";

import config from "@/config/app";

interface ILogin {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("¡Correo inválido!").required("¡Campo requerido!"),
  password: Yup.string()
    .min(2, "¡Muy corto!")
    .max(50, "Muy largo!")
    .required("¡Campo requerido!"),
});

const Login = () => {
  const router = useRouter();
  const formik = useFormik<ILogin>({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: (values: ILogin) => {
      console.table(values);
      router.push("/session/home", { scroll: false });
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="rounded bg-black flex flex-col p-6">
        <div>Login</div>

        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <span>Email:</span>
            <input
              className="bg-gray-500"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <span>Contraseña:</span>
            <input
              className="bg-gray-500"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit">Ingresar</button>
          <div className="flex py-2">
            <span className="flex gap-2 text-xs">
              <Image src={questionIcon} alt="question" width={18} height={18} />
              Usar la query de listado de Cuentas para filtrar por correo
            </span>
          </div>
        </form>

        <span className="text-black">{config.apiUrl}</span>
      </div>
    </main>
  );
};

export default Login;
