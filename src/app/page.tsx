'use client'
import Image from 'next/image'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

import questionIcon from '@/assets/question.svg'

import config from '@/config/app'
import { useFindAccount } from '@/api/graphql/resolvers/useFindAccount'
import { useGlobalContext } from '@/context/GlobalContext'
import { useEffect, useState } from 'react'
import Input from '@/app/Components/Input'
import Button from '@/app/Components/Button'

interface ILogin {
  email: string
  password: string
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('¡Correo inválido!').required('¡Campo requerido!'),
  password: Yup.string()
    .min(2, '¡Muy corto!')
    .max(50, 'Muy largo!')
    .required('¡Campo requerido!'),
})

const Login = () => {
  const router = useRouter()
  const [hasNotAccount, setHasNotAccount] = useState(false)
  const { dispatch } = useGlobalContext()

  const [finAccount, { data, called }] = useFindAccount()
  const formik = useFormik<ILogin>({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values: ILogin) => {
      finAccount({ variables: { email: values.email } })
    },
  })

  useEffect(() => {
    if (!Array.isArray(data?.accounts)) {
      return
    }

    if (data?.accounts.length > 0) {
      dispatch({ type: 'ADD_ACCOUNT', payload: data?.accounts[0] })
      router.push('/session/home', { scroll: false })
    } else {
      setHasNotAccount(true)
    }
  }, [data?.accounts])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="rounded bg-black flex flex-col p-6 ">
        <div className="font-bold pb-2">Login</div>
        <form
          className="flex flex-col gap-[10px]"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <Input
              label={'Email:'}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'email'}
              meta={formik.getFieldMeta('email')}
              layout={'col'}
            />
            <Input
              label={'Contraseña:'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'password'}
              meta={formik.getFieldMeta('password')}
              layout={'col'}
            />
          </div>

          <Button>Ingresar</Button>
          {hasNotAccount && called ? (
            <span className="text-center text-red-500 text-sm">
              No se encontro usuario
            </span>
          ) : null}

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
  )
}

export default Login
