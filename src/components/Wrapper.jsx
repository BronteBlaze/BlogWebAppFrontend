const Wrapper = ({ children, className }) => {
    return (
        <div className={`max-w-[1200px] mx-auto px-4 lg:px-0 ${className}`}>{children}</div>
    );
}

export default Wrapper;