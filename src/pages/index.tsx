import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout title="Главная страница">
        <div className="center">
          <h1>Добро пожаловать</h1>
          <h3>Tutorial Next.js, React.js, Next.js</h3>
        </div>
      </MainLayout>

      <style jsx>
        {`
          .center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 150px;
          }
        `}
      </style>
    </>
  );
}
