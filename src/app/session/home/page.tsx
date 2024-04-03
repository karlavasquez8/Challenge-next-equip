'use client'
import Image from 'next/image'

import questionIcon from '@/assets/question.svg'
import { useFilterProducts } from '@/api/graphql/resolvers/useFilterProducts'
import { useGlobalContext } from '@/context/GlobalContext'
import { useMutation } from '@apollo/client'
import { mutationCreateProducts } from '@/api/graphql/mutations/createProducts'
import { useFormik } from 'formik'
import Input from '@/app/Components/Input'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { Account } from '@/interfaces/account'
import {
  CreateProductSchema,
  FormProducts,
} from '@/app/session/home/create-product.schema'
import Button from '@/app/Components/Button'

interface HomeProps {
  account: Account
}

const HomeWrapper = () => {
  const router = useRouter()
  const { state } = useGlobalContext()

  if (!state.account) {
    router.push('/')
    return
  }

  return <Home account={state.account} />
}

const Home: FC<HomeProps> = ({ account }) => {
  const [createProduct] = useMutation(mutationCreateProducts)

  const { data, error } = useFilterProducts(account!._id as string, 1)

  const onSubmit = ({ sku, name }: FormProducts) => {
    createProduct({
      variables: { name, sku, id: account!._id! },
      refetchQueries: ['Products'],
      onCompleted: () => {
        formik.resetForm()
      },
    })
  }

  const formik = useFormik<FormProducts>({
    initialValues: { sku: '', name: '' },
    validationSchema: CreateProductSchema,
    onSubmit,
  })

  const form = (
    <form className="flex gap-4 items-start" onSubmit={formik.handleSubmit}>
      <div className="flex gap-1">
        <Input
          label="SKU:"
          value={formik.values.sku}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="sku"
          type="text"
          meta={formik.getFieldMeta('sku')}
          layout="col"
        />
      </div>
      <div className="flex gap-1">
        <Input
          label="PRODUCTO:"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
          type="text"
          meta={formik.getFieldMeta('name')}
          layout="col"
        />
      </div>
      <div className="flex self-center">
        <Button>Agregar</Button>
      </div>
    </form>
  )

  const table = (
    <table className="border">
      <thead>
        <tr>
          <th className="border border-white">ID</th>
          <th className="border border-white">SKU</th>
          <th className="border border-white">PRODUCTO</th>
        </tr>
      </thead>
      <tbody>
        {data?.products.map(({ _id, name, sku }, index) => (
          <tr
            key={_id}
            className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} p-2`}
          >
            <td className="text-center p-1"> {_id}</td>
            <td className="text-center p-1">{sku}</td>
            <td className="text-center p-1">{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="flex flex-col p-5 border border-white">
        <div>
          <span>El email del usuario es: </span>
          <span className="font-bold">{account?.email}</span>
        </div>

        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Colocar el email que fue tipeado en el Login y guardar el ID para
          usarlo en la creación de productos
        </span>
      </div>

      <div className="flex flex-col p-5 border border-white m-6">
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Relacionar con mutación de creación de producto (vincular cuenta)
        </span>
        {form}
      </div>

      <div className="flex flex-col p-5">
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Relacionar con query de listado de productos (vincular cuenta)
        </span>
        {table}
      </div>
    </main>
  )
}

export default HomeWrapper
