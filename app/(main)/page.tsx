import React from "react";

const Home = () => {
  return (
    <main className="flex-col container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 lg:text-5xl">
        TRPGを試す場
      </h1>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          TRPGのシナリオを試す場です。キャラクターシートを作成し、シナリオを試す事ができます。
        </h2>
      </div>
    </main>
  );
};

export default Home;
