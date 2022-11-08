type MenuItem = {
  label: string
  href: string
}

interface IConfig {
  menu: MenuItem[]
}

export const config: IConfig = {
  menu: [
    {
      label: 'home',
      href: '/',
    },
    {
      label: 'chi siamo',
      href: '/chi-siamo',
    },
    {
      label: 'negozio',
      href: '/negozio',
    },
  ],
}
