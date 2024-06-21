import { Helmet } from 'react-helmet-async'

export function About() {
  return (
    <main>
      <Helmet title="Sobre" />
      <h1 className="text-3xl font-bold tracking-tight">Sobre o projeto</h1>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div>
              <div className="text-base leading-7 lg:max-w-lg">
                <p className="text-base font-semibold leading-7">Desafio</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Dashboard de Ativos B3
                </h1>
                <div className="max-w-xl">
                  <p className="mt-6">
                    Desafio proposto pela Inoa, onde o objetivo é criar um
                    dashboard de ativos da B3, onde o usuário possa visualizar
                    informações sobre o mercado financeiro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
