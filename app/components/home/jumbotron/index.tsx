export default function Jumbotron() {
  return (
    <div className="flex flex-row w-full h-72 text-white bg-[#F58466] my-16 justify-end items-center px-10">
      <div className="absolute hidden md:block w-20 md:w-44 lg:w-80 left-5 lg:left-16">
        <img
          src={'/assets/jumbotron-dad.svg'}
          alt="Un papà che prega con um bambino sopra le spalle"
          className="h-full"
        />
      </div>
      <p className="w-full font-[Cera_Pro] font-black text-2xl md:text-3xl lg:text-4xl pl-0 md:pl-44 lg:pl-96">
        Un bambino musulmano forte cresce padroneggiando la vita, con il mondo
        nelle sue mani e la fede nel suo cuore.
        <br />
        <span className="text-base pl-8"> - Ummah Toys</span>
      </p>
    </div>
  )
}
