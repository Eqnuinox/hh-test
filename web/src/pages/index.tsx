import Head from "next/head";
import {Inter} from "next/font/google";
import Table from "react-bootstrap/Table";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {useSearchParams} from "next/navigation";
import PaginationItem from '@/components/Pagination-item';

const inter = Inter({subsets: ["latin"]});

export type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

type TGetServerSideProps = {
  statusCode: number
  count: number
  users: TUserItem[]
}


export const getServerSideProps = (async ({query}: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const res = await fetch(`http://localhost:3000/users?page=${query.page || 1}&take=${query.take || 20}`, {method: 'GET'})
    const {users, count} = await res.json()

    if (!res.ok) {
      return {props: {statusCode: res.status, count:0, users: []}}
    }

    return {
      props: {statusCode: 200, count, users}
    }
  } catch (e) {
    return {props: {statusCode: 500, count:0, users: []}}
  }
}) satisfies GetServerSideProps<TGetServerSideProps>


export default function Home({statusCode, users, count}: TGetServerSideProps, {skip = 20, paginationLimit = 10}) {
  const searchParams = useSearchParams()
  let currentPage = Number(searchParams.get('page')) || 1;

  const paginationLimitCalc = Math.ceil(paginationLimit/2);
  const paginationCount = Math.ceil(count/skip);
  console.log(paginationCount);
  const paginationArr = [];

  if(currentPage - paginationLimitCalc <= 0){
    for(
      let i = 1;
      i < paginationLimit+1;
      i++)
    { paginationArr.push(i) }
  }else {
    for(
      let i = currentPage - paginationLimitCalc;
      i < (
        currentPage + paginationLimitCalc <= paginationCount + 1 ?
          currentPage + paginationLimitCalc :
          paginationCount + 1);
      i++)
    { paginationArr.push(i) }
  }

  if (statusCode !== 200) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>
          <span>Всего пользователей - <b>{count}</b></span>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Дата обновления</th>
            </tr>
            </thead>
            <tbody>
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))
            }
            </tbody>
          </Table>
            <PaginationItem items={paginationArr} skip={skip} currentPage={currentPage} paginationCount={paginationCount}/>
        </Container>
      </main>
    </>
  );
}
