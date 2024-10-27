type ButtonActiveProps = { onClick?: () => void; children: React.ReactNode; active: boolean }
const ButtonActive = ({ children, active, onClick }: ButtonActiveProps) => {
    return (
        <button
            type="button"
            className={
                `${active ? "bg-[#f0564a] text-white" : ""} py-[4px] px-3 border rounded-lg duration-300 w-[100px]`
            }
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default ButtonActive;