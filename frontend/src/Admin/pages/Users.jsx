import ErrorBoundary from "../../User/components/error/ErrorBoundary";
import UserTable from "../components/usertable/UserTable";

const Users = () => {
    return <>
        <ErrorBoundary>
            <UserTable /></ErrorBoundary>
    </>
};

export default Users;