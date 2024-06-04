type InputProps = {
    name?: string;
};

const heading = ({ name }: InputProps) => {
    return (
        <div>
            <h1 className="text-white text-3xl font-bold font-serif">{name}</h1>
        </div>
    );
};

export default heading;
