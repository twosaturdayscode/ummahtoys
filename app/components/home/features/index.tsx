export default function Features() {
  return (
    <section className="flex flex-col gap-12 justify-center items-center w-full px-6 text-center py-14">
      <div className="flex flex-col justify-center items-center gap-5">
        <h2 className="font-bold text-3xl md:text-4xl text-zinc-700">
          Cosa caratterizza i nostri giochi?
        </h2>
        <p className="lg:text-base text-gray-500 leading-relaxed">
          Tutti i giochi e i libri affrontano in maniera semplice ed efficace
          gli argomenti principali e fondamentali dell&apos;Islam.
          <br />I nostri prodotti sono sicuri per la salute dei tuoi bambini,
          inoltre offriamo un servizio di assistenza clienti di qualità per
          assicurarci che la tua esperienza sia sempre al top!
        </p>
      </div>
      <div className="w-full flex flex-row gap-10 justify-center items-center flex-wrap text-lg md:text-xl font-semibold">
        <div className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <img src="/assets/box-shipping.svg" alt="" className="w-20 h-20" />
          <span>Ottimo servizio e qualità</span>
        </div>
        <div className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <img src="/assets/target.svg" alt="" className="w-20 h-20" />
          <span>Realizzati per le nuove generazioni</span>
        </div>
        <div className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <img src="/assets/moonstar.svg" alt="" className="w-20 h-20" />
          <span>L&apos;Islam semplice e fondamentale</span>
        </div>
        <div className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <img src="/assets/europe.svg" alt="" className="w-20 h-20" />
          <span>Conformi alle direttive EU</span>
        </div>
      </div>
    </section>
  )
}
