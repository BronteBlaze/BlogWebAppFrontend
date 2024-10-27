const InfoWithIcon = ({ icon, info, className }) => {
    return (
        <div className={className}>
            <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-full text-color-black">{icon}</div>
                <div><span>{info}</span></div>
            </div>
        </div>
    );
}

export default InfoWithIcon;