'use client'

export default function SpiralRings() {
  const rings = Array.from({ length: 18 })

  return (
    <div className="relative flex justify-center items-center h-6 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {/* Center pin / hook */}
      

      {/* Spiral rings row */}
      <div className="flex gap-2.5 items-center mt-1">
        {rings.map((_, i) => (
          <div
            key={i}
            className="ring-hole"
            style={{ animationDelay: `${i * 20}ms` }}
          >
            <div
              className="rounded-full border-2 border-gray-600 dark:border-gray-500 bg-transparent"
              style={{ width: '10px', height: '14px' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}