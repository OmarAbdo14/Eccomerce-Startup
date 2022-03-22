import React from 'react'


const Statistics = ({array}) => {

  return (
    <>
      <section className="flex sm:flex-row flex-col gap-2 justify-center mt-20">
        {array.map((el, index) => (
          <div key={index} className={`md:text-base text-sm md:w-auto sm:w-1/2 w-full text-center px-3 ${index+1<array.length && 'border-r-2'}`}>
            <h6 className="text-blue-dark text-bold ">{el.title}</h6>
            <p className="text-gray-common ">{el.body}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default Statistics
