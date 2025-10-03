'use client'

export default function Stats() {
  const stats = [
    { value: '608', label: 'Research Papers', color: 'from-space-cyan to-space-purple' },
    { value: '50+', label: 'Years of Research', color: 'from-space-purple to-space-pink' },
    { value: '100%', label: 'Mission Ready', color: 'from-space-pink to-nasa-red' },
    { value: 'AI', label: 'Powered Analysis', color: 'from-nasa-red to-space-cyan' },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
