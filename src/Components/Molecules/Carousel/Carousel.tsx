import { useEffect, useRef, useState } from 'react'

type TCarousel = {
  title: string
  elements: React.ReactNode[]
}

export const Carousel = ({ title, elements }: TCarousel) => {
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDisabledPrev, setIsDisabledPrev] = useState(true)
  const [isDisabledNext, setIsDisabledNext] = useState(true)
  const carousel = useRef<HTMLDivElement>(null)

  const recomputeDimensions = () => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0

    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }

    setIsDisabledNext(isDisabled('next'))
    setIsDisabledPrev(isDisabled('prev'))
  }

  useEffect(() => {
    recomputeDimensions()
  }, [currentIndex])

  useEffect(() => {
    recomputeDimensions()

    /* 
    In case user zooms in or zooms out, we need to adjust max scroll width,
    since otherwise we would experience such inconveniences like first or last
    elements in carousel would not be scrolled fully into view.
    */
    function handleResize() {
      recomputeDimensions()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [currentIndex])

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current!.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const isDisabled = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      return currentIndex <= 0
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      )
    }

    return false
  }

  return (
    <div className="grid gap-6">
      <span className="font-poppins text-lg font-semibold">{title}</span>
      <div className="overflow-hidden relative">
        <div className="flex absolute justify-between items-center w-full h-full">
          <button
            type="button"
            className="group flex absolute left-0 z-30 justify-center items-center px-4 focus:outline-none cursor-pointer"
            onClick={movePrev}
            disabled={isDisabledPrev}
          >
            <span className="inline-flex justify-center items-center w-8 h-8 bg-bluebonnet/30 group-hover:bg-bluebonnet/50 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 rounded-full group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 sm:w-10 h-10">
              <svg
                className="w-5 h-5 text-bluebonnet dark:text-bluebonnet sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="group flex absolute right-0 z-30 justify-center items-center px-4 focus:outline-none cursor-pointer"
            onClick={moveNext}
            disabled={isDisabledNext}
          >
            <span className="inline-flex justify-center items-center w-8 h-8 bg-bluebonnet/30 group-hover:bg-bluebonnet/50 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 rounded-full group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 sm:w-10 sm:h-10">
              <svg
                className="w-5 h-5 text-bluebonnet dark:text-bluebonnet sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        <div
          ref={carousel}
          className="flex overflow-hidden relative z-0 gap-4 scroll-smooth snap-x snap-mandatory touch-pan-x"
        >
          {elements.map((element, index) => (
            <div key={index} className="relative text-center snap-start">
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
