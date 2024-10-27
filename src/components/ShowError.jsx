const ShowError = ({error}) => {
    let slicedError;

    if(error?.includes(".")) {
        let splittedError = error.split(".");
        slicedError = splittedError[0];
    }

    return (
        <div className="text-red-300 mt-1 text-sm"><span>{slicedError}</span></div>
    );
}

export default ShowError;