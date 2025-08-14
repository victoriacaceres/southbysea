const N = 9

const Card = ({i}:{i:number}) => (
  <div className="card p-6">
    <div className="aspect-[4/3] bg-black/5 rounded-md mb-4"/>
    <h3 className="text-xl font-semibold mb-2">High Definition Digital</h3>
    <p className="text-black/70">Our HDD is one of the newest printing methods in the custom apparel world. HDD DTF are ultra-detailed, full-color designs directly onto fabric using a heat press. It’s high-res, super versatile, and ideal for complex logos and art with lots of colors.</p>
  </div>
)

export default function DecorationOptions(){
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-display mb-6">Browse Decoration Options</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({length:N}).map((_,i)=> <Card key={i} i={i}/>)}
      </div>
    </div>
  )
}
