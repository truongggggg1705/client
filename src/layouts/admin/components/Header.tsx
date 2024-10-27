import NotificationList from "./NotificationList";

const Header = () => {
    return (
        <div className="relative flex my-5 items-center mr-[80px] gap-3 justify-end">
            <NotificationList />
        </div>
    )
}

export default Header;