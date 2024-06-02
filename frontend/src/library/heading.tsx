type InputProps = {
    name?: string;
}


const heading = ({name} : InputProps) => {
  return (
    <div>
      <h1 className="text-white bg-gray-900 text-2xl font-bold italic">{name}</h1>
    </div>
  )
}

export default heading;
